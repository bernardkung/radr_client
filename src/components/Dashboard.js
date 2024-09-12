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

  const totalExpReimb = data.reduce((expReimb, record)=>{
    return expReimb + record['Adr']['expected_reimbursement']
  }, 0 )


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

  const totalPayment = data.reduce((netPay, record)=>{
    // Map through each SRN
    // const netAdrPay = record['Adr']['srns'].reduce((adrRunSum, srn)=>{
    //   // Cumulative sum of each payment
    //   const netSrnPay = srn['payments'].reduce((srnRunSum, payment)=>{
    //     return srnRunSum + payment['payment_amount']
    //   }, 0)
    //   // Cumulative sum of each srn
    //   return adrRunSum + netSrnPay
    // }, 0)
    const netAdrPay = getNetPayment(record)
    return netPay + netAdrPay
  }, 0 )

  function dataMap(obj) {
    return Object.keys(obj).map(key=>{
      return { x:key, y:obj[key] }
    })
  }

  function countByYear (dataset, yearCol) {
    const dict = dataset.reduce((dict, record)=>{
      // Get year
      const year = (new Date(record[yearCol])).getFullYear()
      
      // If year doesn't exist
      if (!dict[year]) {
        dict[year] = 0
      }

      // Accumulate
      dict[year] += 1

      return dict
    }, {})

    return dataMap(dict)
  } 
  
  // const stagesByYear = countByYear(data['stages'], 'notification_date', 'count')

  // function countByDecision(adrs, decisions) {
  //   adrs.map((a)=>{
  //     decisions.filter(a)
  //   }
  //   const dict = decisions.reduce((dict, d)=>{
  //     // Get decision
  //     const decision = d['decision']

  //     if (!dict[decision]) {
  //       dict[decision] = 0
  //     }

  //     dict[decision]+=1
  //   })
  // }
  
  


  return (
    <div className={"dashboard flexCol"}>
      
      <Card value={data.length.toLocaleString()} label={'# ADRs'} />
      
      <Card value={"$" + Math.round(totalExpReimb).toLocaleString()} label={'Total Expected Reimbursement'} />

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