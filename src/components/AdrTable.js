import { memo, useEffect, useState, useMemo } from "react";
import Radar from "../components/Radar"
import * as d3 from "d3"

export const AdrTable = ({ loading, data }) => {
  const [content, setContent] = useState([])


  if (loading) {
    return (
    <div className="loading flexCol">
      <Radar />
    </div>)
  }

  const listDivs = data.map((d,i)=>{ return (
    <tr key={i}>
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
    <table className={"adrTable"}>
      <thead>
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
      </thead>
      <tbody>

        { listDivs }

      </tbody>
    </table>
  )
}

export default AdrTable