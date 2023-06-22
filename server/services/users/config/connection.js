const { MongoClient } = require('mongodb')

class MongoDBConnection {
  static db = false
  static async connect() {
    let mongoClient;
    let uri = process.env.DB_URI
    try {
      mongoClient = new MongoClient(uri);
      console.log('Connecting to MongoDB Atlas cluster...');
      await mongoClient.connect();
      console.log('Successfully connected to MongoDB Atlas!');
      this.db = mongoClient.db('restaurant')
      return mongoClient;
    } catch (error) {
      console.error('Connection to MongoDB Atlas failed!', error);
      process.exit();
    }
  }
}

module.exports = MongoDBConnection 
