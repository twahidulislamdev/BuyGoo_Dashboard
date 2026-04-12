import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // Login form data state
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  // Login btn Functionality
  function handleLoginAccount() {
    const { email, password } = loginFormData;
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    axios
      .post("http://localhost:3000/user/v1/auth/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data?.message?.includes("Error")) {
          toast.error(res.data.message.replace("Error: ", ""));
          setSubmitted(false);
        } else {
          toast.success("Login successful!");
          // You can also store the token in localStorage or context here
          setTimeout(() => {
            toast.dismiss();
            navigate("/");
          }, 1500);
        }
      })
      .catch(() => {
        toast.error("An error occurred while logging in.");
        setSubmitted(false);
      });

    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-5 py-10 font-sans relative">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Brand Logo */}
      <div className="absolute top-5 left-5 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gray-900 dark:bg-gray-100 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="5.5" stroke="#e8e0d0" strokeWidth="1.5" />
            <circle cx="9" cy="9" r="2" fill="#e8e0d0" />
          </svg>
        </div>
        <span className="font-serif text-xl font-medium text-gray-900 dark:text-gray-100 tracking-tight">
          BuyGoo
        </span>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-10 shadow-sm">
        {/* Heading */}
        <h1 className="text-2xl text-center font-medium text-gray-900 dark:text-gray-100 tracking-tight mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-10">
          Sign in to your BuyGoo account.
        </p>

        {/* Email */}
        <div className="flex flex-col gap-1.5 mb-3">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Email address
          </label>
          <input
            type="email"
            placeholder="jane@company.com"
            autoComplete="email"
            value={loginFormData.email}
            onChange={(e) =>
              setLoginFormData({ ...loginFormData, email: e.target.value })
            }
            className="h-11 px-3.5 text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-900 transition-colors placeholder-gray-400 dark:placeholder-gray-600"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5 mb-6">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              value={loginFormData.password}
              onChange={(e) =>
                setLoginFormData({ ...loginFormData, password: e.target.value })
              }
              className="w-full h-11 pl-3.5 pr-11 text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-900 transition-colors placeholder-gray-400 dark:placeholder-gray-600"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M1 8C1 8 3.5 3.5 8 3.5C12.5 3.5 15 8 15 8C15 8 12.5 12.5 8 12.5C3.5 12.5 1 8 1 8Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <circle
                    cx="8"
                    cy="8"
                    r="2"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 2L14 14M6.5 6.7C6.2 7 6 7.5 6 8C6 9.1 6.9 10 8 10C8.5 10 8.9 9.8 9.2 9.5M4.2 4.3C2.8 5.3 1.5 6.9 1 8C1 8 3.5 12.5 8 12.5C9.5 12.5 10.8 12 11.9 11.3M7 3.6C7.3 3.5 7.7 3.5 8 3.5C12.5 3.5 15 8 15 8C14.7 8.6 14.3 9.2 13.8 9.8"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Forgot password */}
        <div className="text-right mb-5">
          <a
            href="#"
            className="text-xs text-gray-500 dark:text-gray-400 hover:underline"
          >
            Forgot password?
          </a>
        </div>

        {/* Submit */}
        <button
          onClick={handleLoginAccount}
          disabled={submitted}
          className={`w-full h-11 rounded-xl text-sm font-medium transition-all bg-gray-900 dark:bg-gray-100 text-gray-50 dark:text-neutral-900 hover:opacity-90 cursor-pointer ${
            submitted ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Login
        </button>

        {/* Signup link */}
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-5">
          Don’t have an account?{" "}
          <Link
            to="/registation"
            className="text-gray-900 dark:text-gray-100 font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
