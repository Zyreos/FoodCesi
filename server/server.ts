let express = require("express");
let mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express()
const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
app.use(express.json());
app.get('/test', (req, res)=> {
  res.send("Sucess")
})
require('./routes.ts')(app)

mongoose.connect('mongodb://mongo:27017/FoodCesi',
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