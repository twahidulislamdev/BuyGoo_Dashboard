import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Registation() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Handle form submission
  function handleCreateAccount() {
    const { firstName, lastName, email, password } = formData;

    // Validation before API call
    if (!firstName || !lastName || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSubmitted(true);

    // Make API call to backend
    axios
      .post("http://localhost:3000/api/v1/auth/signup", formData)
      .then((res) => {
        // Check if response contains an error message
        if (res.data?.message?.includes("Error")) {
          toast.error(res.data.message.replace("Error: ", ""));
          setSubmitted(false);
        } else {
          toast.success("Account created successfully!");
          // Redirect to OTP verification page with email
          setTimeout(() => {
            toast.dismiss();
            navigate("/otpverification", { state: { email: formData.email } });
          }, 1500);
        }
      })
      .catch((error) => {
        // Handle network errors or other exceptions
        if (error.res?.data?.message) {
          toast.error(error.res.data.message);
        } else {
          toast.error("Failed to create account. Please try again.");
        }
        setSubmitted(false);
      });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-5 py-8 font-sans relative">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Brand Logo start */}
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
      {/* Brand Logo end */}

      {/* Sign Up Form start */}
      <div className="w-full max-w-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-10 shadow-sm">
        {/* Heading */}
        <h1 className="text-2xl text-center font-medium text-gray-900 dark:text-gray-100 tracking-tight mb-1">
          Create your account
        </h1>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
          Join thousands of Persons already using BuyGoo.
        </p>

        {/* Name Row */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              First name
            </label>
            <input
              type="text"
              placeholder="Jane"
              autoComplete="given-name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="h-11 px-3.5 text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-900 transition-colors placeholder-gray-400 dark:placeholder-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Last name
            </label>
            <input
              type="text"
              placeholder="Smith"
              autoComplete="family-name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="h-11 px-3.5 text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-900 transition-colors placeholder-gray-400 dark:placeholder-gray-600"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5 mb-3">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Email address
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            autoComplete="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
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
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full h-11 pl-3.5 pr-11 text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-900 transition-colors placeholder-gray-400 dark:placeholder-gray-600"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Toggle password visibility"
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

        <hr className="border-gray-100 dark:border-gray-800 mb-5" />

        {/* Submit */}
        <button
          onClick={handleCreateAccount}
          disabled={submitted}
          className="w-full h-11 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 bg-gray-900 dark:bg-gray-100 text-gray-50 dark:text-gray-900 hover:opacity-80 active:scale-99 cursor-pointer"
        >
          Create account
        </button>

        {/* Terms */}
        <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-4 leading-relaxed">
          By signing up, you agree to our{" "}
          <a
            href="#"
            className="text-gray-500 dark:text-gray-400 underline underline-offset-2 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-gray-500 dark:text-gray-400 underline underline-offset-2 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Privacy Policy
          </a>
          .
        </p>

        {/* Sign in link */}
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-gray-900 dark:text-gray-100 font-medium hover:underline underline-offset-2"
          >
            Sign in
          </Link>
        </p>

        <hr className="border-gray-100 dark:border-gray-800 my-5" />

        {/* OTP verification link */}
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Already have OTP?{" "}
          <Link
            to="/otpverification"
            className="text-gray-900 dark:text-gray-100 font-medium hover:underline underline-offset-2"
          >
            Verify here
          </Link>
        </p>
      </div>
      {/* Sign Up Form end */}
    </div>
  );
}
