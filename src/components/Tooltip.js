
export const Tooltip = ({ interactionData, name }) => {
  if (!interactionData) {
    return null;
  }

  return (
    <div
      className={"tooltip"}
      style={{
        left: interactionData['xPos'],
        top: interactionData['xPos'], 
        // position: "absolute",
      }}
    >
      { interactionData['labelName'] }
      <br />
      { interactionData.labelValue }
    </div>
  )
}

export default Tooltip
