import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import App from "../App";
import Room from "../pages/Room";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import VideoCall from "../pages/VideoCall";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />} path="/">
          <Route element={<Home />} path="home" />
          <Route element={<Room />} path="room" />
          <Route element={<VideoCall />} path="video-call" />
        </Route>
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
      </Routes>
    </BrowserRouter>
  );
}
