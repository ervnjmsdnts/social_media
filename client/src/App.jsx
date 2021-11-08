import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useAuth } from "./context/authContext";
import Auth from "./pages/Auth";
import Confirmation from "./pages/Confirmation";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

const App = () => {
  // const navigate = useNavigate();
  // const { isAuthenticated } = useAuth();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("", { replace: true });
  //   } else {
  //     navigate("auth", { replace: true });
  //   }
  // }, [isAuthenticated, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/confirmation/:token" element={<Confirmation />} />
      <Route path="/profile/:id" element={<Profile />} />
    </Routes>
  );
};

export default App;
