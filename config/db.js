const mongoose = require('mongoose');

exports.connectDB = ()=>{
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log('Connected to MongoDB');
    }).catch((err)=>{
        console.log('Could not connect to MongoDB', err);
    });
};