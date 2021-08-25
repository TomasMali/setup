// This file is for handling request
const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");

// connection route
const db = require("./api/routes/queries");
const tab = require("./api/routes/descriptionTables");
const event = require("./api/routes/event");
const competitions = require("./api/routes/competitions");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// security
app.use(cors({ origin: "*" }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding"
    );
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, GET, DELETE");
    res.header("Accept", "application/json");
    res.header("content-type", "application/json");

    next();
});

// just go to the ather file if you pass me ...
app.use("/user", db);
app.use("/", db);
app.use("/tab", tab);
app.use("/event", event);
app.use("/relation", competitions);

// if the user requires a path that doesnt exsists, i throw an error
app.use((req, ser, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error); // forword the request throut the appication
});

// i catch it here
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

module.exports = app;