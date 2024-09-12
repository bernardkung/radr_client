import * as d3 from "d3";
import { useMemo } from "react";

const PieChart = ({ data, label, dims, colors }) => {

  console.log("data:", data)
  // Compute a pie generator = a function that transforms a dataset in a list of arcs
  const pieGenerator = d3.pie().value((d) => d.y)
  
  // Use this pie generator on our initial dataset
  const pie = pieGenerator(data)

  // Compute an arc generator = a function that transforms arc coordinates in a svg path
  const arcGenerator = d3.arc();

  // For each arc, use the path generator
  const arcs = pie.map((p) =>
    arcGenerator({
      innerRadius: dims.innerRadius,
      outerRadius: dims.outerRadius,
      startAngle: p.startAngle,
      endAngle: p.endAngle,
    })
  )
  
  // For each datapoint
  const shapes = pie.map(( slice, i ) => { 
    const sliceInfo = {
      innerRadius: dims.innerRadius,
      outerRadius: dims.outerRadius,
      startAngle: slice.startAngle,
      endAngle: slice.endAngle,
    }
    const centroid = arcGenerator.centroid(sliceInfo);
    const slicePath = arcGenerator(sliceInfo);

    console.log("sp:", slicePath)
    // Second arc is for the legend inflexion point
    const inflexionInfo = sliceInfo
    const inflexionPoint = arcGenerator.centroid(inflexionInfo);

    const isRightLabel = inflexionPoint[0] > 0;
    const labelPosX = inflexionPoint[0] + 50 * (isRightLabel ? 1 : -1);
    const textAnchor = isRightLabel ? "start" : "end";
    const label = slice['data']['x'] + " (" + "$" + Math.round(slice['data']['y']).toLocaleString() + ")";
    const labelName = slice['data']['x']
    const labelValue = "$" + Math.round(slice['data']['y']).toLocaleString()
    
    return (
      <g key={i}>
        <path d={slicePath} fill={colors[i]} />
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
          y2={inflexionPoint[1]}
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

  console.log("slices:", shapes)


  return (
    <div className={"viz piechart"} name={label}>
      <p className={"vizTitle"}>{ label }</p>

      <svg width={dims.width} height={dims.height}>
        <g transform={`translate(${dims.width / 2}, ${dims.height / 2})`}>
          { shapes }
        </g>
      </svg>

    </div>
  )
}
export default PieChart
