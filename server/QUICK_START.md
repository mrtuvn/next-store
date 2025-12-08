# Quick Start Guide - Database Setup

## 🚀 Get Your Server Running in 5 Minutes

### Step 1: Create .env File

Create a file named `.env` in the `server` folder with these minimum required variables:

```env
# Required
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wellness-store
JWT_SECRET=my-secret-key-change-this-in-production-123456789
JWT_REFRESH_SECRET=my-refresh-secret-key-change-this-too-987654321

# Optional but recommended
JWT_EXPIRE=2h
JWT_REFRESH_EXPIRE=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Step 2: Choose Your Database Option

#### Option A: Local MongoDB (Fastest)

1. **Check if MongoDB is installed:**
   ```powershell
   mongosh --version
   ```

2. **If not installed, download MongoDB:**
   - Go to: https://www.mongodb.com/try/download/community
   - Download MongoDB Community Server for Windows
   - Run installer (use default settings)
   - MongoDB will start automatically as a Windows service

3. **Verify MongoDB is running:**
   ```powershell
   Get-Service -Name MongoDB
   ```
   Should show "Running"

4. **Your .env is already configured for local MongoDB!**
   ```env
   MONGODB_URI=mongodb://localhost:27017/wellness-store
   ```

#### Option B: MongoDB Atlas (Cloud - 5 minutes setup)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up (free tier - no credit card needed)
3. Create a FREE cluster (M0)
4. Add Database User:
   - Username: `wellness_user`
   - Password: `Wellness123!` (or your choice)
5. Whitelist IP: Click "Allow Access from Anywhere" (for development)
6. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
7. Update your .env:
   ```env
   MONGODB_URI=mongodb+srv://wellness_user:Wellness123!@cluster0.xxxxx.mongodb.net/wellness-store?retryWrites=true&w=majority
   ```

### Step 3: Install Dependencies (if not done)

```bash
cd server
npm install
```

### Step 4: Test Database Connection

```bash
npm start
```

**Expected Output:**
```
✅ MongoDB Connected: localhost
📦 Database: wellness-store
🔗 Mongoose connected to MongoDB
Server running on port 5000
```

If you see these ✅ messages, your database is connected!

### Step 5: Seed the Database

```bash
npm run seed
```

**Expected Output:**
```
✅ MongoDB Connected: localhost
📦 Database: wellness-store
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

### Step 6: Start Development Server

```bash
npm run dev
```

This will start the server with `nodemon` (auto-restart on file changes).

---

## ✅ Verification Checklist

- [ ] `.env` file created in `server` folder
- [ ] MongoDB is running (local) or Atlas cluster is created (cloud)
- [ ] `MONGODB_URI` is set in `.env`
- [ ] `JWT_SECRET` and `JWT_REFRESH_SECRET` are set in `.env`
- [ ] `npm install` completed successfully
- [ ] `npm start` shows MongoDB connected
- [ ] `npm run seed` creates sample data
- [ ] Server is running on http://localhost:5000

---

## 🐛 Troubleshooting

### Error: "ECONNREFUSED 127.0.0.1:27017"
**Solution:** MongoDB is not running
```powershell
Start-Service -Name MongoDB
```

### Error: "MongooseServerSelectionError: connect ETIMEDOUT"
**Solution (Atlas):** 
- Check your IP is whitelisted in Atlas
- Verify username/password in connection string
- Check if password has special characters (encode them)

### Error: "Authentication failed"
**Solution:**
- For local: Remove username/password from MONGODB_URI
- For Atlas: Verify credentials in Atlas dashboard

### MongoDB not installed?
Download from: https://www.mongodb.com/try/download/community

### Need help?
Check `DATABASE_SETUP.md` for detailed setup instructions.

---

## 📝 NPM Scripts Reference

```bash
npm start          # Start server (production mode)
npm run dev        # Start server with nodemon (development)
npm run seed       # Seed database with sample data
```

---

## 🎯 Next Steps

Once your server is running:

1. ✅ Test API endpoints: http://localhost:5000/api/products
2. ✅ Start the client: `cd client && npm run dev`
3. ✅ Test login with: `admin@wellness.com` / `Admin123!`
4. ✅ Browse products in the UI
5. ✅ Add products to cart
6. ✅ Start building new features!

---

**Need the full setup guide?** See `DATABASE_SETUP.md`

**Last Updated:** December 8, 2025

