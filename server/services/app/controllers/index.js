const { User, Category, Item, Ingredient } = require('../models')

class Controller {
  static async findAllItems(req, res, next) {
    try {
      const data = await Item.findAll({
        include: [{
          model: Category,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }, {
          model: Ingredient,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        {
          model: User,
          attributes: ['username', 'email']
        }],
        order: [['updatedAt', 'DESC']]
      })
      res.status(200).json({ message: 'Success get data', data })
    } catch (err) {
      next(err)
    }
  }
  static async findOneItem(req, res, next) {
    try {
      const { id } = req.params
      const data = await Item.findByPk(id, {
        include: [{
          model: Category,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }, {
          model: Ingredient,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        {
          model: User,
          attributes: ['username', 'email']
        }],
        order: [['updatedAt', 'DESC']]
      })
      res.status(200).json({ message: 'Success get data', data })
    } catch (err) {
      next(err)
    }
  }

  static async findAllICategories(req, res, next) {
    try {
      const data = await Category.findAll()
      res.status(200).json({ message: 'Success get data', data })
    } catch (err) {
      next(err)
    }
  }

  static async findOneCategory(req, res, next) {
    try {
      const { id } = req.params
      const data = await Category.findByPk(id)
      res.status(200).json({ message: 'Success get data', data })
    } catch (err) {
      next(err)
    }
  }

}

module.exports = Controller