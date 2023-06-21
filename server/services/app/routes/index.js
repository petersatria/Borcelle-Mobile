const Controller = require("../controllers")
const AdminController = require("../controllers/AdminController")
const authentication = require('../middleware/authentication')
const errorHandler = require('../middleware/errorHandler')

const router = require('express').Router()

router
  .post('/login', AdminController.loginAdmin)
  .get('/items', Controller.findAllItems)
  .get('/items/:id', Controller.findOneItem)
  .get('/categories', Controller.findAllICategories)
  .get('/categories/:id', Controller.findOneCategory)
  .use(authentication)
  .post('/register', AdminController.registerAdmin)
  .post('/items', AdminController.createItem)
  .put('/items/:id', AdminController.updateItem)
  .delete('/items/:id', AdminController.deleteItem)
  .post('/categories', AdminController.createCategory)
  .put('/categories/:id', AdminController.updateCategory)
  .delete('/categories/:id', AdminController.deleteCategory)
  .use(errorHandler)

module.exports = router