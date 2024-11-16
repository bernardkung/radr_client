import { useMemo } from "react"

const Bar = ({x, y, x0=0, y0=0, d, color="#377CB5", xScale, yScale, orient="horizontal", onMouseEnter, onMouseLeave, options={} })=>{

  const value = ()=>{
    if (options['values']!=false) {
      return (
        <text
          key={y + "Value"}
          className={"shapeValue"}
          x={orient=="horizontal" 
            ? xScale(x) - 13 
            : xScale(x) + xScale.bandwidth() / 2 
          }
          y={orient=="horizontal" 
            ? yScale(y) + yScale.bandwidth() / 2 
            : yScale(y) + 17 
          }
          textAnchor={orient=="horizontal" ? "end" : "middle"}
          alignmentBaseline={orient=="horizontal" ? "central" : "middle"}
          fontSize={12} 
          // hide label if bar is not wide enough
          opacity={orient=="horizontal" 
            ? xScale(x) > 120 ? 1 : 0
            : yScale(y) < yScale.range()[0] - 120 ? 1 : 0
          }
        >
          { orient == "horizontal" ? x.toLocaleString() : y.toLocaleString() }
        </text>
      )

    }
  }

  const label = ()=>{
    if (options['labels']!=false) {
      return (
        <text
          key={y + "Label"}
          className={"shapeLabel"}
          // x={ xScale.range()[0] + 13}
          // y={ yScale(y) + yScale.bandwidth() / 2 }
          x={orient=="horizontal" 
            ? xScale.range()[0] + 13 
            : xScale(x) + xScale.bandwidth() / 2
          }
          y={orient=="horizontal" 
            ? yScale(y) + yScale.bandwidth() / 2 
            : yScale.range()[0] - 13 
          }
          textAnchor={orient=="horizontal" ? "base" : "middle"}
          alignmentBaseline={orient=="horizontal" ? "central" : "middle"}
          fontSize={14}
          fontWeight={600}
          // // hide label if bar is not wide enough
          // opacity={orient=="horizontal" 
          //   ? xScale(x) > 90 ? 1 : 0
          //   : yScale(y) > 90 ? 1 : 0
          // }
        >
          { orient == "horizontal" ? y : x }
        </text>
      )
    }
  }

  const shape = useMemo(()=>(
    <g key={y } className={"bar shapeGroup"}>
      <rect 
        key={y + "Bar"}
        className={"shape"}
        x={ orient == "horizontal" 
          ? xScale.range()[0] 
          : xScale(x)
        }
        y={ orient == "horizontal" 
          ? yScale(y) 
          : yScale(y)
        }
        width={ orient == "horizontal" 
          ? xScale(x)-xScale(x0)
          : xScale.bandwidth()
        }
        height={ orient == "horizontal" 
          ? yScale.bandwidth() 
          : yScale(y0) - yScale(y)
        }
        opacity={0.7}
        stroke={color}
        fill={color}
        // fillOpacity={0.3}
        // strokeWidth={1}
        onMouseEnter={e=>onMouseEnter(e, d)}
        onMouseLeave={onMouseLeave}
        data-value={yScale.range()[0]}
      />

      { value() }
      { label() }

    </g>  
  ))
  return (shape)
}

export default Bar