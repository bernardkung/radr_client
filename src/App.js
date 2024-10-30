import './App.css'
import * as d3 from "d3"
import { useState, useEffect, useRef } from 'react'
import * as React from "react";
import * as ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from "./routes/root";
import Dashboard from "./components/Dashboard"
import Adr from './components/Adr'
import AdrTable from './components/AdrTable'
import Radar from "./components/Radar"

function App() {
  
  const [ loading, setLoading ] = useState(true)
  const [ data, setData ] = useState([])
  const [ testData, setTestData ] = useState([])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
    }
  ])
  
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
