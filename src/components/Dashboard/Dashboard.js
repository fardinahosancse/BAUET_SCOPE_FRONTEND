import "./Dashboard.css";
import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/SignUp">
            <button type="button">Click Me!</button>
          </Link>
        </li>


        <li>
          <Link to="/Login">
            <button type="button">Click Me!</button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
