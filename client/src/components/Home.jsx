import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

function Home() {
  const [user, setUser] = useState({});
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios.get("http://localhost:3000/").then((res) => {
        if (res.data.log) {
          setUser(res.data.result[0]);
        } else {
          navigate("/login");
        }
      });
    } catch (error) {
      console.log(error);
    }

    socket.on("messages", (ms) => setMessages(ms));
  }, []);

  // useEffect(() => {
  //   socket.on("messages", (ms) => setMessages(ms));
  // }, [socket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await socket.emit("message", content, user["user_id"]);
    setContent("");
  };

  const messagesConfig = (message) => {
    if (message["user_id"] == user["user_id"]) {
      return (
        <li key={message["message_id"]} className="me">
          <h4>{message["user_name"]}</h4>
          <p>{message["message_content"]}</p>
        </li>
      );
    } else {
      return (
        <li key={message["message_id"]} className="them">
          <h4>{message["user_name"]}</h4>
          <p>{message["message_content"]}</p>
        </li>
      );
    }
  };

  return (
    <div className="home">
      <div className="compos" onLoad={() => window.scroll(0, -1)}>
        <nav>
          <h3>{user["user_name"]}</h3>
        </nav>
        <ul className="chat">
          {messages.map((message) => messagesConfig(message))}
        </ul>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Send a message..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Home;
