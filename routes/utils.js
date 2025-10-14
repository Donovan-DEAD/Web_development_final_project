require('dotenv').config();
const mongoose = require('mongoose');

const InitializeDbConnection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('DB connected');
    } catch (error) {
        console.log(error);
        throw new Error('Error when starting the DB');
    }
};

module.exports = {
    InitializeDbConnection
};
