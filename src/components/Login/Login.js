import { useState } from "react";
import "./Login.css";
import APP_LOGO from "./logo.png";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

export default function Signup() {
  const [log_email, setLog_Email] = useState("");
  const [log_password, setLog_Password] = useState("");
  const [log_key, setLog_key] = useState("");
  const {login,error,isPending} = useLogin();
  
 const handleLogin = (e) =>{
   e.preventDefault();
   login(log_email,log_password)
 }

  return (
  <div className="box_signin">
 <form className="auth-form_log" onSubmit={handleLogin}>
    <img src={APP_LOGO} className="BAUET_SCOPE_LOGO_2"></img>
      <h2 className="header"> Login from here</h2>

     

      <label>
          
          <input required type="email" onChange={(bauet_log_email) => setLog_Email(bauet_log_email.target.value) } value={log_email} id="email" placeholder="Email"/>
      </label>


     


      <label>
         
          <input required type="password" onChange={(bauet_log_password) => setLog_Password(bauet_log_password.target.value) } value={log_password} id="password" placeholder="Password"/>
      </label>


      


      <label>
         
          <input  type="text" onChange={(bauet_log_key) => setLog_key(bauet_log_key.target.value) } value={log_key} id="password" placeholder="KeyGen"/>
      </label>
      <h4 className="header_2"> "Enter the KeyGen that you copied while Signing Up"</h4>


      <label>

         {!isPending && <input required type="submit" value="Login"  placeholder="Login" />}
          {isPending && <input required type="submit" disabled="disabled" value="Logging in.."   placeholder="Signin" />}
          {error && <div className="error">{error}</div>}
          
      </label>
      

      <Link to="/Signup">
          <button type="button" className="sign_in_button">
            Signin
            <p> Dont have an account?   
            
            
            </p>
          </button>
        </Link>
      </form>

      
     
    </div>
  );
}
