import Lottie from "lottie-react";
import TreeAnimation from "../../assets/animations/Login-Animation.json";
import "./Login.scss";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import api from "../../services/api";
import { tokenService } from "../../services/tokenService";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

type LoginFormValues = {
  email: string;
  password: string;
};

export function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await api.post("/auth/login", data);
      console.log(response);
      const { accessToken, refreshToken, user } = response.data;
      tokenService.setTokens(accessToken, refreshToken);
      toast.success(`Welcome test`);
      navigate('/dashboard')
      return user;
    } catch (error) {
      console.log(error);
      toast.error("There was a error logging, try again");
    }
  };
  console.log("demek", import.meta.env.VITE_API_URL)
  return (
    <div className="login-wrapper">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="animation">
        <Lottie animationData={TreeAnimation} loop autoplay />
      </div>
      <div className="login">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          closeOnClick
          draggable
          style={{ zIndex: 9999 }}
        />
        <img src="/Nimble_logo.png" alt="" />
        <form
          onSubmit={handleSubmit(async (data) => {
            const user = await onSubmit(data);
            if (user) reset();
          })}
        >
          <h1>Log In</h1>
          <div className="input">
            <label>Email</label>
            <input type="email" {...register("email", { required: true })} />
            {errors.email && (
              <div className="error-message">Enter your email</div>
            )}
          </div>
          <div className="input">
            <label>Password</label>
            <input
              type="password"
              {...register("password", { required: true, maxLength: 50 })}
            />
            {errors.password && (
              <div className="error-message">Enter your password</div>
            )}
            <a href="" className="forgot">
              Forgot Password?
            </a>
          </div>
          <div className="checkbox">
            <input type="checkbox" />
            <label>Remember me</label>
          </div>
          <div className="input">
            <button type="submit" className="submit">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
