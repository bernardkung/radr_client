import { count } from "d3";
import StackedBarChart from "../components/StackedBarChart"

export default function WaitCard({ data }) {

  const dims = { 
    width: 350, 
    height: 150,
    axisHeight: 15,
    innerRadius: 0,
    outerRadius: 80,
    padding: { top: 30, right: 0, bottom: 0, left: 40, bar: 0.5 }
  }

  // console.log(data)
  // console.log(new Date('2024-02-14'))

  // Get a count of stages due and submitted in next 4 weeks
  function getStagesDue(data, startDate=new Date()) {

    function addDays(date, days) {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() + days);
      return newDate;
    }

    const weeks = [0, 1, 2, 3].map(w=>{
      return {
        label: "Week " + w.toString(),
        startDate : addDays(startDate, w*7),
        stopDate  : addDays(startDate, (w*7)+6),
        stages    : [],
        due       : 0,
        submitted : 0,
        // due       : [],
        // submitted : [],
        count     : 0,
        countDue      : 0,
        countSubmitted: 0,
      }
    })

    const stagesDue = data.map(d=>{
      weeks.forEach(week=>{
        
        const newStages = d.Adr.stages.filter(stage=>{
          const dueDate = new Date(stage['due_date'])
          return week.startDate <= dueDate && dueDate <= week.stopDate
        })

        newStages.forEach(stage=>{
          if (stage.submissions.length > 0) {
            // week.submitted = [...week.submitted, stage]
            week.submitted += 1
            week.countSubmitted += 1
          } else {
            // week.due = [...week.due, stage]
            week.due += 1
            week.countDue += 1
          }
        })

        week.stages = [...week.stages, ...newStages]
        week.count = week.count + newStages.length
      })
    })

    return weeks
  }
  
  const weeks = getStagesDue(data, new Date('2024-08-28 EST'))
  console.log(weeks)


  function barMap(weeks) {
    return weeks.map(week=>{
      return {
        x: week.label,
        y: week.count,
      }
    })
  }

  
  return (
    <div className={"viz a2 flexRow summary"}>
      
      <h2 className={"summaryTitle"}>Outstanding ADRs</h2>

      <div className={"summaryCol"}>
        <p className={"summaryValue"}>{ weeks.reduce((acc, week)=>week.due + acc, 0) }</p>
        <h3 className={"summaryLabel"}>Awaiting Decision</h3>
        <p className={"summaryValue"}>{ weeks.reduce((acc, week)=>week.submitted + acc, 0) }</p>
        <h3 className={"summaryLabel"}>Awaiting Payment</h3>
      </div>

      <div className={"summaryPlot"}>

        <StackedBarChart 
          data={ weeks }
          xVar={'label'} 
          yVar={'count'}
          subgroups={['due', 'submitted']}
          orient = { "vertical" }
          title = { "" }
          axisLabel={ "" }
          dims = { dims }
          colors = {[
            "#B5373D",
            "#b4b4b4", 
            "#a8b2e9",
          ]}
          options = {{
            axes: false,
            labels: false,
            values: false
          }}
        />


      </div>

    </div>
  )
}