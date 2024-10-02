// database.js
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "products.json");

function readProducts() {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

function writeProducts(products) {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
}

module.exports = {
  readProducts,
  writeProducts,
};
