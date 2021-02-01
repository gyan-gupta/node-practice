const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 6,
        max: 10
    },
    email:{
        type: String,
        required: true,
        max: 20,
        min: 6
    },
    password:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    date:{
        type: Date,
        default: Date.new
    }

});

module.exports = mongoose.model('User',userSchema);