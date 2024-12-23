import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:3000/login", { content }).then((res) => {
        if (res.data.ok) {
          navigate("/");
        } else {
          console.log("try again");
        }
        // res.data.ok ? navigate("/") : console.log("Try again");
      });
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login" onSubmit={handleSubmit}>
      <form>
        <h1>Log in</h1>

        <input
          type="text"
          placeholder="Escribe tu nombre..."
          maxLength={30}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default Login;
