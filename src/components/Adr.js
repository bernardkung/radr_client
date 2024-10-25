import { memo, useMemo } from "react";

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


  function guessType(event, capitalized=false) {
    function capitalize(s) {
      return String(s).charAt(0).toUpperCase() + String(s).slice(1);
    }
    const guess = Object.keys(event)[0].split("_")[0]
    const formatGuess = capitalized
      ? capitalize(guess)
      : guess

    console.log(Object.keys(event)[0], formatGuess)
    return formatGuess
  }

  function generateTable(dict, dictName="") {    
    if ( dictName=="" ) { dictName=guessType(dict, true)}

    const div = (
      <div className={"tableContainer flexCol"} name={ dictName }>
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

  function sortStages(stages, asc=true) {
    const stageOrder =['45', '120', '180', 'ALJ']
    const ordering = {}
    for (let i = 0; i<stageOrder.length; i++) {
      ordering[stageOrder[i]] = i;
    }

    return stages.sort( (a,b) => asc
      ? ordering[a.stage] - ordering[b.stage] 
      : ordering[b.stage] - ordering[a.stage] 
    )
  }

  function sortEvents(a, b, asc=true) {
    const aType = guessType(a)
    const bType = guessType(b)
    const aDateStr = aType + "_date"
    const bDateStr = bType + "_date"
    // const aDate = new Date(a[aDateStr])
    // const bDate = new Date(b[bDateStr])
    const order = a[aDateStr] >= b[bDateStr] 
      ? 1 
      : a[aDateStr] < b[bDateStr]
        ? -1
        : 0
    return asc
      ? order
      : -order
  }

  function generateStagesTable(stages, asc=true) {
    // Sort then map through each stage
    return sortStages(stages, asc).map(stage=> { 
      // Generate a table for the stage
      const stageDiv = generateTable(stage, "Stage") 
      // Generate events and a table for each event
      const events = [...stage.submissions, ...stage.decisions]
      const eventsDivs = events
        .sort((a,b)=>sortEvents(a, b, asc))
        .map(event => generateTable(event))

      // Build output div
      const divs = (
        <div>
          { stageDiv }
          { eventsDivs }
        </div>
      )

      return divs
    })
  }

  const facilityDiv = generateTable(adrData.Facility, "Facility")
  const patientDiv = generateTable(adrData.Patient, "Patient")
  const adrDiv = generateTable(adrData.Adr, "ADR")
  const stagesDivs = generateStagesTable(adrData.Adr.stages, false)
  
  return (
    <div name={"adr_container"} className={"adrContainer"}>
      { facilityDiv }
      { patientDiv }
      { adrDiv }
      { stagesDivs }
    </div>
  )
}

export default Adr
