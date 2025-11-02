import Lottie from "lottie-react";
import TreeAnimation from "../../assets/animations/Login-Animation.json";
import "./Login.scss";

export function Login() {
  return (
    <div className="login-wrapper">
      <div className="animation">
        <Lottie animationData={TreeAnimation} loop autoplay />
      </div>
      <div className="login">
        <img src="/Nimble_logo.png" alt="" />
        <form>
          <h1>Log In</h1>
          <div className="input">
            <label>Email</label>
            <input type="text" />
          </div>
          <div className="input">
            <label>Password</label>
            <input type="password" />
            <a href="" className="forgot">Forgot Password?</a>
          </div>
          <div className="checkbox">
            <input type="checkbox" />
            <label>Remember me</label>
          </div>
          <div className="input">
            <button type="submit" className="submit">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
}
