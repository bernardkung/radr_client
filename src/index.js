import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Root from "./routes/root";
import Adrs from './routes/adrs';
import Dashboard from './routes/dashboard';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "adrs/",
    element: <Adrs />,
  },
]);


// Create root outside of the component
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
