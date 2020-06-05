const mongoose = require("mongoose");

// default function
module.exports = () => {

    // mongodb connection string
    mongoose.connect(process.env.DB_LOCAL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    // mongodb connection event
    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected');
    });

    // mongodb connection failed event
    mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err);
    });

    // mongodb promise type
    mongoose.Promise = global.Promise;
}