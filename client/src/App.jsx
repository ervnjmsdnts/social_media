import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth";
import Home from "./pages/home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/auth" element={<Auth />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
