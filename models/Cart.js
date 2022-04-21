const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        username: {type: String, required: true},
        products: [
            {
                productName: {type: String, required: true},
                quantity: {type: Number, default: 1},
            }
        ]
    }
);

module.exports = mongoose.model('Cart', cartSchema);