
import Radar from './Radar'


export default function Workload ({ loading, data }) {

  function getAuditor(row) {
    return (
      row.Adr.stages.map(stage=>{
        if (stage.submissions) {
          return stage.submissions.map(submission=>{
            if (submission) {
              console.log(submission.auditor)
              return submission.auditor.auditor_name
            }
          })
        }
      })
    )
  }

  // console.log(getAuditor(data[0]))

  if (loading) {
    return (
    <div className="loading flexCol">
      <Radar />
    </div>)
  }

  return (
    <p>{getAuditor(data[0])}</p>
  )
}