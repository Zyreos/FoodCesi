const AuthenticationController = require('./controllers/AuthenticationController.ts');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy.ts')
const RestaurantController = require('./controllers/RestaurantController.ts');
const OrderController = require('./controllers/OrderController.ts');
const ArticleController = require('./controllers/ArticleController.ts');
const UserController = require('./controllers/UserController.ts');

module.exports = (app) => {
  app.post('/register', 
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/login', 
    AuthenticationController.login)

  app.get('/users',
    UserController.getAllUsers)

  app.get('/restaurants',
    RestaurantController.getAllRestaurants)

  app.get('/restaurants/:id',
    RestaurantController.getRestaurant)

  app.post('/create_order',
    OrderController.createOrder)

  app.get('/orders/:id',
  OrderController.getOrdersByUser)

  app.post('/create_article',
  ArticleController.createArticle)

  app.get('/articles/:id',
  ArticleController.getArticlesByUser)
}