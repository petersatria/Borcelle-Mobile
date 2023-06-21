'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsTo(models.User, { foreignKey: 'authorId' })
      Item.belongsTo(models.Category, { foreignKey: 'categoryId' })
      Item.hasMany(models.Ingredient, { foreignKey: 'itemId' })
    }

    static async createItem(req, res, next) {
      const t = await sequelize.transaction();

      try {
        const { id: authorId } = req.user
        const { name, description, price, imgUrl, categoryId, ingredients } = req.body
        const data = await Item.create({
          name, description, price, imgUrl, authorId, categoryId, ingredients
        }, { transaction: t })
        if (ingredients?.length < 2) throw { name: 'IngredientsRequired' }
        const ingredientsData = ingredients.map(e => {
          if (!e) {
            throw { name: 'IngredientsNotEmpty' }
          }
          return { name: e, itemId: data.id }
        })
        const createdIngredients = await sequelize.models.Ingredient.bulkCreate(ingredientsData, { transaction: t })
        await t.commit();
        return { data, createdIngredients }
      } catch (err) {
        await t.rollback();
        next(err)
      }
    }

    static async updateItem(req, res, next) {
      const t = await sequelize.transaction();

      try {
        const { id: authorId } = req.user
        const { id } = req.params
        const { name, description, price, imgUrl, categoryId, ingredients } = req.body
        await Item.update({
          name, description, price, imgUrl, authorId, categoryId, ingredients
        }, { where: { id }, transaction: t })
        if (ingredients?.length < 2) throw { name: 'IngredientsRequired' }

        const ingredientsData = await Item.findAll({ include: [{ model: sequelize.models.Ingredient }], where: { id } })
        let arr = []
        ingredientsData[0].Ingredients.forEach((e, i) => {
          if (!ingredients[i]) {
            throw { name: 'IngredientsNotEmpty' }
          }
          let promise = sequelize.models.Ingredient.update({ name: ingredients[i] }, { where: { id: e.id } })
          arr.push(promise)
        });
        Promise.all(arr)
          .then(result => {
            res.status(200).json({ message: 'Success update data' })
          })
          .catch(err => {
            throw err
          })
        await t.commit();
      } catch (err) {
        await t.rollback();
        next(err)
      }
    }
  }
  Item.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name is required'
        },
        notEmpty: {
          msg: 'Name is required'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description is required'
        },
        notEmpty: {
          msg: 'Description is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Price is required'
        },
        notEmpty: {
          msg: 'Price is required'
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Image url is required'
        },
        notEmpty: {
          msg: 'Image url is required'
        }
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Author id is required'
        },
        notEmpty: {
          msg: 'Author id is required'
        }
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Category id is required'
        },
        notEmpty: {
          msg: 'Category id is required'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};