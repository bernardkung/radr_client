
export const Adr = ({ adrData }) => {
  if (!adrData) {
    return null;
  }
  console.log(adrData.Adr)

  const rows = Object.entries(adrData.Facility).map(([key, value],i)=>{
    return (          
      <tr>
        <td>{ key }</td>
        <td>{ value }</td>
      </tr>
    )
  })

  function generateRows(dict) {
    const tRows = Object.entries(dict).map(([key, value],i)=>{
      if (typeof(value) !== 'object') {
        const tRow =  (       
          <tr key={i} className={"tableRow"}>
            <th className={"tableHeader"}>{ key }</th>
            <td className={"tableValue"}>{ value }</td>
          </tr>
        )
        return tRow
      }
    })
    return tRows
  }

  function generateTable(dict, dictName) {    
    const div = (
      <div className={"tableContainer"} name={ dictName }>
        <p className={"tableTitle"}>{ dictName }</p>
        <table className={ "tableTable" }>  
          <tbody className={ "tableBody" }>
            { generateRows(dict) }
          </tbody>
        </table>
      </div>
    )

    return div
  }

  function sortStages(stages) {
    const stageOrder =['45', '120', '180', 'ALJ']
    const ordering = {}
    for (let i = 0; i<stageOrder.length; i++) {
      ordering[stageOrder[i]] = i;
    }

    return stages.sort( (a,b) => ordering[a.stage] - ordering[b.stage] )
  }

  const facilityDiv = generateTable(adrData.Facility, "Facility")
  const patientDiv = generateTable(adrData.Patient, "Patient")
  const adrDiv = generateTable(adrData.Adr, "ADR")
  const stagesDiv = sortStages(adrData.Adr.stages).map(stage=> generateTable(stage, "Stage") )
  
  return (
    <div name={"adr_container"} className={"adrContainer"}>
      { facilityDiv }
      { patientDiv }
      { adrDiv }
      { stagesDiv }
    </div>
  )
}

export default Adr
