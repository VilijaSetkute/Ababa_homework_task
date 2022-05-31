const express = require("express");
const app = express();
const cors = require("cors");
const mainRoute = require("./routes/mainRoute");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();
const http = require("http");
const server = http.createServer(app);

mongoose.connect(process.env.MONGO_KEY).then((res) => {
    console.log("Successfully connected to Mongo DB");
}).catch((e) => {
    console.log(e);
    console.log("Failed to connect")
});

app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false},
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_KEY,
            maxAge: 3600000
        }),
    })
);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(express.json());
app.use("/", mainRoute);

server.listen(process.env.PORT, () => {
    console.log(`Server is listening to port ${process.env.PORT}`);
});

