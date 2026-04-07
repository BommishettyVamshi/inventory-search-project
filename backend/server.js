const express = require("express");
const cors = require("cors");
const inventoryData = require("./data/inventory.json");

const app = express();
const PORT = 5000;

const allowedOrigins = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "https://inventory-search-project-six.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin); // debug
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);


app.use(express.json());

// console.log("Inventory Data Loaded:", inventoryData);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/search", (req, res) => {
  try {
    const {
      q = "",
      category = "",
      minPrice = "",
      maxPrice = "",
    } = req.query;

    const minPriceNum = minPrice === "" ? 100 : Number(minPrice);
    const maxPriceNum = maxPrice === "" ? 1000 : Number(maxPrice);

    if (minPriceNum > maxPriceNum) {
      return res
        .status(400)
        .json({ error: "minimum price cannot be greater than maximum price" });
    }

    // Filter products based on search criteria
    const filteredProducts = inventoryData.filter((product) => {
      const matchesQuery =
        q === "" || product.name.toLowerCase().includes(q.toLowerCase());
      const matchesCategory = category === "" || product.category.toLocaleLowerCase() === category.toLocaleLowerCase();
      const matchesPrice =
        product.price >= minPriceNum && product.price <= maxPriceNum;
      return matchesQuery && matchesCategory && matchesPrice;
    });

    res.status(200).json({ products: filteredProducts });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
