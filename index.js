// const http = require("http");
// const fs = require("fs");

// const server = http.createServer((req, res) => {
//   const read = fs.createReadStream("./static/index.html");
//   read.pipe(res);
// });

// server.listen(3000);

// console.log("Server is running on http://localhost:3000");

////////////////////////////////////////////

// const express = require("express");

// const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.get("/about", (req, res) => {
//   res.send("About");
// });

// app.get("/weather", (req, res) => {
//   res.send("The current weather is Nice");
// });

// app.use((req, res) => {
//   res.status(404).send("404 Page Not Found");
// });

// app.listen(3000);
// console.log("Server is running on http://localhost:3000");

////////////////////////////////////////////

// const express = require("express");

// const app = express();

// app.get("/products", (req, res) => {
//   res.send("List of products");
// });

// app.post("/products", (req, res) => {
//   res.send("Create a new products");
// });

// app.put("/products", (req, res) => {
//   res.send("Update a products");
// });

// app.delete("/products", (req, res) => {
//   res.send("Delete a products");
// });

// app.patch("/products", (req, res) => {
//   res.send("Change a products");
// });

// app.listen(3000);
// console.log("Server is running on http://localhost:3000");

////////////////////////////////////////////

// const express = require("express");

// const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// // app.get("/myfile", (req, res) => {
// //   res.sendFile("./img/Logo.png", { root: __dirname });
// // });

// app.get("/user", (req, res) => {
//   res.json({
//     name: "name",
//     age: 20,
//     email: "example@example.com",
//   });
// });

// app.get("/isAlive", (req, res) => {
//   res.sendStatus(204);
// });

// app.listen(3000);
// console.log("Server is running on http://localhost:3000");

////////////////////////////////////////////

// const express = require("express");

// const app = express();

// app.use(express.text());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.post("/user", (req, res) => {
//   console.log(req.body);
//   res.send("User Created");
// });

// app.listen(3000);
// console.log("Server is running on http://localhost:3000");

////////////////////////////////////////////

const express = require("express");

const app = express();

// app.get("/hello/:username", (req, res) => {
//   console.log(typeof req.params.username);
//   res.send(`Hello ${req.params.username.toUpperCase()}`);
// });

app.all("/info", (req, res) => {
  res.send(`Server is running on http://localhost:3000`);
});

app.get("/hello/:username", (req, res) => {
  console.log(req.query.user);
  console.log(req.query.age);
  res.send(`Hello ${req.params.username}`);
});

app.get("/seach", (req, res) => {
  console.log(req.query);
  if (req.query.q === "name") {
    res.send("Name found");
  } else {
    res.send("Name not found");
  }
});

app.get("/add/:x/:y", (req, res) => {
  const { x, y } = req.params;
  res.send(`The sum is ${parseInt(x) + parseInt(y)}`);
});

app.get("/users/:username/photo", (req, res) => {
  if (req.params.username === "admin") {
    return res.sendFile("./img/Logo.png", { root: __dirname });
  }

  res.send("No photo found");
});

app.get("/name/:name/age/:age", (req, res) => {
  console.log(req.params);
  res.send(`Hello ${req.params.name} you are ${req.params.age} years old`);
});

app.listen(3000);
console.log("Server is running on http://localhost:3000");
