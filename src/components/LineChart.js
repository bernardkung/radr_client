import * as d3 from "d3";
import { useMemo, useState, useRef } from "react";
import Tooltip from './Tooltip';
import Circle from './Circle';
import { HorizontalAxis } from './HorizontalAxis';
import { VerticalAxis } from "./VerticalAxis";

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
  
  const lineGenerator = d3.line()
    .x(d=>xScale((new Date(d[xVar]))))
    .y(d=>yScale(d[yVar]))

  const linePath = lineGenerator(data)  


  const circles = data.map((d, i)=>{  

    const onMouseEnter = () => {
      // Highlight         
      if (ref.current) {
        ref.current.classList.add("hasHighlight");
      }
      // Tooltip
      setInteractionData({
        xPos: xScale((new Date(d[xVar]))),
        yPos: yScale(d[yVar])-50,
        labelName: d[xVar],
        labelValue: 'due: ' + d['value'],
        labelMisc: 'total: ' + d[yVar],
      })
    }
  
    const onMouseLeave = () => {
      // // Highlight         
      // if (ref.current) {
      //   ref.current.classList.remove("hasHighlight");
      // }
      // // Tooltip
      // setInteractionData(undefined)
    }
    
    return (
      <Circle 
        key={i}
        cx={ xScale((new Date(d[xVar]))) } 
        // cx={ xScale(d[xVar]) } 
        cy={ yScale(d[yVar]) }
        radius={7}
        fill={"#9a6fb0"}
        onMouseEnter={ onMouseEnter }
        onMouseLeave={ onMouseLeave }
        xScale={xScale}
        yScale={yScale}
      />
    )
  })


  return (
    <div className={"viz lineChart"} name={title}>
      <p className={"vizTitle"}>{ title }</p>
      <div className={"vizPlot"}>

        <svg width={dims.width} height={dims.height}>
          <g
            className={"vizPlotContainer"}
            ref={ref}
          >
            <path 
              d={ linePath }
              stroke="#9a6fb0"
              fill="none"
              strokeWidth={2}
            />

            { circles }
            <HorizontalAxis xScale={xScale} axisLabel={ 'Date' } dims={dims} numberOfTicksTarget={10}/>
            <VerticalAxis yScale={yScale} axisLabel={ 'Total Due' } dims={dims} numberOfTicksTarget={10}/>
          </g>
          
        </svg>

        <Tooltip interactionData={interactionData} dims={dims} />
        
      </div>
    </div>
  )
}
export default LineChart
