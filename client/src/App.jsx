import React, { useEffect } from "react";
import io from "socket.io-client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import axios from "axios";

function App() {
  axios.defaults.withCredentials = true;
  // const socket = io("http://localhost:3000");

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
