import * as d3 from "d3";
import { useMemo, useState, useRef } from "react";
import Tooltip from './Tooltip';

const LineChart = ({ data, xVar, yVar, title, dims, colors }) => {

  console.log("linedata", data)
  const [ interactionData, setInteractionData ] = useState(undefined);
  const ref = useRef(null);

  // Need handling for date type vs numeric type
  const xMin = d3.min(data.map(d=>(new Date(d[xVar]))))
  const xMax = d3.max(data.map(d=>(new Date(d[xVar]))))
  const yMin = d3.min(data.map(d=>d[yVar]))
  const yMax = d3.max(data.map(d=>d[yVar]))

  const xScale = useMemo(()=>{
    return d3.scaleTime()
      .domain([xMin, xMax])
      .range([
        dims.padding.left, 
        dims.width-dims.padding.right-dims.padding.left,
        // dims.padding.left+1.5*dims.axisHeight, 
        // dims.width-dims.padding.right-dims.padding.left+dims.axisHeight
      ])
      .nice()
  })
  const yScale = useMemo(()=>{
    return d3.scaleLinear()
      .domain([yMin, yMax])
      .range([
        dims.height-dims.padding.bottom-dims.axisHeight, 
        dims.padding.top
      ])
  })
  
  const onMouseEnter = () => {
    // // Highlight         
    // if (ref.current) {
    //   ref.current.classList.add("hasHighlight");
    // }
    // // Tooltip
    // setInteractionData({
    //   xPos: orient=="horizontal" 
    //     ? xScale(d[xVar]) + 70 
    //     : xScale(d[xVar]) + (xScale.bandwidth() / 2),
    //   yPos: orient=="horizontal" 
    //     ? yScale(d[yVar]) + (yScale.bandwidth() / 2) 
    //     : yScale(d[yVar]) - 40,
    //   labelName: d.x,
    //   labelValue: d.y,
    // })
  }

  const onMouseLeave = () => {
    // Highlight         
    if (ref.current) {
      ref.current.classList.remove("hasHighlight");
    }
    // Tooltip
    setInteractionData(undefined)
  }
  
  const lineGenerator = d3.line()
    .x(d=>xScale((new Date(d[xVar]))))
    .y(d=>yScale(d[yVar]))

  const linePath = lineGenerator(data)  
  
  console.log(linePath)
  
  const circles = data.map((d, i)=>{  
    return (
      <g key={i} className={"circle"}>
      </g>
    )
  })


  return (
    <div className={"viz lineChart"} name={title}>
      <p className={"vizTitle"}>{ title }</p>
      <div className={"visPlot"}>

        <svg width={dims.width} height={dims.height}>
          <g
            className={"vizPlotContainer"}
            // transform={`translate(${ 0 }, ${dims.height / 2})`}
            // transform={`translate(${dims.width / 2}, ${dims.height / 2})`}
            ref={ref}
          >
            <path 
              d={ linePath }
              stroke="#9a6fb0"
              fill="none"
              strokeWidth={2}
            />
          </g>
          
        </svg>

        <Tooltip interactionData={interactionData} dims={dims} />
        
      </div>
    </div>
  )
}
export default LineChart
