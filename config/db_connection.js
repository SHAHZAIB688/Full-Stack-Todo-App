const mongoose = require('mongoose')



const ConnectDB = async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/todoApp`)
        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = ConnectDB