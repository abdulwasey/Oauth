require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.get("/",(req,res)=>{
    res.render("index");
})

app.use("/auth", authRoutes);
app.use(
    "/users",
    loginRequired,
    ensureCorrectUser);



app.use(function (req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, function () {
    console.log(`Server is starting at port ${PORT}`);
});