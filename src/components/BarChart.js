import * as d3 from "d3"
import { useMemo, useState, useRef } from "react"
import { HorizontalAxis } from './HorizontalAxis';
import Bar from './Bar'
import Tooltip from './Tooltip'
import { VerticalAxis } from "./VerticalAxis";

const BarChart = ({ data, xVar, yVar, orient="horizontal", title, axisLabel, dims }) => {
  const [ interactionData, setInteractionData ] = useState(undefined);
  const ref = useRef(null);

  // console.log("bardata", data)

  // Horizontal
  const xMin = 0
  const xMax = d3.max(data.map(d=>d[xVar]))
  const yDomain = data.map(d=>d[yVar])

  // Vertical
  const xDomain = data.map(d=>d[xVar])
  const yMin = 0
  const yMax = d3.max(data.map(d=>d[yVar]))

  const xScale = useMemo(()=>{
    if (orient=="horizontal") {
      return d3.scaleLinear()
        .domain([xMin, xMax])
        .range([dims.padding.left, dims.width-dims.padding.right-dims.padding.left])
        .nice()
    } else if (orient=="vertical") {
      return d3.scaleBand()
        .domain(xDomain)
        .range([dims.padding.left, dims.width-dims.padding.right-dims.padding.left])
        .padding(0.1)
    }
  }, [data, dims])

  const yScale = useMemo(()=>{
    if (orient=="horizontal") {
      return d3.scaleBand()
        .domain(yDomain)
        .range([dims.height-dims.padding.bottom-dims.axisHeight, dims.padding.top])
        .padding(0.1)
    } else if (orient=="vertical") {
      return d3.scaleLinear()
        .domain([yMin, yMax])
        .range([dims.height-dims.padding.bottom-dims.axisHeight, dims.padding.top])
        .nice()
    }
  }, [data, dims])

  // MOUSEOVER Interactions
  const onMouseEnter = (e, d)=>{ 
    // Highlight         
    if (ref.current) {
      ref.current.classList.add("hasHighlight");
    }
    // Tooltip
    setInteractionData({
      xPos: orient=="horizontal" 
        ? xScale(d[xVar]) + 70 
        : xScale(d[xVar]) + (xScale.bandwidth() / 2),
      yPos: orient=="horizontal" 
        ? yScale(d[yVar]) + (yScale.bandwidth() / 2) 
        : yScale(d[yVar]) - 40,
      labelName: d.x,
      labelValue: d.y,
    })
  }

  const onMouseLeave = (e)=>{          
    if (ref.current) {
      ref.current.classList.remove("hasHighlight");
    }
    setInteractionData(undefined)
  }

  const shapes = useMemo(()=>data.map(d=>{
    return (
      <Bar 
        key={d[xVar]} 
        x={d[xVar]} 
        y={d[yVar]} 
        d={d}
        xScale={xScale} 
        yScale={yScale}
        orient={orient}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
  )}))
  
  const axis = useMemo(()=>orient == "horizontal"
    ? <HorizontalAxis xScale={xScale} axisLabel={ axisLabel } dims={dims} numberOfTicksTarget={10}/>
    : <VerticalAxis yScale={yScale} axisLabel={ axisLabel } dims={dims} numberOfTicksTarget={10}/>
  )

  return (
    <div className={"viz barchart"} name={title}>
      <p className={"vizTitle"}>{ title }</p>
      <div className={"vizPlot"}>

        <svg width={dims.width} height={dims.height}>
          <g
            // transform={`translate(${dims.width / 2}, ${dims.height / 2})`}
            className={"vizPlotContainer"}
            ref={ref}
          >
            { shapes }
            { axis }
          </g>
        </svg>

        <Tooltip interactionData={interactionData} dims={dims} />

      </div>
    </div>
  )
}

export default BarChart