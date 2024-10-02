const express = require("express");
const morgan = require("morgan");
const { readProducts, writeProducts } = require("./database");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;
const SECRET_KEY = "your_secret_key"; // Cambia esto por una clave secreta segura

// * Settings

// app.set("case sensitive routing", true);
// app.set("appName", "My Express App");
// app.set("port", 3000);

// ! Middlewares

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// ? Routing

// | images routes

app.get("/img/:name", (req, res) => {
  const imageName = req.params.name;
  const imagePath = path.join(__dirname, "upload/img", imageName);
  console.log(imagePath);
  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error("Error al enviar la imagen:", err);
      if (!res.headersSent) {
        res.status(404).send("Image not found");
      }
    }
  });
});

// Simulated database
let users = [];

// Register route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).send("User registered");
});

app.post("/login", async (req, res) => {
  const { username, password, rememberMe } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(400).send("Invalid credentials");
  }

  console.log(user);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send("Invalid credentials");
  }

  // Generate a JWT token
  const token = jwt.sign({ username: user.username }, SECRET_KEY, {
    expiresIn: rememberMe ? "30d" : "1h",
  });

  // Set the token in a cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : null, // 30 días o sesión de navegador
  });
  res.json({ message: "Login successful", token });
});

// Middleware para proteger rutas
const authenticateToken = (req, res, next) => {
  const token =
    req.cookies.token || req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Verificar autenticación (con cookies)
app.get("/api/protected", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Access granted", user: req.user });
});

// Logout route (optional, just for client-side token removal)
app.post("/logout", (req, res) => {
  // Invalidate the session on the client side by clearing the cookie
  res.clearCookie("token");
  res.send("Logged out");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// app.get("/products", (req, res) => {
//   const products = readProducts();
//   res.json(products);
// });

// app.post("/products", (req, res) => {
//   const products = readProducts();
//   const newProduct = { id: products.length + 1, ...req.body };
//   products.push(newProduct);
//   writeProducts(products);
//   res.send(newProduct);
// });

// app.put("/products/:id", (req, res) => {
//   const products = readProducts();
//   const index = products.findIndex((p) => p.id === +req.params.id);
//   if (index === -1) return res.status(404).send("Product not found");
//   products[index] = { id: +req.params.id, ...req.body };
//   writeProducts(products);
//   res.send(products[index]);
// });

// app.delete("/products/:id", (req, res) => {
//   const products = readProducts();
//   const index = products.findIndex((p) => p.id === +req.params.id);
//   if (index === -1) return res.status(404).send("Product not found");
//   const [deletedProduct] = products.splice(index, 1);
//   writeProducts(products);
//   res.send(deletedProduct);
// });

// app.get("/products/:id", (req, res) => {
//   const products = readProducts();
//   const product = products.find((p) => p.id === parseInt(req.params.id));
//   if (!product) {
//     return res.status(404).send("Product not found");
//   }
//   res.json(product);
// });

// app.listen(port);
// console.log(`Server is running on http://localhost:${port}`);
