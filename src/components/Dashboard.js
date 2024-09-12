import { useState, useEffect, useRef } from 'react'
import Card from './Card'
import BarChart from './BarChart'
import PieChart from './PieChart'
import LineChart from './PieChart'
import ScatterChart from './ScatterChart'
import TimeSeries from './TimeSeries'

const Dashboard = ({ data }) => {
  const dims = { 
    width: 500, height: 500,
    bottomAxisHeight: 15,
    innerRadius: 120,
    outerRadius: 220,
    padding: { top: 30, right: 20, bottom: 30, left: 40 }
  }

  console.log(data)

  // KPIs
  const [ totalExpectedReimbursement, setTotalExpectedReimbursement ] = useState(0)
  const [ totalPayment, setTotalPayment ] = useState(0)
  const [ totalBalance, setTotalBalance ] = useState(0)
  const [ totalActiveBalance, setTotalActiveBalance ] = useState(0)
  const [ totalInactiveBalance, setTotalInactiveBalance ] = useState(0)

// HELPER FUNCTIONS
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
    const netBalance = totalExpectedReimbursement - totalPayment
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


  function countByYear (dataset, yearCol) {
    // Loop through each ADR record
    const yearCount = dataset.reduce((countDict, record)=>{
    // Get the first stage of the ADR
      const firstStage = record['Adr']['stages'].filter(stage=>stage['stage']=='45')
      // Get year
      const year = (new Date(firstStage[yearCol])).getFullYear()
      
      // If year doesn't exist
      if (!countDict[year]) { countDict[year] = 1 }

      // Accumulate
      countDict[year] += 1

      return countDict
    }, {})

    return dataMap(yearCount)
  } 

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
    const financials = reduceFinancials(data)
    // // Set states
    setTotalExpectedReimbursement(financials['totalExpectedReimbursement'])
    setTotalPayment(financials['totalPayment'])
    setTotalBalance(financials['totalBalance'])
    setTotalActiveBalance(financials['totalActiveBalance'])
    setTotalInactiveBalance(financials['totalInactiveBalance'])
  }, data)


  // const stagesByYear = countByYear(data, 'notification_date', 'count')

  // console.log(stagesByYear)

  


  return (
    <div className={"dashboard flexCol"}>
      
      <Card value={data.length.toLocaleString()} label={'# ADRs'} />
      
      <Card value={"$" + Math.round(totalExpectedReimbursement).toLocaleString()} label={'Total Expected Reimbursement'} />

      <Card value={"$" + Math.round(totalPayment).toLocaleString()} label={'Total Payment'} />

      {/* <BarChart 
        data={stagesByYear} 
        xVar={'y'} 
        yVar={'x'} 
        orient = { "horizontal" }
        title = { "Stages per Year" }
        horizontalLabel={ "# Stages" }
        dims = { dims }
      /> */}

    </div>
  )


}


export default Dashboard