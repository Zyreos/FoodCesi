express = require("express");
app = express();

const AuthenticationController = require('./controllers/AuthenticationController.ts');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy.ts')

app.post('/register', 
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

app.get("/users", async (request, response) => {
    const users = await userModel.find({});
  
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  module.exports = app;