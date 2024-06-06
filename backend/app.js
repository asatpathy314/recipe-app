// Initialize Express app
const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());
app.use(express.json());

// Initialize Cookie Parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Import Routes
const recipe = require("./api/recipe");
const gpt = require("./api/gpt");
const comment = require("./api/comment");
const user = require("./api/user");
const admin = require("./api/admin");

// Initialize Routes
app.use("/recipe", recipe);
app.use("/gpt", gpt);
app.use("/comment", comment)
app.use("/user", user);
app.use("/admin", admin);

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
