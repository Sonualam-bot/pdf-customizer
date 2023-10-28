const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const pdf = require("./routes/pdf.routes");

app.use(express.json());
app.use("/api/v1/files", express.static(path.join(__dirname, "../files")));

app.get("/", (req, res) => {
  res.send("PDF MERN");
});

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use("/api/v1", pdf);

module.exports = app;
