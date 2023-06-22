const Controller = require("../controllers")
const errorHandler = require("../middleware/errorHandler")

const router = require('express').Router()

router
  .post('/register', Controller.CreateUser)
  .get('/users', Controller.FindAllUser)
  .get('/users/:id', Controller.FindOneUser)
  .delete('/users/:id', Controller.DeleteUser)
  .use(errorHandler)

module.exports = router