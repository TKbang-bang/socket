const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const db = require("./database/db.js");
const session = require("express-session");
const store = require("./myStore.js");

const mySecret = crypto.randomUUID();

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", async (socket) => {
  //   console.log("Connectado");

  socket.on("message", async (message, id) => {
    const [result] = await (
      await db
    ).query("INSERT INTO messages(user_id, message_content) VALUES (?,?)", [
      id,
      message,
    ]);

    if (result.affectedRows > 0) {
      const [messages] = await (
        await db
      ).query(
        "SELECT * FROM messages ms JOIN users us ON ms.user_id = us.user_id ORDER BY ms.message_id"
      );
      socket.broadcast.emit("messages", messages, id);
      socket.emit("messages", messages, id);
    }
  });

  const [messages] = await (
    await db
  ).query(
    "SELECT * FROM messages ms JOIN users us ON ms.user_id = us.user_id ORDER BY ms.message_id"
  );

  socket.emit("messages", messages);
  socket.broadcast.emit("messages", messages);
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    key: "user_cookie",
    secret: mySecret,
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", async (req, res) => {
  if (req.session.userID) {
    try {
      const [result] = await (
        await db
      ).query("SELECT * FROM users WHERE user_id = ?", [req.session.userID]);

      res.json({ log: true, result });
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.json({ log: false });
  }
});

app.post("/login", async (req, res) => {
  try {
    const newId = crypto.randomUUID();
    const [result] = await (
      await db
    ).query("INSERT INTO users(user_id, user_name) VALUES (?,?)", [
      newId,
      req.body.content,
    ]);

    if (result.affectedRows > 0) {
      req.session.userID = newId;
      res.json({ ok: true });
    } else {
      res.json({ ok: false });
    }
  } catch (error) {
    console.log(error);
  }
});

server.listen(3000, () => console.log("Server on"));
