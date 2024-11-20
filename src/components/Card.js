
const Card = ({ value, label }) => {
  
  return (
    <div className={"card a1 viz flexColCentered"}>
      <p className={"cardValue"}>{ String(value) }</p>
      <p className={"cardLabel"}>{ label }</p>
    </div>
  )
}

export default Card