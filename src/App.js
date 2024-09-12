import './App.css'
import * as d3 from "d3"
import Dashboard from "./components/Dashboard"
import Radar from "./components/Radar"
import { useState, useEffect, useRef } from 'react'

function App() {
  
  const [ loading, setLoading ] = useState(true)
  const [ data, setData ] = useState([])
  const [ testData, setTestData ] = useState([])


  useEffect(()=>{
    Promise.all([
      d3.json('http://127.0.0.1:8000/dashboard'),
      d3.json('http://127.0.0.1:8000/adrs?full=True'),
    ]).then(([ res0, res1 ])=>{
      setData(res0['data'])
      setData(res1['data'])
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
    <div className="loading flexCol">
      <Radar />
    </div>)
  }

  return (
    <div className="App">
      <Dashboard data={ data } />
    </div>

  )
}

export default App;
