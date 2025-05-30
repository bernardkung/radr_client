import { useState, useEffect, useMemo } from 'react'
// import * as d3 from "d3"
import Radar from './Radar'
import Card from './Card'
import BarChart from './BarChart'
// import PieChart from './PieChart'
// import LineChart from './LineChart'
// import ScatterChart from './ScatterChart'
// import TimeSeries from './TimeSeries'
import FinancialSummary from './FinancialSummary'
import Forecast from './Forecast'

const Dashboard = ({ loading, data }) => {

  // KPIs
  const [ financials, setFinancials ] = useState({})

  const dims = { 
    width: 500, 
    height: 440,
    axisHeight: 15,
    innerRadius: 80,
    outerRadius: 160,
    padding: { top: 30, right: 20, bottom: 30, left: 40 }
  }

  console.log(data)


// HELPER FUNCTIONS
  function dataMap(obj, sort=null) {
    const sorted = sort === null
      ? Object.entries(obj)
      : sort=='desc'
        ? Object.entries(obj).sort((a,b)=> a[1]-b[1])
        : Object.entries(obj).sort((a,b)=> b[1]-a[1])
    const output = sorted.map(([a,b]) => {
      return { x:a, y:b }
    })
    return output
  }

  function buildDict(acc, key) {
    // If key doesn't exist
    if (!acc[key]) { acc[key] = 0}
    acc[key]+=1
    return acc
  }

  function cumulativeDict(dict) {
    
    // Sort
    let cumSum = 0
    const sorted = (Object.entries(dict)
      .sort((a,b)=>(new Date(a[0]))-(new Date(b[0])))
      .map(([key, value])=>{
        cumSum += value
        return {
          date: key,
          value: value,
          cumulativeSum: cumSum,
        }
      })
    )

    return sorted
    // Running Total
  }

  function isEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
    return true;
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
      if (Object.keys(iterStage).length===0){
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
  function getLastEvent(stage, eventType='all') {
    const events = []
    
    if (eventType !== 'submissions' && 'decisions' in stage) {
      events.push(...stage['decisions'])
    } else if ('submissions' in stage) {
      events.push(...stage['submissions'])
    }
    
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

      lastEvent['type'] = lastEventType

      return lastEvent
    }, {})
  }
  
  function findLastEvent(stages) {
    for (const stage of stages) {
      // Check for last decision
      if (stage.decisions.length > 0) {
        return getLastEvent(stage, 'decisions')
      } 
      // Check for last submission if no decision
      else if (stage.submissions.length > 0) {
        return getLastEvent(stage, 'submissions')
      } 
      // If no decisions or submissions, loop to next stage
    }
    // If no decisions or submissions found at all, presumably it's a new Adr
    return null
  }

  // Determine whether a claim is Pending Submission or Awaiting Decision
  function evaluateStatus (record) {

    const stages = record.Adr.stages.sort((a,b)=>{
      return (new Date(a.due_date))>(new Date(b.due_date))
    })
    
    // If Adr is Active
    if (record.Adr.active) {
      // Loop through stages, in order of due date
      // Find last decision or submission
      const lastEvent = findLastEvent(stages)
      // console.log("LE", lastEvent, lastEvent == null)
      // If last event was a submission
      if (isEmpty(lastEvent) || lastEvent.type === 'decision') {
        return 'Pending Submission'
      }
      // If last event was a decision, or no last event
      else {
        return 'Awaiting Decision'
      }
    } 

    // If Adr is Inactive
    else if (!record.Adr.active) {
      for (const stage of stages) {
        // Find last decision
        const lastEvent = getLastEvent(stage, 'decisions')
      
        if (Object.keys(lastEvent).includes('decision') && lastEvent.decision === 'PAID IN FULL') {
          return 'Paid in Full'
        }
        // If not paid in full, or no decision otherwise rendered
        else {
          return 'Uncontested'
        }
      }
    }
  }

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
      if (!countDict[year]) { countDict[year] = 0 }

      // Accumulate
      countDict[year] += 1

      return countDict
    }, {})

    return dataMap(yearCount)
  } 

  function countByStatus (dataset) {
    const statusCount = dataset.reduce((countDict, record) => {
      const status = evaluateStatus(record)
      return buildDict(countDict, status)
    }, {})
    return statusCount
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

  function getPending(dataset) {
    const pending = (dataset
      .filter(record=>evaluateStatus(record)==="Pending Submission")
      .reduce((dueDict, record)=>{
        const lastStage = getLastStage(record)
        return buildDict(dueDict, lastStage.due_date, true)
      }, {})
    )
    return cumulativeDict(pending)
  }
  
  // SET KPIs
  useEffect(()=>{
    if (data) {
      // // Aggregate Overall Financials
      const reduction = reduceFinancials(data)
      // // Set states
      setFinancials(reduction)
    }
  }, [data])


  const adrsByYear = useMemo(()=>countByYear(data, 'notification_date', 'count'))
  const adrsByStatus = useMemo(()=>countByStatus(data))

  function findAdr(adr_id, dataset=data) {
    return dataset.filter(record=>record['Adr']['adr_id']===adr_id)
  }

  // Calculate volume of ADRs due soon
  // const pendingAdrs = getPending(data)
  // console.log("pending", pendingAdrs)
  
  // const testAdr = findAdr(10074) // pending submission
  // const testAdr = findAdr(10024) // awaiting decision
  // console.log("adr", testAdr, evaluateStatus(testAdr[0]))


  if (loading) {
    return (
    <div className="loading flexCol">
      <Radar />
    </div>)
  }


  return (
    <div className={"dashboard"}>

      <div className={'flexRow dashRow'}>
        <h1>Dashboard</h1>
      </div>

      <div className={'flexRow dashRow'}>

        <div className={'flexColCenter'} >
          <Card value={data.length.toLocaleString()} label={'# ADRs'} />
          <Card value={data.filter(record=>record.Adr.active).length.toLocaleString()} label={'# Active'} />
        </div>

        <Forecast data={data} />

        <FinancialSummary data={financials}/>

      </div>

      <div className={'flexRow dashRow'}>

        {/* <PieChart 
          data={dataMap({
            'Payment': financials['totalPayment'],
            'Active Balance': financials['totalActiveBalance'],
            'InactiveBalance': financials['totalInactiveBalance'],
          })}
          title={ "Financial Breakdown" } 
          dims={ dims } 
          colors={[
            "#82B541",
            "#B5373D",
            "#B5AF37", 
            // "#B9B9B9",
          ]} 
        /> */}

        <BarChart 
          data={dataMap(adrsByStatus, 'desc')} 
          xVar={'y'} 
          yVar={'x'} 
          orient = { "horizontal" }
          title = { "ADRs by Status" }
          axisLabel={ "# ADRs" }
          dims = { dims }
        />

        <BarChart 
          data={adrsByYear} 
          xVar={'x'} 
          yVar={'y'} 
          orient = { "vertical" }
          title = { "ADRs per Year" }
          axisLabel={ "# ADRs" }
          dims = { dims }
          colors = {[
            "#28aeca",
            "#6597e9",
            "#d067bd",
            "#ed484f",
          ]}
        />


      </div>


      <div className={'flexRow'}>
        {/* <LineChart
          data={pendingAdrs}
          xVar={'date'} 
          yVar={'cumulativeSum'} 
          title = { "Upcoming Due Dates" }
          axisLabel={ "Running Total" }
          dims = { dims }
        /> */}

      </div>

    </div>
  )


}


export default Dashboard