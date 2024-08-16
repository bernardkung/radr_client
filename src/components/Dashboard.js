import { useState, useEffect, useRef } from 'react'
import Card from './Card'
import BarChart from './BarChart'
import PieChart from './PieChart'
import LineChart from './PieChart'
import ScatterChart from './ScatterChart'
import TimeSeries from './TimeSeries'

const Dashboard = ({ data }) => {

  const totalExpReimb = data['adrs'].reduce((expReimb, adr)=>{
    return expReimb + adr['expected_reimbursement']
  }, 0 )

  // function analyzeByYear (dataset, yearCol, measure="count", sumCol="") {
  //   return dataset.reduce((dict, row)=>{
  //     // Get year
  //     const year = (new Date(row[yearCol])).getFullYear()
      
  //     // If year doesn't exist
  //     if (!dict[year]) {
  //       dict[year] = 0
  //     }

  //     // Accumulate
  //     if (measure=="count") {
  //       dict[year]+=1
  //     } else if (measure=="sum") {
  //       dict[year]+=row[sumCol]
  //     }

  //     return dict
  //   }, {})
  // } 
  
  // const countByYear = analyzeByYear(data['stages'], 'notification_date', 'count')
  // console.log("cby:", countByYear)

  const stagesByYear = data['stages'].reduce((accumulator, item) => {
    const category = (new Date(item["notification_date"])).getFullYear()
    if (!accumulator[category]) {
      accumulator[category] = 0
    }
    accumulator[category] += 1
    return accumulator
  }, {})

  
  console.log(stagesByYear)
  // console.log(countByYear)

  return (
    <div className={"dashboard flexCol"}>
      
      <Card value={data['adrs'].length.toLocaleString()} label={'# ADRs'} />
      
      <Card value={"$" + Math.round(totalExpReimb).toLocaleString()} label={'Total Expected Reimbursement'} />

      <BarChart  />

    </div>
  )


}


export default Dashboard