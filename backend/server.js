const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const quoteRoutes = require("./routes/quotes");
const cors = require("cors");


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/quotes", quoteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
