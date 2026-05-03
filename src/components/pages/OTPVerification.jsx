import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function OTPVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isAlreadyVerified, setIsAlreadyVerified] = useState(false);
  const [isOtpExpired, setIsOtpExpired] = useState(false);

  const email = location.state?.email || emailInput;
  const isEmailFromState = !!location.state?.email;

  // OTP verification
  function handleVerifyOTP() {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    setSubmitted(true);

    // Verify OTP
    axios
      .post("http://localhost:3000/api/v1/auth/otpverify", {
        email,
        otp,
      })
      .then((res) => {
        const message = res.data?.message || "";

        if (
          message.toLowerCase().includes("already verified") ||
          message.toLowerCase().includes("verified")
        ) {
          toast.error("Account is already verified");
          setIsAlreadyVerified(true);
          setIsOtpExpired(false);
        } else if (message.includes("Error")) {
          toast.error(message.replace("Error: ", ""));
        } else {
          toast.success("Email verified successfully!");
          setIsAlreadyVerified(false);
          setIsOtpExpired(false);
          setTimeout(() => {
            toast.dismiss();
            navigate("/login");
          }, 2000);
        }
        setSubmitted(false);
      })
      .catch((error) => {
        const errMsg =
          error.response?.data?.message ||
          "Failed to verify OTP. Please try again.";
        toast.error(errMsg);

        if (
          errMsg.toLowerCase().includes("already verified") ||
          errMsg.toLowerCase().includes("verified")
        ) {
          setIsAlreadyVerified(true);
          setIsOtpExpired(false);
        }

        setSubmitted(false);
      });
  }

  // Resend OTP
  function handleResendOTP() {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsResending(true);

    axios
      .post("http://localhost:3000/api/v1/auth/resendotp", { email })
      .then((res) => {
        const message = res.data?.message || "";

        if (message.toLowerCase().includes("already verified")) {
          toast.error("Account is already verified");
          setIsAlreadyVerified(true);
          setIsOtpExpired(false);
        } else if (message.toLowerCase().includes("still valid")) {
          toast.error(
            "OTP is still valid. Please wait for it to expire before requesting a new one.",
          );
          setIsOtpExpired(false);
          setIsAlreadyVerified(false);
        } else if (message.includes("Error")) {
          toast.error(message.replace("Error: ", ""));
        } else {
          toast.success("New OTP sent to your email!");
          setOtp("");
          setIsOtpExpired(false);
          setIsAlreadyVerified(false);
        }

        setIsResending(false);
      })
      .catch((error) => {
        const errMsg =
          error.response?.data?.message ||
          "Failed to resend OTP. Please try again.";
        toast.error(errMsg);

        if (errMsg.toLowerCase().includes("already verified")) {
          setIsAlreadyVerified(true);
          setIsOtpExpired(false);
        } else if (errMsg.toLowerCase().includes("still valid")) {
          setIsOtpExpired(false);
          setIsAlreadyVerified(false);
        }

        setIsResending(false);
      });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-5 py-10 font-sans relative">
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

      {/* OTP Form */}
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-10 shadow-sm">
        <h1 className="text-2xl text-center font-medium text-gray-900 dark:text-gray-100 tracking-tight mb-1">
          Verify your email
        </h1>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
          Enter your email and the 6-digit OTP we sent you
        </p>

        {!isEmailFromState && (
          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Email address
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="h-11 px-3.5 text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-900 transition-colors placeholder-gray-400 dark:placeholder-gray-600"
            />
          </div>
        )}

        {isEmailFromState && (
          <>
            <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-2 leading-relaxed">
              We've sent a 6-digit OTP to
            </p>
            <p className="text-sm text-center font-medium text-gray-900 dark:text-gray-100 mb-6">
              {email}
            </p>
          </>
        )}

        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Enter OTP
          </label>
          <input
            type="text"
            placeholder="000000"
            maxLength="6"
            inputMode="numeric"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="h-14 px-3.5 text-2xl text-center font-bold tracking-widest text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-900 transition-colors placeholder-gray-300 dark:placeholder-gray-600"
          />
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            OTP expires within 5 minutes
          </p>
        </div>

        <hr className="border-gray-100 dark:border-gray-800 mb-5" />

        <button
          onClick={handleVerifyOTP}
          disabled={submitted || otp.length !== 6 || !email}
          className="w-full h-11 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 bg-gray-900 dark:bg-gray-100 text-gray-50 dark:text-gray-900 hover:opacity-80 active:scale-99 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {submitted ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Didn't receive the code?
          </p>
          <button
            onClick={handleResendOTP}
            disabled={isResending || !email || isAlreadyVerified}
            className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:underline underline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isResending ? "Sending..." : "Resend OTP"}
          </button>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6">
          <Link
            to="/registation"
            className="text-gray-900 dark:text-gray-100 font-medium hover:underline underline-offset-2"
          >
            Back to Registration
          </Link>
        </p>
      </div>
    </div>
  );
}
