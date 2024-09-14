import * as d3 from "d3"
import { useMemo, useState, useRef } from "react"
import { HorizontalAxis } from './HorizontalAxis';
import Bar from './Bar'
import Tooltip from './Tooltip'

const BarChart = ({ data, xVar, yVar, orient="horizontal", title, horizontalLabel, dims }) => {
  const [ interactionData, setInteractionData ] = useState(undefined);
  const ref = useRef(null);

  const xMin = 0
  const xMax = d3.max(data.map(d=>d[xVar]))
  // const yMin = d3.min(data.map(d=>d[yVar]))
  // const yMax = d3.max(data.map(d=>d[yVar]))
  const yDomain = data.map(d=>d[yVar])


  const xScale = useMemo(()=>{
    return d3.scaleLinear()
      .domain([xMin, xMax])
      .range([dims.padding.left, dims.width-dims.padding.right-dims.padding.left])
      .nice()
  }, [data, dims])

  const yScale = useMemo(()=>{
    return d3.scaleBand()
      .domain(yDomain)
      .range([dims.height-dims.padding.bottom-dims.bottomAxisHeight, dims.padding.top])
      .padding(0.1)
  }, [data, dims])
  
  const onMouseEnter = (e, d)=>{ 
    // Highlight         
    if (ref.current) {
      ref.current.classList.add("hasHighlight");
    }
    // Tooltip
    setInteractionData({
      xPos: xScale(d[xVar])+20,
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
              
            {data.map(d=>(
              <Bar 
                key={d[xVar]} 
                x={d[xVar]} 
                y={d[yVar]} 
                d={d}
                xScale={xScale} 
                yScale={yScale}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              />
            ))}


            <HorizontalAxis scale={xScale} xScale={xScale} axisLabel={ horizontalLabel } dims={dims} numberOfTicksTarget={10}/>

          </g>
        </svg>

        <Tooltip interactionData={interactionData} dims={dims} />

      </div>
    </div>
  )
}

export default BarChart