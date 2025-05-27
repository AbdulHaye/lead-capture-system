const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/db");
const leadsRoutes = require("./src/routes/leads");
const { errorHandler } = require("./src/middleware/errorHandler");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/leads", leadsRoutes);

// Global error handler
app.use(errorHandler);

sequelize
  .sync()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });
