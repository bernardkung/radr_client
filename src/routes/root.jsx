import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>

        <nav>
          <ul>
            <li>
            < Link to={`adrs`}>ADRs</Link>
            </li>
            <li>
              <a href={`/dashboard`}>Dashboard</a>
            </li>
          </ul>
        </nav>

      </div>
    </>
  );
}
