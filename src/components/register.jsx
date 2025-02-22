import React, { useContext, useState } from 'react';
import { authcontext } from '../provider/authprovider';
import { Link, useNavigate } from 'react-router-dom';
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const { createuser, setuser, updateUserProfile, googleLogin } = useContext(authcontext);
  
  const [passwordError, setPasswordError] = useState("");

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

  const validatePassword = (password) => {
    const upperCasePattern = /[A-Z]/;
    const lowerCasePattern = /[a-z]/;
    const lengthPattern = /.{6,}/;

    if (!upperCasePattern.test(password)) {
      return "Password must contain at least one uppercase letter.";
    } else if (!lowerCasePattern.test(password)) {
      return "Password must contain at least one lowercase letter.";
    } else if (!lengthPattern.test(password)) {
      return "Password must be at least 6 characters long.";
    }
    return "";
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const fname = form.get("fname");
    const lname = form.get("lname");
    const purl = form.get("purl");
    const email = form.get("email");
    const password = form.get("password");

    const passwordErrorMessage = validatePassword(password);
    if (passwordErrorMessage) {
      setPasswordError(passwordErrorMessage);
      return;
    } else {
      setPasswordError("");
    }

    createuser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setuser(user); 
        toast.success("Successfully registered"); 
        
        return updateUserProfile(user, {
          displayName: `${fname} ${lname}`,
          photoURL: purl,
        });
      })
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        toast.error("Registration failed");
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Create Your Account</h1>
          <p className="py-6">
            Join us today to start your journey. Sign up to access exclusive features and connect with like-minded people. Whether you're here to learn, grow, or explore, we have something for you!
          </p>
        </div>
        <div className="card bg-base-100 w-full sm:w-[fit-content] shadow-2xl">
          <form onSubmit={handlesubmit} className="card-body w-full sm:w-[fit-content]">
            <div className='flex flex-col sm:flex-row gap-4'>
              <div className="form-control w-full sm:w-auto">
                <label className="label">
                  <span className="label-text">First name</span>
                </label>
                <input type="text" placeholder="first name" name="fname" className="input input-bordered w-full" required />
              </div>
              <div className="form-control w-full sm:w-auto">
                <label className="label">
                  <span className="label-text">Last name</span>
                </label>
                <input type="text" placeholder="last name" name="lname" className="input input-bordered w-full" required />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo url</span>
              </label>
              <input type="text" placeholder="photo url" name="purl" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" name="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" name="password" className="input input-bordered" required />
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary mb-6 w-full sm:w-auto">Sign up</button>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-between items-center">
                <button
                  onClick={handleGoogleLogin}
                  className="btn btn-outline w-full sm:w-[45%] mb-2 flex justify-center items-center"
                >
                  <img
                    src="https://th.bing.com/th/id/OIP.lsGmVmOX789951j9Km8RagHaHa?rs=1&pid=ImgDetMain"
                    alt="google-logo"
                    className="w-6 h-6 mr-2"
                  />
                  Google
                </button>
                <Link to="/login" className="btn btn-outline w-full sm:w-[45%] mb-2 flex justify-center items-center">
                  Log in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
