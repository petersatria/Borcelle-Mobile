require('dotenv').config()
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')


const [itemTypeDefs, itemResolvers] = require('./schema/itemSchema')
const [userTypeDefs, userResolvers] = require('./schema/userSchema')

const server = new ApolloServer({
  typeDefs: [itemTypeDefs, userTypeDefs],
  resolvers: [itemResolvers, userResolvers],
})

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
})





