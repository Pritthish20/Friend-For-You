const express = require("express");
const http= require("http");
const cors = require("cors");
require("dotenv").config();

const database = require("./config/database");

const PORT =process.env.PORT ||  4000;

const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
    res.send("server is running fine");
  });
  
  

database.connect();

const authRoutes = require("./routes/Auth");
const userRoutes = require("./routes/User");

const allowedOrigins = ["http://localhost:3000", "https://friend-for-you-isbi.vercel.app"];
app.use(cors({origin:allowedOrigins, credentials:true}));
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);


server.listen(PORT, ()=>{
    console.log(`App is running at ${PORT}`);
});

