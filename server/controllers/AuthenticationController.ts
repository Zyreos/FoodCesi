const userModel = require("../models/models.ts");

/*app.post("/add_user", async (request, response) => {
    const user = new userModel(request.body);
  
    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});*/

module.exports = {
    async register(req, res) {
        const user = new userModel(req.body);
        try {
            await user.save();
            res.send(user);
        } catch (err) {
            res.status(400).send({
                error: 'This email account is already in use.'
            })
        }
    }
}