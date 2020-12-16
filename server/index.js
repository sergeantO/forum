const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')
const InitiateMongoServer = require("./config/db");

const user = require("./routes/user");
const articles = require("./routes/articles");
const upload = require("./routes/upload");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.use('/images', express.static(__dirname + '/images'));

app.use("/user", user);
app.use("/upload", upload);
app.use(articles);

// Erorrs
app.use((req, res, next) => {
  const error = new Error('Path not found');
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});