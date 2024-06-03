// Initialize Express app
const express = require("express");
const app = express();
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
app.use(cors());
app.use(express.json());

//Initialize Cookie Parser
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//Import Routes
//const route = require("./api/exampleroute");

//initialize Routes
//app.use("/example", route)

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
