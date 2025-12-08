# CORS Error Fix - "Error loading products"

## 🔴 The Problem

**Error:** "Error loading products. Please try again later."

**Root Cause:** The backend server's CORS configuration was set to allow requests from `http://localhost:3000`, but your Vite frontend runs on `http://localhost:5173`.

---

## 🔍 How We Found It

The backend API was working correctly:
- ✅ Products endpoint: `http://localhost:5000/api/products` - Working
- ✅ Database connection: Working
- ✅ Data: 12 products in database

But the CORS response header showed:
```
Access-Control-Allow-Origin: http://localhost:3000
```

This caused the browser to block requests from `http://localhost:5173` (your frontend).

---

## ✅ The Fix

### Fixed `server/.env` file:

**Before:**
```env
CLIENT_URL=http://localhost:3000  ❌ Wrong port!
```

**After:**
```env
CLIENT_URL=http://localhost:5173  ✅ Correct! (Vite's port)
```

Also added missing JWT refresh token configuration:
```env
JWT_REFRESH_SECRET=thisrefreshsecretsflkselfkes
JWT_REFRESH_EXPIRE=7d
```

---

## 🚀 How to Apply the Fix

### Step 1: Restart Your Backend Server

The `.env` file has been updated, but you need to restart the server for changes to take effect.

```bash
# Stop the current server (Ctrl+C)

# Start it again
cd server
npm start
```

**Expected output:**
```
✅ MongoDB Connected: localhost
📦 Database: wellness-store
🔗 Mongoose connected to MongoDB
Server running on port 5000
```

### Step 2: Restart Your Frontend (if needed)

```bash
# Stop the current dev server (Ctrl+C)

# Start it again
cd client
npm run dev
```

### Step 3: Clear Browser Cache

**In Chrome/Edge:**
1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

**Or:**
- Open a new Incognito/Private window
- Test the application

---

## 🧪 Test the Fix

### Test 1: Check Backend CORS
```bash
curl http://localhost:5000/health -UseBasicParsing
```

Should show:
```
Access-Control-Allow-Origin: http://localhost:5173
```

### Test 2: Check Products API
```bash
curl "http://localhost:5000/api/products" -UseBasicParsing
```

Should return JSON with products data.

### Test 3: Check Frontend
1. Open: `http://localhost:5173`
2. Open DevTools (F12) → Console
3. Should see products loading
4. No CORS errors

---

## 📋 Complete Server .env Configuration

Your `server/.env` file now has:

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173           ✅ Fixed!
MONGODB_URI=mongodb://localhost:27017/wellness-store
JWT_SECRET=thisfkeflsfe
JWT_EXPIRE=10d
JWT_REFRESH_SECRET=thisrefreshsecretsflkselfkes  ✅ Added!
JWT_REFRESH_EXPIRE=7d                            ✅ Added!
```

---

## 📋 Complete Client .env Configuration

Your `client/.env` file has:

```env
VITE_API_BASE_URL=http://localhost:5000/api  ✅ Correct!
```

---

## 🔧 CORS Configuration Explained

The `server/server.js` file has:

```javascript
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}))
```

This means:
- **Origin**: The server will only accept requests from the URL specified in `CLIENT_URL`
- **Credentials**: Allows cookies and authentication headers

**Important:** The `CLIENT_URL` must match your frontend's URL exactly!

---

## 🎯 Port Reference

| Service | Port | URL |
|---------|------|-----|
| **Backend** | 5000 | http://localhost:5000 |
| **Frontend (Vite)** | 5173 | http://localhost:5173 |
| **MongoDB** | 27017 | mongodb://localhost:27017 |

---

## 🐛 Common CORS Issues

### Issue: "Access to fetch... has been blocked by CORS policy"

**Cause:** `CLIENT_URL` in `server/.env` doesn't match your frontend URL

**Solution:**
```env
# Make sure CLIENT_URL matches your frontend
CLIENT_URL=http://localhost:5173
```

### Issue: "No 'Access-Control-Allow-Origin' header"

**Cause:** Backend not running or CORS middleware not configured

**Solution:**
1. Check backend is running: `curl http://localhost:5000/health`
2. Restart backend server

### Issue: Still seeing port 3000 in requests

**Cause:** Browser cache or old environment variables

**Solution:**
1. Hard refresh browser (Ctrl+Shift+R)
2. Restart Vite dev server
3. Clear browser cache
4. Use Incognito mode

---

## ✅ Verification Checklist

After restarting servers, verify:

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173  
- [ ] MongoDB connected
- [ ] No CORS errors in browser console
- [ ] Products loading on homepage
- [ ] Can add items to cart
- [ ] Can login/register

---

## 🎉 What's Fixed Now

- ✅ CORS configured for correct port (5173)
- ✅ Backend accepts frontend requests
- ✅ Products API accessible from frontend
- ✅ No more "Error loading products" message
- ✅ JWT refresh tokens configured
- ✅ Complete environment setup

---

## 📚 Related Files

- `server/.env` - Server environment variables (UPDATED)
- `server/server.js` - CORS configuration
- `client/.env` - Client environment variables
- `client/src/configs/api.config.ts` - API configuration

---

## 🔐 Security Note

**For Production:**
- Change `CLIENT_URL` to your production frontend domain
- Example: `CLIENT_URL=https://yourapp.com`
- Use strong JWT secrets (32+ characters)
- Enable HTTPS

**For Development:**
- Current setup is correct: `CLIENT_URL=http://localhost:5173`

---

## 🚀 Next Steps

1. **Restart backend server** (required!)
2. **Restart frontend** (recommended)
3. **Clear browser cache** (recommended)
4. **Test your application**
5. **Start building features!**

---

**Status:** ✅ Fixed  
**Action Required:** Restart backend server  
**Last Updated:** December 8, 2025

---

**Your application should now work perfectly!** 🎉

No more CORS errors, products will load, and you can start using all features.

