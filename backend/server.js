import express from "express";
import connectDB from "./db.js";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

app.get("/api/comparison", async (req, res) => {
  try {
    const db = await connectDB();
    const comparisons = await db.all("SELECT * FROM comparison");
    res.json(comparisons);
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const db = await connectDB();
    const products = await db.all("SELECT * FROM products");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

app.get("/api/sales", async (req, res) => {
  try {
    const db = await connectDB();
    const sales = await db.all("SELECT * FROM sales");
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

// Mock Data
const cardData = {
  lastYear: {
    purchases: { value: 4294, change: 32 },
    revenue: { value: 322300, change: 49 },
    refunds: { value: 8200, change: 7 },
  },
  currentYear: {
    purchases: { value: 5210, change: 45 },
    revenue: { value: 402100, change: 68 },
    refunds: { value: 6200, change: -12 },
  },
};

// API Route
app.get("/api/dashboard-cards", (req, res) => {
  const { period } = req.query;
  const data = cardData[period] || cardData.lastYear;
  res.json(data);
});

const performanceScoreData = {
  score: 78,
  rank: 80, // Better than 80% of users
};

app.get("/api/performance-score", (req, res) => {
  res.json(performanceScoreData);
});

app.get("/api/community-feedback", (req, res) => {
    res.json({
      negative: 12,
      neutral: 34,
      positive: 134,
    });
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
