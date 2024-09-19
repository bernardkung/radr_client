

export const Circle = ({ cx, cy, radius=7, fill, onMouseEnter, onMouseLeave, xScale, yScale })=>{

  return (
  <g className={"circle shapeGroup"}>
    <circle
      className={"shape"}
      r = { radius } // radius
      cx = { cx } // position on the X axis
      cy = { cy } // on the Y axis
      opacity = { 1 }
      stroke = { fill }
      fill = { fill }
      fillOpacity = { 0.2 }
      strokeWidth = { 1 }
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />

  </g>  
  )
}

export default Circle