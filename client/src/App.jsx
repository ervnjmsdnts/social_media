import { Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth";
import Confirmation from "./pages/Confirmation";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

const App = () => {
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
