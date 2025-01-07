const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Quote = require("./models/Quote");
const quotes = require("./quotes.json");

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const importData = async () => {
  try {
    await Quote.deleteMany();
    await Quote.insertMany(quotes);
    console.log("Quotes Imported!");
    process.exit();
  } catch (error) {
    console.error("Error importing data:", error);
    process.exit(1);
  }
};

importData();
