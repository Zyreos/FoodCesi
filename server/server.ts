let express = require("express");
let mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require("cors");
require("dotenv").config();

const app = express()

const whitelist = ['http://localhost:8080', 'http://localhost:3000'];
const corsOptions = {
  credentials: true,
  origin: true,
  /*origin: (origin, callback) => {
    if(whitelist.includes(origin))
      return callback(null, true)

      callback(new Error('Not allowed by CORS'));
  }*/
}

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get('/test', (req, res)=> {
  res.send("Sucess")
})
require('./routes.ts')(app)

mongoose.connect('mongodb://localhost:27017/FoodCesi',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});