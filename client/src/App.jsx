import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth/auth";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;
