const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const mongoose = require("mongoose")
const config = require("config")
const path = require('path')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/api/init", require("./controllers/initController"))

app.use('/images', express.static(__dirname + '/images'))

app.use("/api/user", require("./routes/user"))
app.use("/api/upload", require("./routes/upload"))
app.use("/api/notes", require("./routes/notes"))
app.use("/api/article", require("./routes/articles"))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'dist')))

  app.get('*', (req, res) => {
    const referer = req.headers.referrer || req.headers.referer
    console.log('referer > ', referer)
    res.sendFile( path.join(__dirname, 'client', 'dist', 'index.html') )
  })
}

// Erorrs
app.use((req, res, next) => {
  const error = new Error('Path not found')
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


const PORT = process.env.PORT || config.get('port')
const start = async () => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to DB !!");

    app.listen(PORT, (req, res) => {
      console.log(`Server Started at PORT ${PORT}`)
    });
  } catch (e) {
    console.log(e);
    process.exit(1)
  }
};

start()