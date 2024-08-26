const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String },
    totalSales:{ type: Number, required: true },
    rating:{ type: Number, required: true }
});

module.exports = mongoose.model('Product', ProductSchema);
