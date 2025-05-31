require("dotenv").config();

const port = process.env.PORT || 3000;
const express = require("express");
const app = express();
const connectToDatabase = require("./database/database");
const authRoutes = require("./routes/auth/auth-routes");

app.use(express.json());
app.use("/api/auth", authRoutes);

connectToDatabase();

app.listen(port, () => {
  console.log(`Server is listening and running on port ${port}`);
});
