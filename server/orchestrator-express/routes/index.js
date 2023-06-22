const Controller = require("../controller")

const router = require('express').Router()

router
  .post('/register', Controller.createUser)
  .get('/users', Controller.findAllUser)
  .get('/users/:id', Controller.findOneUser)
  .delete('/users/:id', Controller.deleteUser)
  .get('/items', Controller.findAllItems)
  .get('/items/:id', Controller.findOneItem)
  .post('/items', Controller.createItem)
  .put('/items/:id', Controller.updateItem)
  .delete('/items/:id', Controller.deleteItem)

module.exports = router