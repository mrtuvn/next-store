const Product = require('../models/Product')

// @desc GET ALL
// @route GET /api/products
// @access public
exports.getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const category = req.query.category; // Fixed typo from 'catgory'
        const search = req.query.search;
        const priceRange = req.query.priceRange;
        const sortBy = req.query.sortBy;

        let query = {};

        // Category filter
        if (category) {
            query.category = category;
        }

        // Search filter
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Price range filter
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(p => p ? parseFloat(p) : null);
            if (min !== null && max !== null) {
                query.price = { $gte: min, $lte: max };
            } else if (min !== null) {
                query.price = { $gte: min };
            } else if (max !== null) {
                query.price = { $lte: max };
            }
        }

        // Sorting
        let sortOptions = { createdAt: -1 }; // Default sort
        if (sortBy) {
            switch (sortBy) {
                case 'price-asc':
                    sortOptions = { price: 1 };
                    break;
                case 'price-desc':
                    sortOptions = { price: -1 };
                    break;
                case 'name-asc':
                    sortOptions = { name: 1 };
                    break;
                case 'name-desc':
                    sortOptions = { name: -1 };
                    break;
                case 'rating':
                    sortOptions = { 'ratings.average': -1 };
                    break;
                default:
                    sortOptions = { createdAt: -1 };
            }
        }

        const products = await Product.find(query)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort(sortOptions);

        const total = await Product.countDocuments(query);

        res.json({
            success: true,
            data: products,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalProducts: total
            }
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching products'
        });
    }
}

//@desc Get single product
//@route GET /api/products/:id
//@access PUBLIC

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }

        res.json({
            success: true,
            data: product
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server get error '
        })
    }
}