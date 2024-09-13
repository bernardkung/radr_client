
export const Tooltip = ({ interactionData, dims }) => {
  if (!interactionData) {
    return null;
  }

  // Build a wrapper that fits over the visualization,
  // and a tooltip that floats inside the wrapper

  return (

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
    
    <div
      className={"tooltip"}
      style={{
        left: interactionData['xPos'],
        top: interactionData['yPos'], 
      }}
    >
      { interactionData['labelName'] }
      <br />
      { interactionData.labelValue }
      <br />
      { interactionData.labelMisc }
    </div>

    </div>
  )
}

export default Tooltip
