import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/redux-slice/index.js";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";
import logo from "../../assets/svg/logo.svg";
import loginimg from "../../assets/img/login.png";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "muhammad@gmail.com" && password === "2005") {
      dispatch(login({ email }));

      if (rememberMe) {
        document.cookie = `user=${email}; path=/`;
      }

      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
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

          <h2 className="text-3xl font-semibold">Login</h2>
          <p className="text-gray-500 mb-6">
            Login to access your travelwise account
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
            </div>
            <div>
              <label className="block font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded mt-1"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="mr-2"
                />
                Remember me
              </label>
              <a href="#" className="text-red-500 text-sm">
                Forgot Password
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded mt-4"
            >
              Login
            </button>

            <p className="text-center mt-4 text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500">
                Sign up
              </Link>
            </p>
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

        <div className="w-1/2 bg-gray-100 flex justify-center items-center relative">
          <img src={loginimg} alt="Secure Login" className="w-80" />
          <div className="absolute bottom-4 flex space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
