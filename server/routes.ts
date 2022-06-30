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
    AuthenticationController.requireAuth,
    UserController.getAllUsers)

  app.get('/restaurants',
    AuthenticationController.requireAuth,
    RestaurantController.getAllRestaurants)

  app.get('/restaurants/category/:category',
    AuthenticationController.requireAuth,
    RestaurantController.getRestaurantsByCategory)

  app.get('/categories',
    AuthenticationController.requireAuth,
    RestaurantController.getAllCategories)

  app.get('/restaurants/:id',
    AuthenticationController.requireAuth,
    RestaurantController.getRestaurant)

  app.post('/create_order',
    AuthenticationController.requireAuth,
    OrderController.createOrderPost)

  app.post('/newOrder',
    AuthenticationController.requireAuth,
    OrderController.createOrder)

  app.get('/orders/:id',
    AuthenticationController.requireAuth,
    OrderController.getOrdersByUser)

  app.get('/orders_delivering',
    OrderController.getOrdersDelivering)

  app.put('/order_confirm_deliverer/:id_order/:id_user',
    OrderController.updateOrderWithDeliverer)

  app.put('/changeOrderState/:id_order',
    OrderController.changeOrderState)

  app.post('/create_article',
    AuthenticationController.requireAuth,
    ArticleController.createArticle)

  app.get('/articles/:id',
    AuthenticationController.requireAuth,
    ArticleController.getArticlesByUser)

  app.get('/users/:id',
    AuthenticationController.requireAuth,
    UserController.getUserById)

  app.delete('/users/:id',
    AuthenticationController.requireAuth,
    UserController.deleteUser)

  app.put('/users/:id',
    AuthenticationController.requireAuth,
    UserController.updateUser)

  app.put('/changeOrderState/:id_order',
    AuthenticationController.requireAuth,
    OrderController.changeOrderState)
}