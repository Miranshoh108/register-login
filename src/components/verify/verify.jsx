import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/svg/logo.svg";
import verifyImg from "../../assets/img/login.png";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const storedEmail = localStorage.getItem("resetEmail"); // 🔹 LocalStorage'dan emailni olish

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/set-password");
    if (code === "123456") {
      navigate("/set-password");
    } else {
      setError("Invalid verification code");
    }
  };

  const handleResend = () => {
    alert(`Verification code has been resent to ${storedEmail}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md w-full max-w-4xl flex">
        <div className="w-1/2 p-8">
          <div className="flex items-center mb-6">
            <img src={logo} alt="Logo" className="h-6 mr-2" />
            <h2 className="text-xl font-bold">Your Logo</h2>
          </div>

          <h2 className="text-3xl font-semibold">Verify code</h2>
          <p className="text-gray-500 mb-6">
            An authentication code has been sent to <b>{storedEmail}</b>.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Enter Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-3 border rounded mt-1"
                required
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Didn’t receive a code?</p>
              <button
                type="button"
                onClick={handleResend}
                className="text-red-500 text-sm"
              >
                Resend
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded mt-4"
            >
              Verify
            </button>
          </form>
        </div>

        <div className="w-1/2 bg-gray-100 flex justify-center items-center relative">
          <img src={verifyImg} alt="Verification" className="w-80" />
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
