const { connectToCluster } = require('../config/connection')

class Controller {
  static async CreateUser(req, res) {
    try {
      console.log(req.body);
      const { email, password } = req.body
      const { db } = connectToCluster
      console.log(db);
      // let data = db.collection('users').insertOne({ email, password })
      // console.log(data);
      // res.status(201).json(data)
    } catch (err) {
      console.log(err);
    }
  }
  static async FindAllUser(req, res) {
    try {

    } catch (err) {

    }
  }
  static async FindOneUser(req, res) {
    try {

    } catch (err) {

    }
  }
  static async DeleteUser(req, res) {
    try {

    } catch (err) {

    }
  }
}

module.exports = Controller