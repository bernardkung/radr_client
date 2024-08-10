import { useState, useEffect, useRef } from 'react'
import Card from './Card'
import BarChart from './BarChart'
import PieChart from './PieChart'
import LineChart from './PieChart'
import ScatterChart from './ScatterChart'
import TimeSeries from './TimeSeries'

const Dashboard = ({ adrs }) => {
  if (adrs==[]){
    return <></>
  }

  const totalExpReimb = adrs.reduce((expReimb, adr)=>{
    return expReimb + adr['expected_reimbursement']
  }, 0 )

  return (
    <div className={"dashboard flexCol"}>
      
      <Card value={adrs.length.toLocaleString()} label={'# ADRs'} />
      
      <Card value={"$" + Math.round(totalExpReimb).toLocaleString()} label={'Total Expected Reimbursement'} />


    </div>
  )
}


export default Dashboard