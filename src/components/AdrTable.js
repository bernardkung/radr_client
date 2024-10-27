import { memo, useMemo } from "react";

export const AdrTable = ({ data }) => {
  console.log(data)

  const list = data.map(d=>{ return (
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
      { list }
    </table>
  )
}

export default AdrTable