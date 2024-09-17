const Bar = ({x, y, d, xScale, yScale, orient="horizontal", onMouseEnter, onMouseLeave })=>{

  console.log("xy", orient,  yScale.range()[0])

  return (
  <g key={y } className={"bar shape"}>
    <rect 
      key={y + "Bar"}
      x={ orient == "horizontal" 
        ? xScale.range()[0] 
        : xScale(x)
      }
      y={ orient == "horizontal" 
        ? yScale(y) 
        : yScale(y)
      }
      width={ orient == "horizontal" 
        ? xScale(x)-xScale.range()[0] 
        : xScale.bandwidth()
      }
      height={ orient == "horizontal" 
        ? yScale.bandwidth() 
        : yScale(0) - yScale(y)
      }
      opacity={0.7}
      stroke="#9d174d"
      fill="#9d174d"
      fillOpacity={0.3}
      strokeWidth={1}
      onMouseEnter={e=>onMouseEnter(e, d)}
      onMouseLeave={onMouseLeave}
      data-value={yScale.range()[0]}
    />
    <text
      key={y + "Value"}
      className={"value"}
      x={orient=="horizontal" ? xScale(x) - 13 : xScale(x) + xScale.bandwidth() / 1.6 }
      y={orient=="horizontal" ? yScale(y) + yScale.bandwidth() / 2 : yScale(y) - 13 }
      textAnchor="end"
      alignmentBaseline="central"
      fontSize={12}
      opacity={xScale(x) > 90 ? 1 : 0} // hide label if bar is not wide enough
    >
      { orient == "horizontal" ? x : y }
    </text>

    <text
      key={y + "Label"}
      className={"value"}
      // x={ xScale.range()[0] + 13}
      // y={ yScale(y) + yScale.bandwidth() / 2 }
      x={orient=="horizontal" 
        ? xScale.range()[0] + 13 
        : xScale(x) + xScale.bandwidth() / 2.8
      }
      y={orient=="horizontal" 
        ? yScale(y) + yScale.bandwidth() / 2 
        : yScale.range()[0] + 13 
      }
      textAnchor="base"
      alignmentBaseline="central"
      fontSize={14}
      fontWeight={600}
      opacity={xScale(x) > 90 ? 1 : 0} // hide label if bar is not wide enough
    >
      { orient == "horizontal" ? y : x }
    </text>

  </g>  
  )
}

export default Bar