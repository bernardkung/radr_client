
import AdrTable from '../components/AdrTable'
import Radar from '../components/Radar'

export default function Adrs(loading, data) {
  if (loading) {
    return (
      <div className="loading flexCol">
        <Radar />
      </div>
    )
  }
  
  return (
    <div>
      <AdrTable />
    </div>
  )


}
