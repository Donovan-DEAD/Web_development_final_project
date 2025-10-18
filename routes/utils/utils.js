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

const ReturnPerms = (perm)=>{
    switch(perm){
        case ("admin"):
            return process.env.ADMIN_PERM_STR;
        case ("user"):
            return process.env.USER_PERM_STR;
        case("editor"):
            return process.env.EDITOR_PERM_STR;
        default:
            return null;
    }
}

module.exports = {
    InitializeDbConnection,
    ReturnPerms
};
