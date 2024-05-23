require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(errorMiddleware);

// Routes
const authRoutes = require("./routes/authRoutes");
const groceryRoutes = require("./routes/groceryRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/auth", authRoutes);
app.use("/groceries", groceryRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);

sequelize
  .sync() // Synchronize models with the database
  .then(() => {
    console.log("Database connected...");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    process.exit(1); // Exit the process with failure
  });
