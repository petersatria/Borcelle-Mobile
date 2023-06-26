const axios = require('axios')
const redis = require('../config/redis')

const BASE_URL_USER = process.env.BASE_URL_USER || 'http://localhost:4001'

const typeDefs = `#graphql
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
    findUsers: [User]
    findUserById(id: ID!): User
  }

  type Mutation {
    createUser(
      username: String
      email: String
      phoneNumber: String
      address: String
      role: String
      password: String
      ): Response
    deleteUser( id: ID!): Response
  } 
`

const resolvers = {
  Query: {
    findUsers: async () => {
      try {
        let response
        const cache = await redis.get('app:users')
        if (!cache) {
          const { data } = await axios({
            method: 'GET',
            url: BASE_URL_USER + '/users'
          })
          await redis.set('app:users', JSON.stringify(data))
          response = data
        } else {
          response = JSON.parse(cache)
        }
        return response.data
      } catch (err) {
        throw err
      }
    },
    findUserById: async (_, args) => {
      try {
        const { data } = await axios({
          method: 'GET',
          url: BASE_URL_USER + '/users/' + args.id
        })
        return data.data
      } catch (err) {
        throw err
      }
    }
  },

  Mutation: {
    createUser: async (_, args) => {
      try {
        let { username, email, phoneNumber, address, role, password } = args
        const { data } = await axios({
          method: 'POST',
          url: BASE_URL_USER + '/users',
          data: { username, email, phoneNumber, address, role, password }
        })
        await redis.del('app:users')
        return data
      } catch (err) {
        throw err
      }
    },
    deleteUser: async (_, args) => {
      try {
        let { id } = args
        const { data } = await axios({
          method: 'DELETE',
          url: BASE_URL_USER + '/users/' + id,
        })
        await redis.del('app:users')
        return data
      } catch (err) {
        throw err
      }
    }
  }
}

module.exports = [typeDefs, resolvers]