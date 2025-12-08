# 🚀 Wellness Store - Setup & Run Guide

## ✅ What Was Built

### 1. **Backend (Express + MongoDB)** ✓
- Express.js server with MongoDB/Mongoose
- Authentication with JWT + Refresh tokens
- Product management API
- Order management API
- Seed data script with 12 sample wellness products
- CORS configured for frontend

### 2. **Frontend (React 19 + Vite)** ✓
- React 19 with React Compiler
- Redux Toolkit for state management
- TanStack Query for data fetching
- React Router v7 for routing
- TailwindCSS 4 for styling
- Dynamic product loading from API
- Working authentication (Login/Register)

---

## 📋 Prerequisites

1. **Node.js** (v18 or higher)
2. **MongoDB** (local or MongoDB Atlas)
3. **npm** or **yarn**

---

## 🛠️ Setup Instructions

### Step 1: Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### Step 2: Configure Environment Variables

**Create `server/.env` file:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wellness-store
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_EXPIRES_IN=2h
JWT_REFRESH_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**Create `client/.env` file:**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Step 3: Seed Sample Data

This will create 12 wellness products and 3 test users in your database:

```bash
cd server
npm run seed
```

**Test Credentials Created:**
- **Admin**: `admin@wellness.com` / `Admin123!`
- **User**: `john@example.com` / `User123!`
- **User**: `jane@example.com` / `User123!`

### Step 4: Start the Backend

```bash
cd server
npm run dev
```

Server will run on `http://localhost:5000`

### Step 5: Start the Frontend

```bash
cd client
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## 🎉 You're Ready!

Open your browser and navigate to:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

---

## 🧪 Test the Features

### 1. **View Products**
- Open http://localhost:5173
- You should see 12 wellness products loaded dynamically
- Products show: image, name, price, ratings, stock

### 2. **Test Authentication**
- Click "Login" in the navigation
- Use credentials: `admin@wellness.com` / `Admin123!`
- You'll be redirected to home page
- Toast notification shows "Login successful!"

### 3. **Register New User**
- Click "Sign up" on login page
- Fill in the form
- New user will be created and auto-logged in

### 4. **Add to Cart**
- Click "Add to Cart" on any product
- Toast notification confirms item added
- Cart state managed in Redux

---

## 📦 Sample Products Seeded

12 wellness products including:
1. Organic Green Tea Extract - $29.99
2. Vitamin D3 5000 IU - $19.99
3. Omega-3 Fish Oil - $24.99
4. Probiotic Complex - $34.99
5. Turmeric Curcumin - $22.99
6. Magnesium Glycinate - $18.99
7. Collagen Peptides - $39.99
8. Ashwagandha Root Extract - $26.99
9. Multivitamin Complete - $32.99
10. B-Complex Vitamins - $16.99
11. Zinc Immune Support - $14.99
12. CoQ10 Ubiquinol - $44.99

---

## 🔧 API Endpoints Available

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user (protected)
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products (with pagination, search, filter)
- `GET /api/products/:id` - Get single product
- Query params: `?page=1&limit=12&category=supplements&search=vitamin`

### Orders
- `GET /api/orders` - Get all orders (protected)
- `POST /api/orders` - Create order (protected)
- `GET /api/orders/:id` - Get single order (protected)

---

## 🎯 What's Working

✅ **Backend:**
- Express server running
- MongoDB connected
- JWT authentication working
- Product API with pagination/search
- Seed data script ready
- CORS configured

✅ **Frontend:**
- React 19 app running
- TailwindCSS 4 styling
- Dynamic product loading
- Login/Register pages working
- Redux state management
- Toast notifications
- Add to cart functionality
- Skeleton loading states

---

## 🐛 Troubleshooting

### MongoDB Connection Error
Make sure MongoDB is running:
```bash
# Start MongoDB locally
mongod

# Or use MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wellness-store
```

### CORS Errors
Make sure `CLIENT_URL` in server `.env` matches your frontend URL (default: http://localhost:5173)

### Port Already in Use
Change the port in `.env` files if needed

---

## 📝 Next Steps

### Features to Build:
1. Product detail page with full information
2. Category filtering
3. Shopping cart page
4. Checkout flow
5. User account dashboard
6. Order history
7. Wishlist functionality
8. Product reviews
9. Admin dashboard

### Backend Enhancements:
1. Add category model and endpoints
2. Add order items normalization
3. Add cart persistence API
4. Add wishlist API
5. Add Cloudinary integration
6. Add email verification
7. Add password reset

---

## 🎉 Success!

Your wellness e-commerce store is now running with:
- ✅ 12 sample products
- ✅ Working authentication
- ✅ Dynamic product loading
- ✅ Add to cart functionality
- ✅ Professional UI with TailwindCSS 4
- ✅ Modern React 19 features

**Happy coding! 🚀**

