import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authcontext } from "../provider/authprovider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { login, setuser, googleLogin } = useContext(authcontext);
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;

    login(email, password)
      .then((result) => {
        const user = result.user;
        setuser(user);
        toast.success("Successfully logged in!");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        toast.error("Wrong credentials!"); 
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        setuser(user);
        toast.success("Google login successful!");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        toast.error("Google login failed!");
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Welcome Back!</h1>
<p className="py-6">
  Sign in to continue your journey. Access your account and explore all the features that help you stay connected, productive, and informed. If you're new, feel free to create an account and get started.
</p>


        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handlesubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <Link
                  to="/forget"
                  state={{ email: email }}
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6 flex justify-center items-center">
              <button className="btn btn-primary w-[100%] mb-4">Login</button>
              <div className="flex gap-4  w-[100%] justify-between items-center"><button
              onClick={handleGoogleLogin}
              className="btn btn-outline w-[45%] mb-2 flex justify-center items-center"
            >
              <img
                src="https://th.bing.com/th/id/OIP.lsGmVmOX789951j9Km8RagHaHa?rs=1&pid=ImgDetMain"
                alt="google-logo"
                className="w-6 h-6 mr-2"
              />
              Google
            </button>
              <Link to="/register" className="btn btn-outline w-[45%] mb-2 flex justify-center items-center">
                Sign up
              </Link></div>

            </div>
          </form>

          
        </div>
      </div>
    </div>
  );
};

export default Login;
