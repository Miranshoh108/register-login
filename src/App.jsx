import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/login.jsx";
import Dashboard from "./components/dashboard/dashboard.jsx";
import { useSelector } from "react-redux";
import SignUp from "./components/singup/singup.jsx";
import ForgotPassword from "./components/forget/forget.jsx";
import VerifyCode from "./components/verify/verify.jsx";
import SetPassword from "./components/setPasword/setPasword.jsx";

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/set-password" element={<SetPassword/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
