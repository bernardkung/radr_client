import './App.css'
import * as d3 from "d3"
import Dashboard from "./components/Dashboard"
import { useState, useEffect, useRef } from 'react'

function App() {
  
  
  const [ adrs, setAdrs ] = useState([])


  useEffect(()=>{
    Promise.all([
      d3.json('http://127.0.0.1:8000/adrs')
    ]).then(([ resAdrs ])=>{
      setAdrs(resAdrs)
    })
  }, [])

  useEffect(()=>{
    console.log(adrs)
  }, [adrs])


  return (
    <div className="App">
      <Dashboard />
    </div>
  )
}

export default App;
