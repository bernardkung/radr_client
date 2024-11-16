
export default function Tooltip2 ({ interactionData, dims }) {
  // console.log(interactionData)
  if (!interactionData) {
    return null;
  }

  const rows = (data) => {
    return (
      data.map((d,i)=>{
        return (
          <p className="tooltipRow" key={i}>
            <span className={"tooltipLabel"}>{ Object.keys(d)[0] }</span>
            <span className={"tooltipValue"}>{ Object.values(d)[0] }</span>
          </p>
        )
      })
    )
  }
  // console.log(rows(d))
    
  return (

    // Build a wrapper that fits over the visualization area
    <div
      style={{
        position: "absolute",
        width: dims.width,
        height: dims.height,
        top: 0,
        left: 0,
        pointerEvents: "none",
      }}
    >
    
    {/* Tooltip that floats inside the wrapper */}
      <div
        className={"tooltip"}
        style={{
          left: interactionData['xPos'],
          top: interactionData['yPos'], 
        }}
      >
        <h3 className={"tooltipTitle"}>{ interactionData['labelTitle'] }</h3>
        { rows(interactionData.data) }
      </div>
    </div>
  )
}

