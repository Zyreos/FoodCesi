let express = require("express");
let mongoose = require("mongoose");
const cors = require("cors");
let router = require("./routes.ts");

let app = express();

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions));

app.use(express.json());

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

app.use(router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});