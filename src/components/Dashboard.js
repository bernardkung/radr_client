import { useState, useEffect, useRef } from 'react'
import Card from './Card'
import BarChart from './BarChart'
import PieChart from './PieChart'
import LineChart from './PieChart'
import ScatterChart from './ScatterChart'
import TimeSeries from './TimeSeries'

const Dashboard = ({ data }) => {
  const dims = { 
    width: 500, 
    height: 500,
    bottomAxisHeight: 15,
    innerRadius: 80,
    outerRadius: 160,
    padding: { top: 30, right: 20, bottom: 30, left: 40 }
  }

  console.log(data)

  // KPIs
  // const [ totalExpectedReimbursement, setTotalExpectedReimbursement ] = useState(0)
  // const [ totalPayment, setTotalPayment ] = useState(0)
  // const [ totalBalance, setTotalBalance ] = useState(0)
  // const [ totalActiveBalance, setTotalActiveBalance ] = useState(0)
  // const [ totalInactiveBalance, setTotalInactiveBalance ] = useState(0)
  const [ financials, setFinancials ] = useState({})

// HELPER FUNCTIONS
  function dataMap(obj) {
    return Object.keys(obj).map(key=>{
      return { x:key, y:obj[key] }
    })
  }

  function accumulateDict(dict, accumulator) {
    // Loop through each entry in dict
    for (const [key, value] of Object.entries(dict)) {
      // If key doesn't exist in accumulator
      if (!accumulator[key]) { 
        accumulator[key] = value 
      }

      // If key already exists
      accumulator[key] += value
    }

    return accumulator
  }

  // Get the net payment for an ADR record
  function getNetPayment (record) {
    return record['Adr']['srns'].reduce((adrRunSum, srn)=>{
    // Cumulative sum of each payment
    const netSrnPay = srn['payments'].reduce((srnRunSum, payment)=>{
      return srnRunSum + payment['payment_amount']
    }, 0)
    // Cumulative sum of each srn
    return adrRunSum + netSrnPay
  }, 0)
  }

  // Calculate ER, Payment, and Total, Active, and Inactive Balances as a dict
  function evaluateFinancials (record) {
    const netExpectedReimbursement = record['Adr']['expected_reimbursement']
    const netPayment = record['Adr']['srns'].reduce((adrRunSum, srn)=>{
      // Cumulative sum of each payment
      const netSrnPay = srn['payments'].reduce((srnRunSum, payment)=>{
        return srnRunSum + payment['payment_amount']
      }, 0)
      // Cumulative sum of each srn
      return adrRunSum + netSrnPay
    }, 0)
    const netBalance = netExpectedReimbursement - netPayment
    const netActiveBalance = record['Adr']['active']
      ? netBalance
      : 0
    const netInactiveBalance = record['Adr']['active']
      ? 0
      : netBalance

    const financials = {
      'totalExpectedReimbursement' : netExpectedReimbursement,
      'totalPayment' : netPayment,
      'totalBalance': netBalance,
      'totalActiveBalance': netActiveBalance,
      'totalInactiveBalance': netInactiveBalance,
    }

    return financials
    }

  // Find the last stage in an ADR
  function getLastStage(record) {
    const stagePriority = {
      '45' : 1,
      '120': 2,
      '180': 3,
      'ALJ': 4,
    }
    const lastStage = record.Adr.stages.reduce((iterStage, stage)=>{
      if (Object.keys(iterStage).length==0){
        iterStage = stage
      } else {
        iterStage = stagePriority[stage.stage] > stagePriority[iterStage.stage]
          ? stage
          : iterStage
      }
      return iterStage
    }, {})
    return lastStage
  }

  // Find the last event (submission,decision) in a stage
  function getLastEvent(events) {
    return events.reduce((lastEvent, event)=>{
      // If this is the first event checked
      if (Object.keys(lastEvent).length === 0) {
        lastEvent = event
      }
      else {
        // Determine event type & date
        const eventDate = Object.keys(event).includes('submission_date')
          ? new Date(event.submission_date) 
          : new Date(event.decision_date)
        // Determine last event type & date
        const lastEventDate = Object.keys(lastEvent).includes('submission_date')
          ? new Date(lastEvent.submission_date) 
          : new Date(lastEvent.decision_date)

        if (eventDate > lastEventDate) {
          lastEvent = event
        }
      }
      
      const lastEventType = Object.keys(lastEvent).includes('submission_date')
      ? "submission"
      : "decision"

      return {
        type: lastEventType,
        ...lastEvent
      }
    }, {})
  }
  
  // Determine whether a claim is Pending Submission or Awaiting Decision
  function evaluateStatus (record) {
    
    // Find last stage
    const lastStage = getLastStage(record)

    // Find last event
    const events = [...lastStage.submissions, ...lastStage.decisions]
    // const events = [record.Adr.stages.map(stage=>{
    //   return [...stage.submissions, ...stage.decisions]
    // })]
    const lastEvent = getLastEvent(events)

    // If Adr is inactive
    if (record.Adr.active == false) {
      
    }
  }

  evaluateStatus(data[9209])

  // Reduce dataset into count of ADRs by year of first notification
  function countByYear (dataset, yearCol) {
    // Loop through each ADR record
    const yearCount = dataset.reduce((countDict, record)=>{
      // Get the first notification date of the ADR
      const firstNotificationDate = (new Date(record['Adr']['stages'][0]['notification_date']))
      // Get the earliest notification date
      const earliestNotificationDate = record['Adr']['stages']
        .reduce((runMin, stage)=>{
          const notificationDate = new Date(stage['notification_date'])
          return Math.min(runMin, notificationDate)
        }, firstNotificationDate)

      // Get year
      const year = (new Date(earliestNotificationDate).getFullYear())
      
      // If year doesn't exist
      if (!countDict[year]) { countDict[year] = 1 }

      // Accumulate
      countDict[year] += 1

      return countDict
    }, {})

    return dataMap(yearCount)
  } 

  // Reduce overall dataset into a single financial object
  function reduceFinancials(dataset) {
    return dataset.reduce((agg, record)=>{
      // Calculate Financials
      const financials = evaluateFinancials(record)
      // Aggregate Financials
      return accumulateDict(financials, agg)
    }, 
    {
      'totalExpectedReimbursement' : 0,
      'totalPayment' : 0,
      'totalBalance': 0,
      'totalActiveBalance': 0,
      'totalInactiveBalance': 0,
    })
  }
  
  // SET KPIs
  useEffect(()=>{
    // // Aggregate Overall Financials
    const reduction = reduceFinancials(data)
    // // Set states
    setFinancials(reduction)
  }, data)


  const stagesByYear = countByYear(data, 'notification_date', 'count')


  


  return (
    <div className={"dashboard flexCol"}>
      
      <Card value={data.length.toLocaleString()} label={'# ADRs'} />
      
      <Card value={"$" + Math.round(financials['totalExpectedReimbursement']).toLocaleString()} label={'Total Expected Reimbursement'} />

      <Card value={"$" + Math.round(financials['totalPayment']).toLocaleString()} label={'Total Payment'} />

      <BarChart 
        data={stagesByYear} 
        xVar={'y'} 
        yVar={'x'} 
        orient = { "horizontal" }
        title = { "Stages per Year" }
        horizontalLabel={ "# Stages" }
        dims = { dims }
      />

      <PieChart 
        data={dataMap({
          'Payment': financials['totalPayment'],
          'Active Balance': financials['totalActiveBalance'],
          'InactiveBalance': financials['totalInactiveBalance'],
        })}
        label={ "Financial Breakdown" } 
        dims={ dims } 
        colors={[
            "#e0ac2b",
            "#e85252",
            "#6689c6",
            "#9a6fb0",
            "#a53253",
            "#69b3a2",
        ]} 
      />

    </div>
  )


}


export default Dashboard