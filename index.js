const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const mongoose = require("mongoose");
const config = require("config")

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/images', express.static(__dirname + '/images'));

app.use("/api/user", require("./routes/user"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/article", require("./routes/articles"));

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


const PORT = process.env.PORT || config.get('port');
const start = async () => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to DB !!");

    app.listen(PORT, (req, res) => {
      console.log(`Server Started at PORT ${PORT}`);
    });
  } catch (e) {
    console.log(e);
    process.exit(1)
  }
};



start()