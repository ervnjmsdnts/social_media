import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth";
import Confirmation from "./pages/Confirmation";
import Profile from "./pages/Profile";
import NewsFeed from "./pages/NewsFeed";
import Messages from "./pages/Messages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewsFeed />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/confirmation/:token" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
