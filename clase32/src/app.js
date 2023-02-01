import express from "express";
import crypto from "crypto";

const app = express();
const PORT = parseInt(process.argv[2]) || 3000;
const users = {};

app.use(express.static("public"));

app.get("/", (req, res) => {
  const { name } = req.query;
  console.log(name);
  res.send("Hola mundo");
});

app.get("/getUsers", (req, res) => {
  res.send(users);
});
//new user
app.get("/newUser", (req, res) => {
  let username = req.query.username ? req.query.username : "";
  let password = req.query.password ? req.query.password : "";

  username = username.trim().replace(/[!@#$%^&*]/g, "");

  if (!username || !password || users[username]) {
    res.sendStatus(400);
  }

  const salt = crypto.randomBytes(128).toString("base64");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 512, "sha512")
    .toString("hex");

  users[username] = { salt, hash };

  res.sendStatus(200);
});
//auth-bloq
app.get("/auth-bloq", (req, res) => {
  let username = req.query.username ? req.query.username : "";
  let password = req.query.password ? req.query.password : "";

  username = username.trim().replace(/[!@#$%^&*]/g, "");

  if (!username || !password || !users[username]) {
    res.sendStatus(400);
  } else {
    const { salt, hash } = users[username];
    const encryptHash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512");
    if (crypto.timingSafeEqual(hash, encryptHash)) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  }
});

//auth-no-bloq

app.get("/auth-nobloq", (req, res) => {
  let username = req.query.username;
  let password = req.query.password;

  username = username.replace(/[!@#$%^&*]/g, "");

  if (!username || !password || !users[username]) {
    res.sendStatus(400);
  } else {
    const { salt, hash } = users[username];
    crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512", (err, hash) => {
      if (hash.toString() === users[username].hash.toString()) {
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    });
  }
});
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("error", (error) => {
  console.log("Error en el servidor:", error);
});
