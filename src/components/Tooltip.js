
export const Tooltip = ({ interactionData, name }) => {
  if (!interactionData) {
    return null;
  }

  // console.log(interactionData)

  return (
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
  )
}

export default Tooltip
