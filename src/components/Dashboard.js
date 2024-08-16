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

  const totalExpReimb = data['adrs'].reduce((expReimb, adr)=>{
    return expReimb + adr['expected_reimbursement']
  }, 0 )

  function dataMap(obj) {
    return Object.keys(obj).map(key=>{
      return { x:key, y:obj[key] }
    })
  }

  function countByYear (dataset, yearCol) {
    const dict = dataset.reduce((dict, row)=>{
      // Get year
      const year = (new Date(row[yearCol])).getFullYear()
      
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
  
  const stagesByYear = countByYear(data['stages'], 'notification_date', 'count')

  
  console.log(stagesByYear)
  


  return (
    <div className={"dashboard flexCol"}>
      
      <Card value={data['adrs'].length.toLocaleString()} label={'# ADRs'} />
      
      <Card value={"$" + Math.round(totalExpReimb).toLocaleString()} label={'Total Expected Reimbursement'} />

      <BarChart 
        data={stagesByYear} 
        xVar={'y'} 
        yVar={'x'} 
        orient = { "horizontal" }
        title = { "Stages per Year" }
        horizontalLabel={ "# Stages" }
        dims = { dims }
      />

    </div>
  )


}


export default Dashboard