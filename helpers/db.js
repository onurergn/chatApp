const mongoose = require('mongoose')

module.exports = () => {
    mongoose.connect(process.env.DB_STRING)

    mongoose.connection.on('open', () => {
        console.log('connected mongoDB')
    })

    mongoose.connection.on('error', (err) => {
        console.log(err)
    })

    mongoose.Promise = global.Promise
}