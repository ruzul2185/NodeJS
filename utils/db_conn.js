var mongoose = require('mongoose');

const Connect = async() => {
    try{
        await mongoose.connect(process.env.mongoUri)
        .then(() => (console.log('Connection successful!')));
    }catch(error){
        console.log(error);
    }
}

module.exports = Connect;