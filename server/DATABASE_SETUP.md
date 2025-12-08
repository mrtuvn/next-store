# Database Setup Guide

## MongoDB Connection Configuration

### Required Environment Variables

Create a `.env` file in the `server` folder with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/wellness-store

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
JWT_EXPIRE=2h
JWT_REFRESH_SECRET=your_super_secret_refresh_token_key_here
JWT_REFRESH_EXPIRE=7d

# Client URL for CORS
CLIENT_URL=http://localhost:5173

# Cloudinary Configuration (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## MongoDB Setup Options

### Option 1: Local MongoDB (Recommended for Development)

1. **Install MongoDB Community Server**
   - Download from: https://www.mongodb.com/try/download/community
   - Follow installation instructions for Windows

2. **Start MongoDB Service**
   ```powershell
   # Check if MongoDB is running
   Get-Service -Name MongoDB
   
   # Start MongoDB service if not running
   Start-Service -Name MongoDB
   ```

3. **Verify MongoDB is Running**
   ```powershell
   # Connect to MongoDB shell
   mongosh
   
   # In mongosh, check connection
   show dbs
   ```

4. **Configure .env**
   ```env
   MONGODB_URI=mongodb://localhost:27017/wellness-store
   ```

### Option 2: MongoDB Atlas (Cloud Database)

1. **Create MongoDB Atlas Account**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Sign up for free tier (512 MB storage)

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select your region
   - Create cluster (takes 1-3 minutes)

3. **Setup Database Access**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Create username and strong password
   - Set privileges to "Read and write to any database"
   - Click "Add User"

4. **Setup Network Access**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add your specific IP addresses

5. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<database>` with `wellness-store`

6. **Configure .env**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/wellness-store?retryWrites=true&w=majority
   ```

## Database Connection Features

The `server/config/database.js` file includes:

### ✅ Connection Management
- Async/await connection handling
- Detailed connection logging
- Connection host and database name display
- Error handling with process exit on failure

### ✅ Event Listeners
- **connected**: Logs when Mongoose connects to MongoDB
- **error**: Logs connection errors
- **disconnected**: Logs when connection is lost

### ✅ Graceful Shutdown
- Handles SIGINT signal (Ctrl+C)
- Closes database connection properly
- Prevents data corruption

## Testing Your Database Connection

### Method 1: Start the Server
```bash
cd server
npm start
```

**Expected Output:**
```
✅ MongoDB Connected: localhost
📦 Database: wellness-store
🔗 Mongoose connected to MongoDB
Server running on port 5000
```

### Method 2: Run Seed Script
```bash
cd server
node scripts/seedData.js
```

**Expected Output:**
```
✅ MongoDB connected
🗑️  Clearing existing data...
📦 Seeding products...
✅ Created 12 products
👤 Seeding users...
✅ Created 3 users

🎉 Seed data created successfully!

📝 Test Credentials:
Admin: admin@wellness.com / Admin123!
User: john@example.com / User123!
```

## Common Connection Issues

### Issue 1: "MongooseServerSelectionError"
**Problem**: Cannot connect to MongoDB server

**Solutions:**
- Verify MongoDB service is running (for local)
- Check MONGODB_URI in .env file
- For Atlas: Verify IP whitelist includes your IP
- Check firewall settings

### Issue 2: "Authentication failed"
**Problem**: Invalid credentials for MongoDB Atlas

**Solutions:**
- Verify username and password in connection string
- Check password doesn't contain special characters that need encoding
- Ensure user has proper permissions

### Issue 3: "Database not found"
**Problem**: Database doesn't exist yet

**Solution:**
- This is normal! MongoDB creates the database automatically on first write
- Run the seed script to create the database and collections

### Issue 4: "connect ECONNREFUSED 127.0.0.1:27017"
**Problem**: MongoDB is not running on local machine

**Solutions:**
```powershell
# Check MongoDB service status
Get-Service -Name MongoDB

# Start MongoDB service
Start-Service -Name MongoDB

# If service doesn't exist, MongoDB isn't installed
# Download and install from: https://www.mongodb.com/try/download/community
```

## MongoDB Compass (GUI Tool)

For easier database management, use MongoDB Compass:

1. **Download MongoDB Compass**
   - https://www.mongodb.com/try/download/compass

2. **Connect to Your Database**
   - Open Compass
   - Paste your MONGODB_URI connection string
   - Click "Connect"

3. **View Your Data**
   - Browse collections (products, users, orders)
   - Run queries
   - Import/export data
   - Monitor performance

## Database Schema

### Collections Created:
- `products` - Product catalog
- `users` - User accounts
- `orders` - Customer orders
- `carts` (future) - Shopping carts
- `reviews` (future) - Product reviews

## Security Best Practices

### For Development:
1. ✅ Use local MongoDB or free Atlas tier
2. ✅ Keep .env file in .gitignore
3. ✅ Use simple passwords for local development
4. ✅ Allow all IPs for Atlas in development

### For Production:
1. ⚠️ Use strong passwords (16+ characters)
2. ⚠️ Whitelist only necessary IPs
3. ⚠️ Use environment-specific .env files
4. ⚠️ Enable MongoDB Atlas encryption
5. ⚠️ Set up database backups
6. ⚠️ Use secrets management (AWS Secrets Manager, etc.)
7. ⚠️ Rotate JWT secrets regularly
8. ⚠️ Enable audit logging

## Backup and Restore

### Backup Local Database:
```bash
mongodump --db wellness-store --out ./backup
```

### Restore Local Database:
```bash
mongorestore --db wellness-store ./backup/wellness-store
```

### Atlas Backups:
- Automatic backups available in paid tiers
- Manual backups: Use "Export Data" in Atlas UI

## Connection String Format

### Local MongoDB:
```
mongodb://[username:password@]host[:port]/database
```

Example:
```
mongodb://localhost:27017/wellness-store
mongodb://admin:password@localhost:27017/wellness-store
```

### MongoDB Atlas:
```
mongodb+srv://[username:password@]host/database[?options]
```

Example:
```
mongodb+srv://user:pass123@cluster0.abc123.mongodb.net/wellness-store?retryWrites=true&w=majority
```

## Next Steps

1. ✅ Create `.env` file with MONGODB_URI
2. ✅ Install/start MongoDB (local) or setup Atlas (cloud)
3. ✅ Run `npm start` to test connection
4. ✅ Run `node scripts/seedData.js` to populate database
5. ✅ Install MongoDB Compass for database management
6. ✅ Start building your application!

## Support

### MongoDB Documentation:
- https://docs.mongodb.com/
- https://mongoosejs.com/docs/

### Troubleshooting:
- MongoDB Atlas Support: https://support.mongodb.com/
- Mongoose GitHub: https://github.com/Automattic/mongoose/issues

---

**Last Updated**: December 8, 2025  
**MongoDB Version**: 6.0+  
**Mongoose Version**: 8.0+

