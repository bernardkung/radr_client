import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer"

function Home() {
  return (
    <div>
    <Header />
      <div>
        <h1>This is the home page</h1>
        <Link to="facilities">Click to view our facilities page</Link>
        <Link to="auditors">Click to view our auditors page</Link>
      </div>
    <Footer />
    </div>
  );
}

export default Home;