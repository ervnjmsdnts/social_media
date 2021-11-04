import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

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
