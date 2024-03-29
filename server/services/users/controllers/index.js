const { ObjectId } = require("mongodb");
const MongoDBConnection = require('../config/connection');
const { hashPassword } = require("../helpers/helper");

class Controller {
  static async createUser(req, res, next) {
    try {
      let { username, email, password, phoneNumber, address } = req.body
      if (!email || !password) throw { name: 'EmailPasswordEmpty' }
      if (password.length < 5) throw { name: 'MinPassword' }
      const { db } = MongoDBConnection
      let isUserNotValid = await db.collection('users').findOne({ email })
      if (isUserNotValid) throw { name: 'EmailNotUnique' }
      password = hashPassword(password)
      const userObj = { username: username || '', email, password, phoneNumber: phoneNumber || '', address: address || '', role: 'Admin' }
      const data = await db.collection('users').insertOne(userObj)
      res.status(201).json({ message: 'Success registered user', insertedId: data.insertedId })
    } catch (err) {
      next(err)
    }
  }
  static async findAllUser(req, res, next) {
    try {
      const { db } = MongoDBConnection
      const data = await db.collection('users').find().project({ password: 0 }).toArray()
      res.status(200).json({ message: 'Success get data', data })
    } catch (err) {
      next(err)
    }
  }
  static async findOneUser(req, res, next) {
    try {
      const _id = new ObjectId(req.params.id)
      const { db } = MongoDBConnection
      const data = await db.collection('users').findOne({ _id }, { projection: { password: 0 } })
      if (!data) throw { name: 'NotFound' }
      res.status(200).json({ message: 'Success get data', data })
    } catch (err) {
      next(err)
    }
  }
  static async deleteUser(req, res, next) {
    try {
      const _id = new ObjectId(req.params.id)
      const { db } = MongoDBConnection

      let deleted = await db.collection('users').deleteOne({ _id })
      if (!deleted.deletedCount) throw { name: 'NotFound' }
      res.status(200).json({ message: 'Success delete data', deletedId: _id })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = Controller