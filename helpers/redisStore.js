const session = require('express-session');
let redisStore = require('connect-redis')(session);
const { createClient } = require("redis")
let redisClient = createClient({ legacyMode: true })
redisClient.connect().catch(console.error)

const dotenv = require('dotenv');
dotenv.config();

module.exports = new redisStore({
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT,
    pass: process.env.REDIS_PASS,
    client: redisClient
})