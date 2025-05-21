var mongoose = require('mongoose');
var Schema = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true,
    },
    email: {
        type: String,
    }
},
{timestamps: true});

module.exports = mongoose.model('Student',userSchema);