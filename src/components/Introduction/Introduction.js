import "./Introduction.css";
import { Link } from "react-router-dom";
import ConnectingButtons from "./ConnectingButtons";
const Introduction = () => {
  return (
    <div className="introduction_page_container">
      <div className="introduction_page_panel">
        <ConnectingButtons />
      </div>
    </div>
  );
}
export default Introduction;
