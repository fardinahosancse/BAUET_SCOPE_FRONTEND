import { useState } from "react";
import "./Signup.css";
import APP_LOGO from "./logo.png";
import APP_INTRO from "./intro.png";
import { useSignup } from "../../hooks/useSignup";
import { Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setID] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbanail] = useState("null");
  const [thumbnailError, setThumbanailError] = useState("null");
  const [keyGen, setKeyGen] = useState("Please Copy this Key");
  const {signup,error,isPending} = useSignup();

const handleRadmomizer = () =>{
  
 setKeyGen (Math.random().toString(36).substr(2, 5));
}

  

  const handleFileChange = (e) => {
    setThumbanail(null);
    let fardin_user = e.target.files[0];
    console.log(fardin_user);

    if (!fardin_user) {
      setThumbanailError("Please Select a File");
      return;
    }
    if (!fardin_user.type.includes("image")) {
      setThumbanailError("Please Select a Image File");
      return;
    }

    if (fardin_user.size > 10000000) {
      setThumbanailError("Maximum Image Size 10Mb");
      return;
    }
    setThumbanailError(null);
    setThumbanail(fardin_user);
    console.log("Profile Picture Uploaded");
    handleRadmomizer();
  };

  const handleSubmit_signup = (e) => {
    e.preventDefault();
    signup(email, password,displayName, thumbnail,keyGen,id);
    setKeyGen("Please Copy this Key")
    setEmail(null)
    setID(null)
    setPassword(null)
    setDisplayName(null)
    setThumbanail(null)
    console.log(keyGen)
  };

  return (
    <div className="container">
      <form className="auth-form" onSubmit={handleSubmit_signup}>
        <img src={APP_LOGO} className="BAUET_SCOPE_LOGO"></img>

        <h2 className="header"> Sign up to get connected</h2>
     

        <p className="Keygen_Show">{keyGen}</p>

        <h4 className="header_2"> Before Signing Up,Don't forget to copy the key, you will need it to sign in, Key will Generate after you fill-up the form</h4>

        <label>
          <input
            required
            type="text"
            onChange={(bauet_name) => setDisplayName(bauet_name.target.value)}
            value={displayName}
            id="name"
            placeholder="Name"
          />
        </label>

        <label>
          <input
            required
            type="email"
            onChange={(bauet_email) => setEmail(bauet_email.target.value)}
            value={email}
            id="email"
            placeholder="Email"
          />
        </label>

        <label>
          <input
            required
            type="number"
            onChange={(bauet_id) => setID(bauet_id.target.value)}
            value={id}
            id="id"
            placeholder="Student ID"
          />
        </label>

        <label>
          <input
            required
            type="password"
            onChange={(bauet_password) =>
              setPassword(bauet_password.target.value)
            }
            value={password}
            id="password"
            placeholder="Password"
          />
        </label>

        <label class="custom-file-upload">
          <input required type="file" onChange={handleFileChange} />
          Profile Picture !
          {thumbnailError && (
            <div className="error">Please Select a Valid Image</div>
          )}
        </label>

        <label>
          {!isPending && <input required type="submit" value="SignUp"  placeholder="SignUp" />}
          {isPending && <input required type="submit" disabled="disabled" value="Loading.."   placeholder="SignUp" />}
          {error && <div className="error">{error}</div>}
        </label>

        <Link to="/Login">
          <button type="button" className="sign_up_button">
            Signin
            <p> Already Have an account?</p>
          </button>
        </Link>

      
        
      </form>

      <div className="auth-form_2">

        
      </div>
    </div>
  );
}
