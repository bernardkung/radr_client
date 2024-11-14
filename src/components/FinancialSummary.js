import PieChart from "../components/PieChart"

export default function FinancialSummary({ data }) {

  const dims = { 
    width: 200, 
    height: 200,
    axisHeight: 15,
    innerRadius: 0,
    outerRadius: 80,
    padding: { top: 30, right: 0, bottom: 30, left: 40 }
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
        <p className={"summaryValue"}>{ Math.round(100* data['totalPayment'] / data['totalExpectedReimbursement'], 2) }%</p>
        <h3 className={"summaryLabel"}>Payment Rate</h3>
        <p className={"summaryValue"}>${ Math.round(data['totalExpectedReimbursement']).toLocaleString() }</p>
        <h3 className={"summaryLabel"}>Total Expected Reimbursement</h3>
      </div>
      
      <div className={"summaryPlot"}>
        <PieChart 
          data={dataMap({
            'Payment': data['totalPayment'],
            'Active Balance': data['totalActiveBalance'],
            'InactiveBalance': data['totalInactiveBalance'],
          })}
          title={ "" } 
          dims={ dims } 
          colors={[
            "#377CB5",
            "#a8b2e9",
            "#b4b4b4", 
            // "#B9B9B9",
          ]} 
          options={ {'label': false } }
        />
      </div>

    </div>
  )
}