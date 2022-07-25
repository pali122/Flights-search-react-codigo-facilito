import "../App.css";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="App">
      <p className="read-the-docs">Not found page 404</p>
      <p className="read-the=docs">
        Redirect to : <Link to="/">Home</Link>{" "}
      </p>
    </div>
  );
}

export default PageNotFound;
