
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
    return Object.entries(dict).map(([key, value],i)=>{
      if (typeof(value) !== 'object') {
        return (          
          <tr key={i} className={"tableRow"}>
            <th className={"tableHeader"}>{ key }</th>
            <td className={"tableValue"}>{ value }</td>
          </tr>
      )}
    })
  }

  function generateTable(dict, dictName) {
    return (
      <div>
        <p className={"tableTitle"}>{dictName}</p>
        <table className={"tableTable"}>  
          <tbody classname={"tableBody"}>
            { generateRows(dict) }
          </tbody>
        </table>
      </div>
    )
  }
  
  return (
    <div>
      {generateTable(adrData.Facility, "Facility")}
      
      {generateTable(adrData.Patient, "Patient")}

      {generateTable(adrData.Adr, "ADR")}
      
      {adrData.Adr.stages.map(stage=>{
        {generateTable(stage, "Stage")}
      })}
      

    </div>
  )
}

export default Adr
