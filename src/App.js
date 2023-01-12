// import './App.css';
import { Routes, Route } from "react-router-dom"
import Home from "./component/Home"
import Facilities from "./component/Facilities"
import Auditors from "./component/Auditors"

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } /> 
      <Route path="facilities" element={ <Facilities /> } /> 
      <Route path="auditors" element={ <Auditors /> } /> 
    </Routes>
  )
}

export default App;
