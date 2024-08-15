import './App.css'
import * as d3 from "d3"
import Dashboard from "./components/Dashboard"
import { useState, useEffect, useRef } from 'react'

function App() {
  
  const [ loading, setLoading ] = useState(true)
  const [ data, setData ] = useState([])



  useEffect(()=>{
    Promise.all([
      d3.json('http://127.0.0.1:8000/dashboard')
    ]).then(([ res ])=>{
      setData(res['data'])
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <>loading</>
  }

  return (
    <div className="App">
      <Dashboard data={ data } />
    </div>
  )
}

export default App;
