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

  app.get('/restaurants/category/:category',
    RestaurantController.getRestaurantsByCategory)
  
  app.get('/categories',
    RestaurantController.getAllCategories)

  app.get('/restaurants/:id',
    RestaurantController.getRestaurant)

  app.post('/create_order',
    OrderController.createOrderPost)

  app.post('/newOrder',
  OrderController.createOrder)

  app.get('/orders/:id',
  OrderController.getOrdersByUser)

  app.get('/orders_delivering',
    OrderController.getOrdersDelivering)

  app.put('/order_confirm_deliverer/:id_order/:id_user',
    OrderController.updateOrderWithDeliverer)

  app.put('/changeOrderState/:id_order',
    OrderController.changeOrderState)

  app.post('/create_article',
  ArticleController.createArticle)

  app.get('/articles/:id',
  ArticleController.getArticlesByUser)

  app.delete('/article/:id_article/delete',
    ArticleController.deleteArticle)

  app.get('/users/:id',
  UserController.getUserById)

  app.delete('/users/:id',
    UserController.deleteUser)
  
  app.put('/users/:id',
    UserController.updateUser)

  app.put('/changeOrderState/:id_order',
    OrderController.changeOrderState)
}