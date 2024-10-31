import './App.css'
import * as d3 from "d3"
import { useState, useEffect, useRef } from 'react'
import * as React from "react";
import * as ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from "./routes/root";
import Adrs from './routes/Adrs'
import Dashboard from "./components/Dashboard"
import Adr from './components/Adr'
import Radar from "./components/Radar"

function App() {
  
  
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


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
    },
    {
      path: "adrs/",
      element: <Adrs loading={loading} data={data}/>,
    },
  ])
  
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

export default App;
