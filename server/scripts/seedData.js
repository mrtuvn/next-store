const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const User = require('../models/User');
const connectDB = require('../config/database');

dotenv.config();

const sampleProducts = [
  {
    name: 'Organic Green Tea Extract',
    description: 'Premium quality green tea extract rich in antioxidants. Perfect for daily wellness routine.',
    price: 29.99,
    category: 'supplements',
    images: ['https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500'],
    stock: 100,
    ratings: { average: 4.5, count: 24 }
  },
  {
    name: 'Vitamin D3 5000 IU',
    description: 'High potency Vitamin D3 supplement for immune support and bone health.',
    price: 19.99,
    category: 'supplements',
    images: ['https://images.unsplash.com/photo-1550572017-4814c8db3f14?w=500'],
    stock: 150,
    ratings: { average: 4.8, count: 45 }
  },
  {
    name: 'Omega-3 Fish Oil',
    description: 'Pure omega-3 fish oil capsules for heart and brain health.',
    price: 24.99,
    category: 'supplements',
    images: ['https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500'],
    stock: 80,
    ratings: { average: 4.6, count: 32 }
  },
  {
    name: 'Probiotic Complex',
    description: '50 billion CFU probiotic blend for digestive health and immunity.',
    price: 34.99,
    category: 'supplements',
    images: ['https://images.unsplash.com/photo-1550572017-4814c8db3f14?w=500'],
    stock: 60,
    ratings: { average: 4.7, count: 28 }
  },
  {
    name: 'Turmeric Curcumin',
    description: 'Organic turmeric with black pepper extract for maximum absorption.',
    price: 22.99,
    category: 'supplements',
    images: ['https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500'],
    stock: 120,
    ratings: { average: 4.4, count: 19 }
  },
  {
    name: 'Magnesium Glycinate',
    description: 'Highly absorbable magnesium for relaxation and better sleep.',
    price: 18.99,
    category: 'supplements',
    images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500'],
    stock: 90,
    ratings: { average: 4.9, count: 56 }
  },
  {
    name: 'Collagen Peptides',
    description: 'Grass-fed collagen powder for skin, hair, and joint health.',
    price: 39.99,
    category: 'supplements',
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500'],
    stock: 75,
    ratings: { average: 4.6, count: 41 }
  },
  {
    name: 'Ashwagandha Root Extract',
    description: 'Adaptogenic herb for stress relief and energy support.',
    price: 26.99,
    category: 'supplements',
    images: ['https://images.unsplash.com/photo-1620735692909-aa4e7fb05a58?w=500'],
    stock: 85,
    ratings: { average: 4.5, count: 33 }
  },
  {
    name: 'Multivitamin Complete',
    description: 'Comprehensive daily multivitamin with essential nutrients.',
    price: 32.99,
    category: 'supplements',
    images: ['https://images.unsplash.com/photo-1550572017-4814c8db3f14?w=500'],
    stock: 110,
    ratings: { average: 4.7, count: 52 }
  },
  {
    name: 'B-Complex Vitamins',
    description: 'Full spectrum B vitamins for energy and metabolism support.',
    price: 16.99,
    category: 'supplements',
    images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500'],
    stock: 95,
    ratings: { average: 4.6, count: 38 }
  },
  {
    name: 'Zinc Immune Support',
    description: 'High-quality zinc supplement for immune system health.',
    price: 14.99,
    category: 'supplements',
    images: ['https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500'],
    stock: 130,
    ratings: { average: 4.5, count: 27 }
  },
  {
    name: 'CoQ10 Ubiquinol',
    description: 'Active form of CoQ10 for cardiovascular and cellular energy.',
    price: 44.99,
    category: 'supplements',
    images: ['https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500'],
    stock: 55,
    ratings: { average: 4.8, count: 44 }
  }
];

const sampleUsers = [
  {
    user_name: 'Admin User',
    email: 'admin@wellness.com',
    password: 'Admin123!',
    role: 'admin',
    status: 'active',
    telephone: '+1234567890',
    address: '123 Admin St, City, State 12345'
  },
  {
    user_name: 'John Doe',
    email: 'john@example.com',
    password: 'User123!',
    role: 'user',
    status: 'active',
    telephone: '+1234567891',
    address: '456 User Ave, City, State 12345'
  },
  {
    user_name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'User123!',
    role: 'user',
    status: 'active',
    telephone: '+1234567892',
    address: '789 Customer Blvd, City, State 12345'
  }
];

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Product.deleteMany({});
    await User.deleteMany({});

    // Seed Products
    console.log('📦 Seeding products...');
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Created ${products.length} products`);

    // Seed Users (hash passwords first)
    console.log('👤 Seeding users...');
    const usersWithHashedPasswords = await Promise.all(
      sampleUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      }))
    );
    const users = await User.insertMany(usersWithHashedPasswords);
    console.log(`✅ Created ${users.length} users`);

    console.log('\n🎉 Seed data created successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('Admin: admin@wellness.com / Admin123!');
    console.log('User: john@example.com / User123!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

