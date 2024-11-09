import './App.css'
import * as d3 from "d3"
import { useState, useEffect, useRef } from 'react'
import * as React from "react";
import * as ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Root from "./routes/root";
// import Adrs from './routes/adrs'
// import Dashboard from './routes/dashboard'
import Dashboard from "./components/Dashboard"
import Adr from './components/Adr'
import AdrTable from './components/AdrTable'
import Radar from "./components/Radar"

import Manatee from './components/Manatee';
import Narwhal from './components/Narwhal';
import Whale from './components/Whale';

import onlineTest from './assets/online-test.svg';
import assessment from './assets/assessment.svg';


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


  return (
    <div className="App">
      <div className={"menuWrapper flexColCentered"} >
        <BrowserRouter>
          <nav className={"menu flexColCentered"} >
            <h1>radr</h1>
            <ul className={"menuList"}>
              <li>
                <Link to="/dashboard">
                  <img className={"menuIcon"} src={assessment} />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/narwhal">
                  <img className={"menuIcon"}  src={onlineTest} />
                  ADRs
                </Link>
              </li>
            </ul>
          </nav>

            
          <div className={"container"} >

              <Routes>
                <Route 
                  path="/dashboard" 
                  element={<Dashboard loading={loading} data={data} />} 
                />
                <Route 
                  path="/narwhal" 
                  element={<Narwhal />} 
                />
              </Routes>

          </div>

        </BrowserRouter>
      </div>

    </div>
  );
  

  // if (loading) {
  //   return (
  //     <div className="loading flexCol">
  //       <Radar />
  //     </div>
  //   )
  // }
  
  // return (
  //   <div>
  //     {/* <AdrTable /> */}
  //     <Dashboard data={data} />
  //   </div>
  // )


}

