import * as d3 from "d3"
import { useMemo, useState, useRef } from "react"
import { HorizontalAxis } from './HorizontalAxis';
import Bar from './Bar'
import Tooltip from './Tooltip'
import { VerticalAxis } from "./VerticalAxis";

const BarChart = ({ data, xVar, yVar, orient="horizontal", title, horizontalLabel, dims }) => {
  const [ interactionData, setInteractionData ] = useState(undefined);
  const ref = useRef(null);

  console.log(data)

  const xMin = 0
  const xMax = d3.max(data.map(d=>d[xVar]))
  const xDomain = data.map(d=>d[xVar])
  const yMin = 0
  const yMax = d3.max(data.map(d=>d[yVar]))
  const yDomain = data.map(d=>d[yVar])

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
        .range([dims.height-dims.padding.bottom-dims.bottomAxisHeight, dims.padding.top])
        .padding(0.1)
    } else if (orient=="vertical") {
      return d3.scaleLinear()
        .domain([xMin, xMax])
        .range([dims.height-dims.padding.bottom-dims.bottomAxisHeight, dims.padding.top])
        .nice()
    }
  }, [data, dims])

  console.log("xs", xScale(xMin), xScale(xMax))
  console.log("ys", xScale(yMin), xScale(yMax))
  
  const onMouseEnter = (e, d)=>{ 
    // Highlight         
    if (ref.current) {
      ref.current.classList.add("hasHighlight");
    }
    // Tooltip
    setInteractionData({
      xPos: xScale(d[xVar]) + 20,
      yPos: yScale(d[yVar]) + (yScale.bandwidth() / 2),
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

  const shapes = data.map(d=>{
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
  )})
  
  const axis = orient == "horizontal"
    ? <HorizontalAxis xScale={xScale} axisLabel={ horizontalLabel } dims={dims} numberOfTicksTarget={10}/>
    : <VerticalAxis yScale={xScale} axisLabel={ horizontalLabel } dims={dims} numberOfTicksTarget={10}/>

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