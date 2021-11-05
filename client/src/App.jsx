import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Confirmation from "./pages/Confirmation";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="auth" element={<Auth />} />
        <Route path="confirmation/:token" element={<Confirmation />} />
        <Route path="profile/" element={<Home />} />
        <Route path="profile/:id" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
