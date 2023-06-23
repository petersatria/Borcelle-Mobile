const Controller = require("../controllers")
const errorHandler = require("../middleware/errorHandler")

const router = require('express').Router()

router
  .post('/users', Controller.createUser)
  .get('/users', Controller.findAllUser)
  .get('/users/:id', Controller.findOneUser)
  .delete('/users/:id', Controller.deleteUser)
  .use(errorHandler)

module.exports = router