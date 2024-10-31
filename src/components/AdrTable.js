import { memo, useEffect, useState, useMemo } from "react";

export const AdrTable = ({ data }) => {
  const [content, setContent] = useState([])

  useEffect(()=>{ 
    if (data) {
      const listDivs = data.map(d=>{ return (
        <tr>
          <td>{ d.Facility.dl_id }</td>
          <td>{ d.Facility.dl_name }</td>
  
          <td>{ d.Patient.mrn }</td>
          <td>{ d.Patient.first_name + " " + d.Patient.last_name }</td>
  
          <td>{ d.Adr.adr_id }</td>
          <td>{ d.Adr.from_date }</td>
          <td>{ d.Adr.to_date }</td>
  
          <td>{ d.Adr.expected_reimbursement }</td>
        </tr>
      )})
      setContent(listDivs)
    } 

  })


  return (
    <table>
      <tr>
        <th>DL ID</th>
        <th>DL Name</th>

        <th>MRN</th>
        <th>Patient Name</th>

        <th>ADR ID</th>
        <th>From Date</th>
        <th>To Date</th>
        
        <th>Expected Reimbursement</th>
      </tr>
      { content }
    </table>
  )
}

export default AdrTable