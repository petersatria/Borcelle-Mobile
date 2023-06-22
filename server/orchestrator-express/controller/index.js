const axios = require('axios')
const redis = require('../config/redis')
const BASE_URL_APP = 'http://localhost:4002'
const BASE_URL_USER = 'http://localhost:4001'

class Controller {

  static async createUser(req, res) {
    try {

    } catch (err) {

    }
  }
  static async findAllUser(req, res) {
    try {

    } catch (err) {

    }
  }
  static async findOneUser(req, res) {
    try {

    } catch (err) {

    }
  }
  static async deleteUser(req, res) {
    try {

    } catch (err) {

    }
  }
  static async findAllItems(req, res) {
    try {
      let response
      const cache = await redis.get('app:items')
      if (!cache) {
        const { data } = await axios({
          method: 'GET',
          url: BASE_URL_APP + '/items'
        })
        const { data: user } = await axios({
          method: 'GET',
          url: BASE_URL_USER + '/users'
        })
        data.data.forEach(e => {
          user.data.forEach(el => {
            if (e.userMongoId === el._id) {
              e.User = el
            }
          });
        });
        await redis.set('app:items', JSON.stringify(data))
        response = data
      } else {
        response = JSON.parse(cache)
      }
      res.status(200).json(response)
    } catch (err) {
      console.log(err);
    }
  }
  static async findOneItem(req, res) {
    try {

    } catch (err) {

    }
  }
  static async createItem(req, res) {
    try {

    } catch (err) {

    }
  }
  static async updateItem(req, res) {
    try {

    } catch (err) {

    }
  }
  static async deleteItem(req, res) {
    try {

    } catch (err) {

    }
  }

}

module.exports = Controller