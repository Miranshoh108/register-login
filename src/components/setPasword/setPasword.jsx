import { useState } from "react";
import { useNavigate } from "react-router-dom";
import lockImg from "../../assets/img/forget.png";
import logo from "../../assets/svg/logo.svg";

const SetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        "https://676bea73bc36a202bb862622.mockapi.io/todo"
      );
      const users = await response.json();

      const storedEmail = localStorage.getItem("resetEmail");
      const user = users.find((u) => u.email === storedEmail);

      if (user) {
        await fetch(
          `https://676bea73bc36a202bb862622.mockapi.io/todo/${user.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: newPassword }),
          }
        );

        localStorage.removeItem("resetEmail"); // 🔹 Emailni o‘chirish
        navigate("/dashboard"); // ✅ Alert chiqmasdan navigatsiya qilish
      } else {
        alert("User not found!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while setting the password.");
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

          <h2 className="text-3xl font-semibold">Set a password</h2>
          <p className="text-gray-500 mb-6">
            Your previous password has been reset. Please set a new password for
            your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Create Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border rounded mt-1"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border rounded mt-1"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded mt-4"
            >
              Set password
            </button>
          </form>
        </div>

        <div className="w-1/2 bg-gray-100 flex justify-center items-center">
          <img src={lockImg} alt="Set Password" className="w-80" />
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
