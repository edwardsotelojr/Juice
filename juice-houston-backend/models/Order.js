const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    user_id: {
        type: Number,
        required: true
    },
    ingredients: {
        type: Object,
        //required: true
    },
    price: {
         type: Number,
         required: true
    },
    address: {
        type: String,
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

module.exports = Order = mongoose.model('orders', orderSchema);