import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/redux-slice/index.js";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";
import imgsignup from "../../assets/img/signupimg.png";
import logo from "../../assets/svg/logo.svg";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: true,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        "https://676bea73bc36a202bb862622.mockapi.io/todo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (response.ok) {
        const newUser = await response.json();
        dispatch(login({ email: newUser.email })); // Redux-ga foydalanuvchini saqlash
        navigate("/dashboard"); // Dashboard sahifasiga yo‘naltirish
      } else {
        alert("Failed to sign up");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while signing up.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md w-full max-w-4xl flex">
        <div className="w-1/2 bg-gray-100 flex justify-center items-center p-8">
          <img src={imgsignup} alt="Sign Up" className="w-80" />
        </div>

        <div className="w-1/2 p-8">
          <div className="flex items-center mb-6">
            <img src={logo} alt="Logo" className="h-6 mr-2" />
            <h2 className="text-xl font-bold">Your Logo</h2>
          </div>

          <h2 className="text-3xl font-semibold">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-3 border rounded mt-1"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-3 border rounded mt-1"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded mt-1"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded mt-1"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border rounded mt-1"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded mt-4"
            >
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
