const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
         type: String,
         required: true
    },
    address: {
        type: String,
        //required: true
    },
    phone: {
        type: Number,
        //required: true
    },
    zipcode: {
        type: Number,
        //required: true
    }
},   {
    timestamps: true,
    collection: 'users'
});

module.exports = User = mongoose.model('users', userSchema);