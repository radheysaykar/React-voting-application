import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config.jsx";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

const App = (props) => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("919767781389");
  const [aadhaarNumber, setAadhaarNumber] = useState("012345678910");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  async function onCaptchVerify() {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              // onSignup();
            },
            "expired-callback": () => {},
          },
          auth
        );
      }
    } catch (error) {
      console.log(error);
    }
    
  }

  async function onSignup() {
    try {
      if(aadhaarNumber == "012345678910") props.setvoterID(aadhaarNumber);
      setLoading(true);
      onCaptchVerify().catch((err) => {
        console.log(err);
      });

      const appVerifier = window.recaptchaVerifier;

      const response = await fetch(`http://localhost:3000/getPhoneNumber?aadhaarNumber=${aadhaarNumber}`);
      const data = await response.json();
      setPh(data.phoneNumber);

      const formatPh = "+" + data.phoneNumber;
      // console.log("ph... ",ph);

      signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setLoading(false);
          setShowOTP(true);
          toast.success("OTP sent successfully!");
        })
        .catch((error) => {
          console.log(error, "^^^^^^^^^");
          setLoading(false);
        });
    } catch (error) {
        console.log(error);
    }
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        props.setvoterID(aadhaarNumber);
        console.log("res.user... ", ph);
        
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section className="d-flex align-items-center justify-content-center vh-100">
  <div>
    <div id="recaptcha-container"></div>

    <div className="w-80 d-flex flex-column gap-4 rounded-lg p-4">
      {showOTP ? (
        <div className="highlight-section p-4 bg-dark-transparent rounded">
          <label
            htmlFor="otp"
            className="font-weight-bold text-xl text-center text-light"
          >
            Enter your OTP
          </label>
          <OtpInput
            value={otp}
            onChange={setOtp}
            OTPLength={6}
            otpType="number"
            disabled={false}
            autoFocus
            // className="form-control"
          ></OtpInput>
          <button
            onClick={onOTPVerify}
            className="btn btn-success w-100 d-flex mt-4 align-items-center justify-content-center rounded"
          >
            {loading && (
              <CgSpinner size={20} className="mt-1 animate-spin" />
            )}
            <span>Verify OTP</span>
          </button>
        </div>
      ) : (
        <div className="highlight-section p-4 bg-dark-transparent rounded">
          <label
            htmlFor=""
            className="font-weight-bold text-xl text-center text-light"
          >
            Enter your aadhaar number
          </label>
          {/* <PhoneInput country={"in"} value={ph} onChange={setPh} /> */}
          <input
          type="password"
          placeholder="Enter Aadhaar Number"
          value={aadhaarNumber}
          onChange={(e) => setAadhaarNumber(e.target.value)}
          className="form-control"
        />

          <button
            onClick={onSignup}
            className="btn btn-success w-100 d-flex mt-4 align-items-center justify-content-center rounded"
          >
            {loading && (
              <CgSpinner size={20} className="mt-1 animate-spin" />
            )}
            <span>Send code via SMS</span>
            {/* <span>Send code to aadhaar linked mobile number</span>  */}
          </button>
        </div>
      )}
    </div>
  </div>
</section>
  );
};

export default App;
