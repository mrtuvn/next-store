const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 0
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['supplements', 'vitamins', 'minerals', 'herbs', 'probiotics', 'fitness', 'skincare', 'nutrition']
    },
    images: [{
        type: String,
        required: true
    }],
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    ratings: {
        average: {
            type: Number, default: 0
        },
        count: {
            type: Number,
            default: 0
        }
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)