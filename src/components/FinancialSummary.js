import PieChart from "../components/PieChart"

export default function FinancialSummary({ data }) {

  const dims = { 
    width: 225, 
    height: 225,
    axisHeight: 15,
    innerRadius: 0,
    outerRadius: 90,
    padding: { top: 30, right: 20, bottom: 30, left: 40 }
  }

  function dataMap(obj, sort=null) {
    const sorted = sort == null
      ? Object.entries(obj)
      : sort=='desc'
        ? Object.entries(obj).sort((a,b)=> a[1]-b[1])
        : Object.entries(obj).sort((a,b)=> b[1]-a[1])
    const output = sorted.map(([a,b]) => {
      return { x:a, y:b }
    })
    return output
  }

  return (
    <div className={"viz a2 flexRow summary"}>
      
      <h2 className={"summaryTitle"}>Financial Summary</h2>

      <div className={"summaryCol"}>
        <p className={"summaryValue"}>${ Math.round(data['totalExpectedReimbursement']).toLocaleString() }</p>
        <h3 className={"summaryLabel"}>Total Expected Reimbursement</h3>
        <p className={"summaryValue"}>${ Math.round(0.8 * data['totalExpectedReimbursement']).toLocaleString() }</p>
        <h3 className={"summaryLabel"}>Exp. Medicare Reimbursement</h3>
      </div>
      
      <PieChart 
          data={dataMap({
            'Payment': data['totalPayment'],
            'Active Balance': data['totalActiveBalance'],
            'InactiveBalance': data['totalInactiveBalance'],
          })}
          title={ "" } 
          dims={ dims } 
          colors={[
            "#82B541",
            "#B5373D",
            "#B5AF37", 
            // "#B9B9B9",
          ]} 
        />

    </div>
  )
}