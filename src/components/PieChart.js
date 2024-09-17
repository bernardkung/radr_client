import * as d3 from "d3";
import { useMemo, useState, useRef } from "react";
import Tooltip from './Tooltip';

const PieChart = ({ data, label, dims, colors }) => {

  const [ interactionData, setInteractionData ] = useState(undefined);
  const ref = useRef(null);

  
  // Compute a pie generator = a function that transforms a dataset in a list of arcs
  const pieGenerator = d3.pie().value(d => d.y)
  
  // Use this pie generator on our initial dataset
  const pie = pieGenerator(data)

  // Compute an arc generator = a function that transforms arc coordinates in a svg path
  const arcGenerator = d3.arc();
  
  // Build the shapes
  const shapes = pie.map(( slice, i ) => { 
    const sliceInfo = {
      innerRadius: dims.innerRadius,
      outerRadius: dims.outerRadius,
      startAngle: slice.startAngle,
      endAngle: slice.endAngle,
    }
    const centroid = arcGenerator.centroid(sliceInfo);
    const slicePath = arcGenerator(sliceInfo);

    // Second arc is for the legend inflexion point
    const INFLEXION_PADDING = 60;
    const inflexionInfo = {
      innerRadius: dims.innerRadius + INFLEXION_PADDING,
      outerRadius: dims.outerRadius + INFLEXION_PADDING,
      startAngle: slice.startAngle,
      endAngle: slice.endAngle,
    };
    const inflexionPoint = arcGenerator.centroid(inflexionInfo);

    const isRightLabel = inflexionPoint[0] > 0;
    const labelPosX = inflexionPoint[0] + 20 * (isRightLabel ? 1 : -1);
    const isTopLabel = inflexionPoint[1] > 0;
    const labelPosY = inflexionPoint[1] //+ 20 * (isTopLabel ? 1 : -1);
    const textAnchor = isRightLabel ? "start" : "end";
    const label = slice['data']['x'] + " (" + "$" + Math.round(slice['data']['y']).toLocaleString() + ")";
    const labelName = slice['data']['x']
    const labelValue = "$" + Math.round(slice['data']['y']).toLocaleString()
    const labelMisc = Math.round( 100 * (slice.endAngle - slice.startAngle ) / 6.283185307179587 ) + "%"
    
    const tooltip_padding = 30;

    const onMouseEnter = () => {
      // Highlight         
      if (ref.current) {
        ref.current.classList.add("hasHighlight");
      }
      //Tooltip
      setInteractionData({
        // Translate inflexion cx,cy to x,y
        xPos: inflexionPoint[0]+(dims.width/2) + tooltip_padding * (isRightLabel ? 1 : -1),
        yPos: inflexionPoint[1]+(dims.height/2) + tooltip_padding * (isTopLabel ? 1 : -1),
        labelName: labelName,
        labelValue: labelValue,
        labelMisc: [labelMisc],
      })

    }

    const onMouseLeave = () => {
      // Highlight         
      if (ref.current) {
        ref.current.classList.remove("hasHighlight");
      }
      // Tooltip
      setInteractionData(undefined)
    }


    return (
      <g key={i} className={"shapeGroup"}>
        <path 
          className={"shape"}
          d={slicePath} 
          stroke={colors[i]} 
          fill={colors[i]} 
          onMouseEnter={() => onMouseEnter()}
          onMouseLeave={() => onMouseLeave()}
        />
        <circle cx={centroid[0]} cy={centroid[1]} r={2} />
        <line
          x1={centroid[0]}
          y1={centroid[1]}
          x2={inflexionPoint[0]}
          y2={inflexionPoint[1]}
          stroke={"black"}
          fill={"black"}
        />
        <line
          x1={inflexionPoint[0]}
          y1={inflexionPoint[1]}
          x2={labelPosX}
          y2={labelPosY}
          stroke={"black"}
          fill={"black"}
        />
        <text 
          x={labelPosX + (isRightLabel ? 2 : -2)}
          y={inflexionPoint[1]-6}
          textAnchor={textAnchor}
          dominantBaseline="middle"
          fontSize={14}
        >
          {labelName}
        </text>
        <text 
          x={labelPosX + (isRightLabel ? 2 : -2)}
          y={inflexionPoint[1]+6}
          textAnchor={textAnchor}
          dominantBaseline="middle"
          fontSize={14}
        >
          {labelValue}
        </text>
      </g>
    );
  })

  // Return visualization
  return (
    <div className={"viz piechart"} name={label}>
      <p className={"vizTitle"}>{ label }</p>
      <div className={"vizPlot"}>
        <svg width={dims.width} height={dims.height}>
          <g 
            className={"vizPlotContainer"}
            transform={`translate(${dims.width / 2}, ${dims.height / 2})`}
            ref={ref}
          >
            { shapes }
          </g>
        </svg>
        
        <Tooltip interactionData={interactionData} dims={dims} />
      </div>
    </div>
  )
}
export default PieChart
