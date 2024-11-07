import './App.css'
import * as d3 from "d3"
import { useState, useEffect, useRef } from 'react'
import * as React from "react";
import * as ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Root from "./routes/root";
// import Adrs from './routes/adrs'
// import Dashboard from './routes/dashboard'
import Dashboard from "./components/Dashboard"
import Adr from './components/Adr'
import AdrTable from './components/AdrTable'
import Radar from "./components/Radar"

export async function loadData() { 
  Promise.all([
    d3.json('http://127.0.0.1:8000/adrs?full=True'),
  ]).then(([ res ])=>{
    return res['data']
  })
}

export default function App() {
  
  
  const [ loading, setLoading ] = useState(true)
  const [ data, setData ] = useState([])



  useEffect(()=>{
    Promise.all([
      d3.json('http://127.0.0.1:8000/adrs?full=True'),
    ]).then(([ res0 ])=>{
      setData(res0['data'])
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="loading flexCol">
        <Radar />
      </div>
    )
  }
  
  return (
    <div>
      {/* <AdrTable /> */}
      <Dashboard data={data} />
    </div>
  )


}

