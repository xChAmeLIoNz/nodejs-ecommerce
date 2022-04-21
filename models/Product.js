const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, unique:true},
        description: {type: String},
        quantity: {type: Number, required: true},
        price: {type: Number, required: true},
    }
);

module.exports = mongoose.model('Product', productSchema);

/*
30 tv
2 monopattini elettrici
infiniti cavi hdmi
3000 cavi ethernet
*/
