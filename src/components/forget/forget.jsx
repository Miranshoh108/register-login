import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";
import logo from "../../assets/svg/logo.svg";
import lockImg from "../../assets/img/forget.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Navigatsiya uchun hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      const response = await fetch(
        "https://676bea73bc36a202bb862622.mockapi.io/todo"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const users = await response.json();
      const formattedEmail = email.trim().toLowerCase();

      const user = users.find(
        (u) => u.email?.trim().toLowerCase() === formattedEmail
      );

      if (user) {
        localStorage.setItem("resetEmail", email); // 🔹 Emailni saqlash
        navigate("/verify-code"); // ✅ Alert chiqmasdan yo'naltirish
      } else {
        setError("Email not found!");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md w-full max-w-4xl flex">
        <div className="w-1/2 p-8">
          <div className="flex items-center mb-6">
            <img src={logo} alt="Logo" className="h-6 mr-2" />
            <h2 className="text-xl font-bold">Your Logo</h2>
          </div>

          <Link to="/login" className="text-gray-500 text-sm mb-4 inline-block">
            ← Back to login
          </Link>

          <h2 className="text-3xl font-semibold">Forgot your password?</h2>
          <p className="text-gray-500 mb-6">
            Don’t worry, happens to all of us. Enter your email below to recover
            your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded mt-1"
                required
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded mt-4"
            >
              Submit
            </button>
          </form>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-sm text-gray-500">Or login with</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="flex justify-center space-x-4">
            <button className="p-3 border rounded-lg">
              <FaFacebook size={20} className="text-blue-600" />
            </button>
            <button className="p-3 border rounded-lg">
              <FaGoogle size={20} className="text-red-600" />
            </button>
            <button className="p-3 border rounded-lg">
              <FaApple size={20} className="text-black" />
            </button>
          </div>
        </div>

        <div className="w-1/2 bg-gray-100 flex justify-center items-center">
          <img src={lockImg} alt="Forgot Password" className="w-80" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
