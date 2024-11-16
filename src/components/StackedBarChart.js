import * as d3 from "d3"
import { useMemo, useState, useRef } from "react"
import Bar from './Bar'
import Tooltip from './Tooltip'
import { HorizontalAxis } from './HorizontalAxis';
import { VerticalAxis } from "./VerticalAxis";

export default function StackedBarChart ({ data, xVar, yVar, subgroups=[], stacked=true, orient="horizontal", title, axisLabel, colors=[], dims, options={} }) {
  const [ interactionData, setInteractionData ] = useState(undefined);
  const ref = useRef(null);

  console.log("bardata", data)

  // Horizontal
  const xMin = 0
  const xMax = d3.max(data.map(d=>d[xVar]))
  const yDomain = data.map(d=>d[yVar])

  // Vertical
  const xDomain = data.map(d=>d[xVar])
  const yMin = 0
  const yMax = d3.max(data.map(d=>d[yVar]))

  // If building a stacked bar chart
  const stack = d3.stack()
    .keys(subgroups)
  const stackedData = stack(data)
  console.log("sd:", stackedData)

  const xScale = useMemo(()=>{
    if (orient=="horizontal") {
      return d3.scaleLinear()
        .domain([xMin, xMax])
        .range([dims.padding.left, dims.width-dims.padding.right-dims.padding.left])
        .nice()
    } else if (orient=="vertical") {
      return d3.scaleBand()
        .domain(xDomain)
        .range([
          dims.padding.left+1.5*dims.axisHeight, 
          dims.width-dims.padding.right-dims.padding.left+dims.axisHeight
        ])
        .padding(dims.padding.bar ? dims.padding.bar : 0.1)
    }
  }, [data, dims])

  const yScale = useMemo(()=>{
    if (orient=="horizontal") {
      return d3.scaleBand()
        .domain(yDomain)
        .range([
          dims.height-dims.padding.bottom-dims.axisHeight, 
          dims.padding.top
        ])
        .padding(0.1)
    } else if (orient=="vertical") {
      return d3.scaleLinear()
        .domain([yMin, yMax])
        .range([
          dims.height-dims.padding.bottom, 
          dims.padding.top
        ])
        .nice()
    }
  }, [data, dims])

  // MOUSEOVER Interactions
  const onMouseEnter = (e, d)=>{ 
    // Highlight         
    if (ref.current) {
      ref.current.classList.add("hasHighlight");
    }
    console.log(ref.current)
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


  const shapes = useMemo(()=>stackedData.map((subgroup,s)=>{
    return (
      <g key={s}>
        {subgroup.map((d,i)=>{
          return (
            <Bar 
              key={d.data[xVar]} 
              x={d.data[xVar]} 
              y={d[1]} 
              y0={d[0]}
              d={d.data}
              xScale={xScale} 
              yScale={yScale}
              orient={orient}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              color={colors[s]}
              options = { options }
            />
          )
        })}
      </g>
  )}))
  
  const axis = useMemo(()=>options['axes']!= false
    ? orient == "horizontal"
      ? <HorizontalAxis xScale={xScale} axisLabel={ axisLabel } dims={dims} numberOfTicksTarget={10}/>
      : <VerticalAxis yScale={yScale} axisLabel={ axisLabel } dims={dims} numberOfTicksTarget={10}/>
    : <></>
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

        {/* <Tooltip interactionData={interactionData} dims={dims} /> */}

      </div>
    </div>
  )
}
