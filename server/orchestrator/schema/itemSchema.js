const axios = require('axios')
const redis = require('../config/redis')

const BASE_URL_APP = process.env.BASE_URL_APP || 'http://localhost:4002'
const BASE_URL_USER = process.env.BASE_URL_USER || 'http://localhost:4001'

const typeDefs = `#graphql
  type Item {
    id: ID
    name: String
    description: String
    price: Int
    imgUrl: String
    categoryId: Int
    userMongoId: String
    Category: Category
    Ingredients: [Ingredient]
    User: User
  }

  type Category{
    id: ID
    name: String
  }

  type Ingredient{
    id: ID
    itemId: Int
    name: String
  }

  input Ingredients{
    name: String
  }

  type Response{
    message: String
  }

  type User{
    _id: ID
    username: String
    email: String
    phoneNumber: String
    address: String
    role: String
  }

  type Query {
    findItems: [Item]
    findItemById(id: ID!): Item
    findCategories: [Category]
  }

  type Mutation {
    createItem(
      name: String,
      description: String,
      price: Int,
      imgUrl: String,
      categoryId: Int,
      ingredients: [Ingredients],
      userMongoId: String
      ): Item

    updateItem(
      id: ID!,
      name: String,
      description: String,
      price: Int,
      imgUrl: String,
      categoryId: Int,
      ingredients: [Ingredients],
      userMongoId: String
      ): Response
    deleteItem( id: ID!): Response
  } 
`

const resolvers = {
  Query: {
    findItems: async () => {
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
        return response.data
      } catch (err) {
        throw err
      }
    },
    findItemById: async (_, args) => {
      try {
        const { data } = await axios({
          method: 'GET',
          url: BASE_URL_APP + '/items/' + args.id
        })
        const id = data.data.userMongoId
        const { data: user } = await axios({
          method: 'GET',
          url: BASE_URL_USER + '/users/' + id
        })
        data.data.User = user.data
        return data.data
      } catch (err) {
        throw err
      }
    },
    findCategories: async () => {
      try {
        const { data } = await axios({
          method: 'GET',
          url: BASE_URL_APP + '/categories'
        })
        return data.data
      } catch (err) {
        throw err
      }
    }
  },

  Mutation: {
    createItem: async (_, args) => {
      try {
        let { name, description, price, imgUrl, categoryId, userMongoId, ingredients } = args
        ingredients = ingredients.map(e => e.name)
        const { data } = await axios({
          method: 'POST',
          url: BASE_URL_APP + '/items',
          data: { name, description, price, imgUrl, categoryId, userMongoId, ingredients }
        })
        data.data.Ingredients = data.ingredients
        await redis.del('app:items')
        return data.data
      } catch (err) {
        throw err
      }
    },
    updateItem: async (_, args) => {
      try {
        let { id, name, description, price, imgUrl, categoryId, userMongoId, ingredients } = args
        ingredients = ingredients.map(e => e.name)
        const { data } = await axios({
          method: 'PUT',
          url: BASE_URL_APP + '/items/' + id,
          data: { name, description, price, imgUrl, categoryId, userMongoId, ingredients }
        })
        await redis.del('app:items')
        return data
      } catch (err) {
        throw err
      }
    },
    deleteItem: async (_, args) => {
      try {
        let { id } = args
        const { data } = await axios({
          method: 'DELETE',
          url: BASE_URL_APP + '/items/' + id,
        })
        await redis.del('app:items')
        return data
      } catch (err) {
        throw err
      }
    }
  }
}

module.exports = [typeDefs, resolvers]