const fs = require('fs');
const path = require('path');

const envContent = `# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
# Local MongoDB (default)
MONGODB_URI=mongodb://localhost:27017/wellness-store

# MongoDB Atlas (uncomment and use this for cloud database)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wellness-store?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=wellness-store-secret-key-change-this-in-production-${Math.random().toString(36).substring(2, 15)}
JWT_REFRESH_SECRET=wellness-store-refresh-secret-change-this-too-${Math.random().toString(36).substring(2, 15)}
JWT_EXPIRE=2h
JWT_REFRESH_EXPIRE=7d

# Client URL for CORS
CLIENT_URL=http://localhost:5173

# Cloudinary Configuration (Optional - for image uploads)
# CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret
`;

const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists!');
  console.log('📝 Current .env file location:', envPath);
  console.log('');
  console.log('If you want to recreate it, please delete the existing .env file first.');
  process.exit(0);
}

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!');
  console.log('📁 Location:', envPath);
  console.log('');
  console.log('📝 Default configuration:');
  console.log('   - MongoDB: mongodb://localhost:27017/wellness-store');
  console.log('   - Port: 5000');
  console.log('   - JWT secrets: Auto-generated');
  console.log('');
  console.log('⚠️  IMPORTANT:');
  console.log('   1. Make sure MongoDB is running locally');
  console.log('   2. Or update MONGODB_URI in .env for MongoDB Atlas');
  console.log('   3. Change JWT secrets in production!');
  console.log('');
  console.log('✅ Next steps:');
  console.log('   1. Start MongoDB: Get-Service -Name MongoDB');
  console.log('   2. Run: npm start');
  console.log('   3. Seed data: npm run seed');
  console.log('');
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
  console.log('');
  console.log('Please create .env file manually in the server folder with:');
  console.log(envContent);
  process.exit(1);
}

