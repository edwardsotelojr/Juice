const Order = require('../models/Order');

exports.getIndex = async (req, res) => {
    const order = await Order.find((data) => data);

    try {
        console.log(order);
        // Data rendered as an object and passed down into index.ejs
        // res.status(200).render('index', { anime: anime });

        // Data returned as json so a fetch/axios requst can get it
        res.json(order);
    } catch (error) {
        console.log(error);
    }
};

exports.getOrder = async (req, res) => {
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId, (order) => order);

    try {
        console.log(order);
        res.status(200).render('order', { order: order });
    } catch (error) {
        console.log(error);
    }
};