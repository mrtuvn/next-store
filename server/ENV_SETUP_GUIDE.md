# .env File Setup Guide

## ❌ Error You're Seeing

```
MongoDB connection error: The `uri` parameter to `openUri()` must be a string, got "undefined"
```

## 🔍 Root Cause

The `.env` file is missing from your `server` folder. This file contains your environment variables like `MONGODB_URI`, `JWT_SECRET`, etc.

---

## ✅ Solution: Create .env File

### Option 1: Automatic Setup (Recommended)

Run this command in your `server` folder:

```bash
npm run setup-env
```

This will automatically create a `.env` file with:
- ✅ Default MongoDB connection (local)
- ✅ Auto-generated JWT secrets
- ✅ All required variables
- ✅ Proper formatting

---

### Option 2: Manual Setup

Create a file named `.env` in your `server` folder with this content:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration (choose one)
MONGODB_URI=mongodb://localhost:27017/wellness-store

# JWT Configuration
JWT_SECRET=your-secret-key-change-this-123456789
JWT_REFRESH_SECRET=your-refresh-secret-change-this-987654321
JWT_EXPIRE=2h
JWT_REFRESH_EXPIRE=7d

# Client URL for CORS
CLIENT_URL=http://localhost:5173
```

---

## 📍 File Location

The `.env` file should be here:
```
wellness-store/
├── client/
└── server/
    ├── .env          ← CREATE THIS FILE HERE
    ├── server.js
    ├── package.json
    └── ...
```

---

## 🗄️ MongoDB Setup

### Using Local MongoDB

1. **Check if MongoDB is installed:**
   ```powershell
   mongosh --version
   ```

2. **Check if MongoDB is running:**
   ```powershell
   Get-Service -Name MongoDB
   ```

3. **Start MongoDB if not running:**
   ```powershell
   Start-Service -Name MongoDB
   ```

4. **Your .env should have:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/wellness-store
   ```

### Using MongoDB Atlas (Cloud)

1. **Get connection string from Atlas:**
   - Login to MongoDB Atlas
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

2. **Update your .env:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/wellness-store?retryWrites=true&w=majority
   ```
   
   Replace:
   - `username` with your database user
   - `password` with your database password
   - `cluster0.xxxxx` with your cluster address

---

## 🧪 Test Your Setup

### Step 1: Create .env file
```bash
cd server
npm run setup-env
```

### Step 2: Verify MongoDB is running
```powershell
# For local MongoDB
Get-Service -Name MongoDB

# Should show "Running"
```

### Step 3: Start the server
```bash
npm start
```

**Expected Output:**
```
⚠️  MONGODB_URI not found in .env file, using default: mongodb://localhost:27017/wellness-store
✅ MongoDB Connected: localhost
📦 Database: wellness-store
🔗 Mongoose connected to MongoDB
Server running on port 5000
```

**Note:** If you see the warning, it means `.env` wasn't found, but it will use the default local MongoDB.

### Step 4: Seed the database
```bash
npm run seed
```

---

## 🔒 Security Notes

### Development (.env for local):
```env
MONGODB_URI=mongodb://localhost:27017/wellness-store
JWT_SECRET=simple-secret-for-dev
JWT_REFRESH_SECRET=simple-refresh-secret-for-dev
```

### Production (.env for production):
```env
MONGODB_URI=mongodb+srv://prod_user:STRONG_PASSWORD@cluster.mongodb.net/wellness-store
JWT_SECRET=use-a-very-long-random-string-at-least-32-characters-long
JWT_REFRESH_SECRET=another-very-long-random-string-at-least-32-characters
```

**Generate secure secrets:**
```bash
# In Node.js console
require('crypto').randomBytes(32).toString('hex')
```

---

## 🐛 Troubleshooting

### Error: "MONGODB_URI is undefined"
**Solution:** Create `.env` file with `MONGODB_URI`
```bash
npm run setup-env
```

### Error: "connect ECONNREFUSED 127.0.0.1:27017"
**Solution:** MongoDB is not running
```powershell
Start-Service -Name MongoDB
```

### Error: "Authentication failed"
**Solution:** Check your MongoDB Atlas credentials
- Verify username/password in connection string
- Ensure user has proper permissions in Atlas

### MongoDB not installed?
**Download:** https://www.mongodb.com/try/download/community

### Warning: "MONGODB_URI not found"
**Solution:** This is OK for development, but better to create `.env`:
```bash
npm run setup-env
```

---

## 📋 Complete .env Template

```env
# ================================
# SERVER CONFIGURATION
# ================================
PORT=5000
NODE_ENV=development

# ================================
# DATABASE CONFIGURATION
# ================================
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/wellness-store

# OR MongoDB Atlas (uncomment to use)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wellness-store?retryWrites=true&w=majority

# ================================
# JWT CONFIGURATION
# ================================
JWT_SECRET=your-secret-key-change-in-production
JWT_REFRESH_SECRET=your-refresh-secret-change-in-production
JWT_EXPIRE=2h
JWT_REFRESH_EXPIRE=7d

# ================================
# CLIENT CONFIGURATION
# ================================
CLIENT_URL=http://localhost:5173

# ================================
# CLOUDINARY (Optional)
# ================================
# CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret
```

---

## ✅ Quick Start Commands

```bash
# 1. Create .env file
npm run setup-env

# 2. Install dependencies (if not done)
npm install

# 3. Start MongoDB (Windows)
Start-Service -Name MongoDB

# 4. Start server
npm start

# 5. Seed database (optional)
npm run seed
```

---

## 📝 Environment Variables Explained

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `PORT` | No | Server port | `5000` |
| `MONGODB_URI` | Yes | MongoDB connection string | `mongodb://localhost:27017/wellness-store` |
| `JWT_SECRET` | Yes | Secret for access tokens | None |
| `JWT_REFRESH_SECRET` | Yes | Secret for refresh tokens | None |
| `JWT_EXPIRE` | No | Access token expiration | `2h` |
| `JWT_REFRESH_EXPIRE` | No | Refresh token expiration | `7d` |
| `CLIENT_URL` | No | Frontend URL for CORS | `http://localhost:5173` |
| `NODE_ENV` | No | Environment mode | `development` |

---

## 🎯 Summary

**The Problem:**
- Missing `.env` file caused `MONGODB_URI` to be undefined

**The Solution:**
1. Run `npm run setup-env` to create `.env` file
2. Ensure MongoDB is running
3. Start server with `npm start`

**Result:**
- ✅ Server connects to MongoDB
- ✅ Environment variables loaded
- ✅ Ready to develop!

---

**Last Updated:** December 8, 2025  
**Status:** ✅ Ready to Use

