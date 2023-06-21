const { comparePassword, signToken } = require("../helpers/helper")
const { User, Category, Item, Ingredient } = require('../models')

class AdminController {
  static async registerAdmin(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body
      const data = await User.create({
        username: username || '', email, password, phoneNumber: phoneNumber || '', address: address || '', role: 'Admin'
      })
      res.status(201).json({
        message: 'Success registered user',
        data: { id: data.id, email: data.email, username: data.username }
      })
    } catch (err) {
      next(err)
    }
  }
  static async loginAdmin(req, res, next) {
    try {
      const { email, password } = req.body
      if (!email || !password) throw { name: 'EmailPasswordEmpty' }

      const data = await User.findOne({ where: { email } })
      if (!data) throw { name: 'EmailPasswordInvalid' }

      const isValidPassword = comparePassword(password, data.password)
      if (!isValidPassword) throw { name: 'EmailPasswordInvalid' }

      const access_token = signToken({ id: data.id })
      res.status(200).json({
        message: 'Success to login', access_token, id: data.id,
        username: data.username, email: data.email, role: data.role
      })
    } catch (err) {
      next(err)
    }
  }
  static async createItem(req, res, next) {
    try {
      const data = await Item.createItem(req, res, next)
      if (!data) throw { name: 'FailedCreatedItem' }
      res.status(201).json({ message: 'Success create item', data: data.data, ingredients: data.createdIngredients })
    } catch (err) {
      next(err)
    }

  }
  static async updateItem(req, res, next) {
    await Item.updateItem(req, res, next)
  }
  static async deleteItem(req, res, next) {
    try {
      const { id } = req.params
      const item = await Item.findByPk(id)
      const data = await Item.destroy({ where: { id } })
      if (data === 0) throw { name: 'NotFound' }
      res.status(200).json({ message: 'Item sucess to delete', data: item })
    } catch (err) {
      next(err)
    }
  }
  static async createCategory(req, res, next) {
    try {
      const { name } = req.body
      const data = await Category.create({ name })
      res.status(201).json({ message: 'Success create category', data })
    } catch (err) {
      next(err)
    }
  }
  static async updateCategory(req, res, next) {
    try {
      const { id } = req.params
      const data = await Category.findByPk(id)
      if (!data) throw { name: 'NotFound' }

      const { name } = req.body
      await Category.update(
        { name },
        { where: { id } }
      )
      let message = `Category with id ${data.id} updated`
      res.status(200).json({ message, data })
    } catch (err) {
      next(err)
    }
  }
  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params
      const category = await Category.findByPk(id)
      const data = await Category.destroy({ where: { id } })
      if (data === 0) throw { name: 'NotFound' }
      res.status(200).json({ message: 'Category sucess to delete', data: category })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = AdminController