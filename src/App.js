import './App.css'
import * as d3 from "d3"
import { useState, useEffect, useRef } from 'react'
import * as React from "react";
import * as ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import Home from './components/Home';
import Dashboard from "./components/Dashboard"
import Adr from './components/Adr'
import AdrTable from './components/AdrTable'
import Radar from "./components/Radar"

import radrIcon from './assets/satellite-dish.svg';
import onlineTestIcon from './assets/online-test.svg';
import assessmentIcon from './assets/assessment.svg';
import homeIcon from './assets/home.svg';


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

  useEffect(()=>{
    console.log(data)
  }, [data])


  return (
    <div className="App">
        <BrowserRouter>
        <div className={"menuContainer"} >
          <div className={"menu"} >
            <img className={"titleIcon"} src={radrIcon} />
            <h1 className={"title"}>radr</h1>
            <ul className={"menuList"}>
              <li>
                <Link to="/">
                  <img className={"menuIcon"}  src={homeIcon} />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  <img className={"menuIcon"} src={assessmentIcon} />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/adrs">
                  <img className={"menuIcon"}  src={onlineTestIcon} />
                  ADRs
                </Link>
              </li>
            </ul>
          </div>
        </div>

          
        <div className={"contentContainer flexCol"} >
            <Routes>

            <Route 
                path="/" 
                element={<Home />} 
              />

              <Route 
                path="/dashboard" 
                element={<Dashboard loading={loading} data={data} />} 
              />

              <Route 
                path="/adrs" 
                element={<AdrTable loading={loading} data={data} />} 
              />

            </Routes>
        </div>

      </BrowserRouter>

    </div>
  );
  
}

