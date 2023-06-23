const Redis = require("ioredis");
// const redis = new Redis(); //local
const redis = new Redis({
  port: 11314, // Redis port
  host: "redis-11314.c252.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  password: process.env.REDIS_PASSWORD,
  connectTimeout: 10000
});

module.exports = redis