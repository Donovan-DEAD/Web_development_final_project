require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user');


const InitializeDbConnection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('DB connected');
    } catch (error) {
        console.log(error);
        throw new Error('Error when starting the DB');
    }
};

const VerifyRootUser = async () => {
    // const user = await User.findById(new mongoose.Types.ObjectId(process.env.ROOT_ID));
    await User.findByIdAndDelete(new mongoose.Types.ObjectId(process.env.ROOT_ID));

    const user = await User.findById(new mongoose.Types.ObjectId(process.env.ROOT_ID));

    if (!user) {
        const user = {
            username: process.env.ROOT_EMAIL,
            email: process.env.ROOT_EMAIL,
            name: process.env.ROOT_NAME,
            perms: process.env.ADMIN_PERM_STR,
            _id : new mongoose.Types.ObjectId(process.env.ROOT_ID)
        };

        await User.register(user, process.env.ROOT_PASSWORD);
        console.log('Root user created');
    } else {
        console.log('Root user already exists');
    }
}

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

const { createClient } = require('@supabase/supabase-js');
const { randomUUID } = require('crypto');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const uploadImageToSupabase = async (file) => {
    const fileName = `${randomUUID()}-${file.originalname}`;
    const { data, error } = await supabase.storage
        .from('images')
        .upload(fileName, file.buffer, {
            cacheControl: '3600',
            upsert: false,
            contentType: file.mimetype,
        });

    if (error) {
        throw new Error('Error uploading image to Supabase');
    }

    const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName);
    return publicUrl;
};

module.exports = {
    InitializeDbConnection,
    ReturnPerms,
    VerifyRootUser,
    uploadImageToSupabase
};
