# API Endpoints Documentation

Base URL: `/api/v1`

---

## 🔐 Authentication & Authorization

### Register
```
POST /auth/register
Content-Type: application/json

Body:
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
}

Response: 201 Created
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "status": "unverified"
  },
  "message": "Registration successful. Please verify your email."
}
```

### Login (Email/Password)
```
POST /auth/login
Content-Type: application/json

Body:
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "admin",
    "status": "active"
  },
  "expires_in": 7200
}
```

### OAuth Google
```
GET /auth/google
→ Redirects to Google OAuth consent screen

GET /auth/google/callback
→ Handles OAuth callback and returns tokens
```

### Refresh Token
```
POST /auth/refresh
Content-Type: application/json

Body:
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Response: 200 OK
{
  "access_token": "new_access_token",
  "refresh_token": "new_refresh_token",
  "expires_in": 7200
}
```

### Logout
```
POST /auth/logout
Authorization: Bearer {access_token}

Response: 200 OK
{
  "message": "Logged out successfully"
}
```

---

## 👤 User Profile Management

### Get Current User Profile
```
GET /users/profile
Authorization: Bearer {access_token}

Response: 200 OK
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "admin",
  "status": "active",
  "joined_date": "2024-01-15T10:30:00Z",
  "avatar": "https://cloudinary.com/avatar.jpg"
}
```

### Update User Profile
```
PATCH /users/profile
Authorization: Bearer {access_token}
Content-Type: application/json

Body:
{
  "name": "John Updated",
  "avatar": "base64_or_url"
}

Response: 200 OK
{
  "id": "uuid",
  "name": "John Updated",
  "avatar": "https://cloudinary.com/new_avatar.jpg",
  "updated_at": "2024-01-20T14:30:00Z"
}
```

### Change Password
```
POST /users/change-password
Authorization: Bearer {access_token}
Content-Type: application/json

Body:
{
  "current_password": "OldPass123!",
  "new_password": "NewSecurePass456!"
}

Response: 200 OK
{
  "message": "Password changed successfully"
}
```

### Get User Theme Preference
```
GET /users/theme
Authorization: Bearer {access_token}

Response: 200 OK
{
  "theme": "dark"
}
```

### Update Theme Preference
```
PATCH /users/theme
Authorization: Bearer {access_token}
Content-Type: application/json

Body:
{
  "theme": "light"
}

Response: 200 OK
{
  "theme": "light"
}
```

---

## 📦 Products Management

### Get All Products
```
GET /products?page=1&limit=20&category=electronics&search=phone&sort=price:asc
Authorization: Bearer {access_token}

Response: 200 OK
{
  "data": [
    {
      "id": "uuid",
      "product_name": "iPhone 15 Pro",
      "category": {
        "id": "uuid",
        "name": "Electronics"
      },
      "price": 999.99,
      "description": "Latest iPhone model",
      "variants": [
        {
          "sku": "IP15-PRO-256-BLK",
          "size": "256GB",
          "color": "Black",
          "stock": 50
        }
      ],
      "attributes": {
        "brand": "Apple",
        "warranty": "1 year"
      },
      "images": [
        "https://cloudinary.com/image1.jpg",
        "https://cloudinary.com/image2.jpg"
      ],
      "created_at": "2024-01-15T10:00:00Z",
      "updated_at": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### Get Single Product
```
GET /products/:id
Authorization: Bearer {access_token}

Response: 200 OK
{
  "id": "uuid",
  "product_name": "iPhone 15 Pro",
  "category": {...},
  "price": 999.99,
  "description": "Latest iPhone model",
  "variants": [...],
  "attributes": {...},
  "images": [...]
}
```

### Create Product
```
POST /products
Authorization: Bearer {access_token}
Content-Type: application/json

Body:
{
  "product_name": "Samsung Galaxy S24",
  "category_id": "uuid",
  "price": 899.99,
  "description": "Latest Samsung flagship",
  "variants": [
    {
      "sku": "SGS24-128-BLK",
      "size": "128GB",
      "color": "Black",
      "stock": 30
    }
  ],
  "attributes": {
    "brand": "Samsung",
    "warranty": "2 years"
  },
  "images": ["image_id_1", "image_id_2"]
}

Response: 201 Created
{
  "id": "uuid",
  "product_name": "Samsung Galaxy S24",
  "message": "Product created successfully"
}
```

### Update Product
```
PATCH /products/:id
Authorization: Bearer {access_token}
Content-Type: application/json

Body:
{
  "price": 849.99,
  "description": "Updated description"
}

Response: 200 OK
{
  "id": "uuid",
  "message": "Product updated successfully"
}
```

### Delete Product
```
DELETE /products/:id
Authorization: Bearer {access_token}

Response: 200 OK
{
  "message": "Product deleted successfully"
}
```

---

## 🏷️ Categories Management

### Get All Categories
```
GET /categories
Authorization: Bearer {access_token}

Response: 200 OK
{
  "data": [
    {
      "id": "uuid",
      "name": "Electronics",
      "slug": "electronics",
      "description": "Electronic devices and accessories",
      "parent_id": null,
      "product_count": 150,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Get Single Category
```
GET /categories/:id
Authorization: Bearer {access_token}

Response: 200 OK
{
  "id": "uuid",
  "name": "Electronics",
  "slug": "electronics",
  "description": "Electronic devices",
  "products": [...]
}
```

### Create Category
```
POST /categories
Authorization: Bearer {access_token}
Content-Type: application/json

Body:
{
  "name": "Home Appliances",
  "description": "Kitchen and home appliances",
  "parent_id": null
}

Response: 201 Created
{
  "id": "uuid",
  "name": "Home Appliances",
  "slug": "home-appliances"
}
```

### Update Category
```
PATCH /categories/:id
Authorization: Bearer {access_token}
Content-Type: application/json

Body:
{
  "name": "Updated Category Name",
  "description": "Updated description"
}

Response: 200 OK
{
  "id": "uuid",
  "message": "Category updated successfully"
}
```

### Delete Category
```
DELETE /categories/:id
Authorization: Bearer {access_token}

Response: 200 OK
{
  "message": "Category deleted successfully"
}
```

---

## 👥 Customers Management

### Get All Customers
```
GET /customers?page=1&limit=20&search=john
Authorization: Bearer {access_token}

Response: 200 OK
{
  "data": [
    {
      "id": "uuid",
      "name": "John Smith",
      "email": "john@example.com",
      "telephone": "+1234567890",
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zip": "10001",
        "country": "USA"
      },
      "total_orders": 5,
      "total_spent": 2499.95,
      "created_at": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 500,
    "totalPages": 25
  }
}
```

### Get Single Customer
```
GET /customers/:id
Authorization: Bearer {access_token}

Response: 200 OK
{
  "id": "uuid",
  "name": "John Smith",
  "email": "john@example.com",
  "telephone": "+1234567890",
  "address": {...},
  "orders": [
    {
      "id": "order_uuid",
      "increment_id": "ORD-2024-00001",
      "total": 999.99,
      "status": "completed",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ],
  "stats": {
    "total_orders": 5,
    "total_spent": 2499.95,
    "average_order": 499.99
  }
}
```

### Create Customer
```
POST /customers
Authorization: Bearer {access_token}
Content-Type: application/json

Body:
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "telephone": "+1234567890",
  "address": {
    "street": "456 Oak Ave",
    "city": "Los Angeles",
    "state": "CA",
    "zip": "90001",
    "country": "USA"
  }
}

Response: 201 Created
{
  "id": "uuid",
  "name": "Jane Doe",
  "message": "Customer created successfully"
}
```

### Update Customer
```
PATCH /customers/:id
Authorization: Bearer {access_token}
Content-Type: application/json

Body:
{
  "telephone": "+0987654321",
  "address": {...}
}

Response: 200 OK
{
  "id": "uuid",
  "message": "Customer updated successfully"
}
```

### Delete Customer
```
DELETE /customers/:id
Authorization: Bearer {access_token}

Response: 200 OK
{
  "message": "Customer deleted successfully"
}
```

---

## 📋 Orders Management

### Get All Orders
```
GET /orders?page=1&limit=20&status=pending&customer_id=uuid&date_from=2024-01-01&date_to=2024-12-31
Authorization: Bearer {access_token}

Response: 200 OK
{
  "data": [
    {
      "id": "uuid",
      "increment_id": "ORD-2024-00001",
      "customer": {
        "id": "uuid",
        "name": "John Smith",
        "email": "john@example.com"
      },
      "items": [
        {
          "product_id": "uuid",
          "product_name": "iPhone 15 Pro",
          "quantity": 1,
          "price": 999.99,
          "subtotal": 999.99
        }
      ],
      "subtotal": 999.99,
      "tax": 79.99,
      "shipping": 20.00,
      "total": 1099.98,
      "status": "pending",
      "payment_status": "unpaid",
      "shipping_address": {...},
      "created_at": "2024-01-15T10:00:00Z",
      "updated_at": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1000,
    "totalPages": 50
  }
}
```

### Get Single Order
```
GET /orders/:id
Authorization: Bearer {access_token}

Response: 200 OK
{
  "id": "uuid",
  "increment_id": "ORD-2024-00001",
  "customer": {...},
  "items": [...],
  "subtotal": 999.99,
  "tax": 79.99,
  "shipping": 20.00,
  "total": 1099.98,
  "status": "pending",
  "payment_status": "paid",
  "shipping_address": {...},
  "billing_address": {...},
  "notes": "Customer requested gift wrap",
  "status_history": [
    {
      "status": "pending",
      "timestamp": "2024-01-15T10:00:00Z",
      "note": "Order placed"
    }
  ],
  "created_at": "2024-01-15T10:00:00Z"
}
```

### Create Order
```
POST /orders
Authorization: Bearer {access_token}
Content-Type: application/json

Body:
{
  "customer_id": "uuid",
  "items": [
    {
      "product_id": "uuid",
      "variant_id": "uuid",
      "quantity": 2,
      "price": 999.99
    }
  ],
  "shipping_address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "USA"
  },
  "billing_address": {...},
  "notes": "Customer notes"
}

Response: 201 Created
{
  "id": "uuid",
  "increment_id": "ORD-2024-00001",
  "total": 2079.98,
  "message": "Order created successfully"
}
```

### Update Order Status
```
PATCH /orders/:id/status
Authorization: Bearer {access_token}
Content-Type: application/json

Body:
{
  "status": "processing",
  "note": "Payment confirmed, processing order"
}

Response: 200 OK
{
  "id": "uuid",
  "status": "processing",
  "message": "Order status updated successfully"
}
```

### Update Order
```
PATCH /orders/:id
Authorization: Bearer {access_token}
Content-Type: application/json

Body:
{
  "shipping_address": {...},
  "notes": "Updated notes"
}

Response: 200 OK
{
  "id": "uuid",
  "message": "Order updated successfully"
}
```

### Cancel Order
```
POST /orders/:id/cancel
Authorization: Bearer {access_token}
Content-Type: application/json

Body:
{
  "reason": "Customer requested cancellation"
}

Response: 200 OK
{
  "id": "uuid",
  "status": "cancelled",
  "message": "Order cancelled successfully"
}
```

### Delete Order
```
DELETE /orders/:id
Authorization: Bearer {access_token}

Response: 200 OK
{
  "message": "Order deleted successfully"
}
```

---

## 🖼️ Image Upload (Cloudinary)

### Upload Product Image
```
POST /upload/product-image
Authorization: Bearer {access_token}
Content-Type: multipart/form-data

Body:
{
  "image": <file>
}

Response: 201 Created
{
  "id": "image_uuid",
  "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/products/image.jpg",
  "public_id": "products/image_uuid",
  "format": "jpg",
  "width": 1920,
  "height": 1080,
  "size": 245678
}
```

### Delete Image
```
DELETE /upload/:public_id
Authorization: Bearer {access_token}

Response: 200 OK
{
  "message": "Image deleted successfully"
}
```

---

## 📊 Dashboard Statistics (Optional)

### Get Dashboard Stats
```
GET /dashboard/stats
Authorization: Bearer {access_token}

Response: 200 OK
{
  "total_products": 150,
  "total_orders": 1000,
  "total_customers": 500,
  "total_revenue": 125000.00,
  "pending_orders": 25,
  "recent_orders": [...],
  "top_products": [...],
  "revenue_chart": [
    {
      "date": "2024-01-15",
      "revenue": 5000.00
    }
  ]
}
```

---

## 🔒 Admin User Management (Optional)

### Get All Users (Admin Only)
```
GET /admin/users?page=1&limit=20&role=admin&status=active
Authorization: Bearer {admin_access_token}

Response: 200 OK
{
  "data": [
    {
      "id": "uuid",
      "email": "admin@example.com",
      "name": "Admin User",
      "role": "admin",
      "status": "active",
      "joined_date": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Update User Role/Status
```
PATCH /admin/users/:id
Authorization: Bearer {admin_access_token}
Content-Type: application/json

Body:
{
  "role": "moderator",
  "status": "active"
}

Response: 200 OK
{
  "id": "uuid",
  "role": "moderator",
  "status": "active"
}
```

---

## 🔔 Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `204 No Content` - Request successful, no content to return
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Missing or invalid authentication
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource already exists
- `422 Unprocessable Entity` - Validation error
- `500 Internal Server Error` - Server error

---

## 🔐 Authorization Roles

- `user` - Basic authenticated user
- `moderator` - Can manage products and categories
- `admin` - Full access to all resources
- `super_admin` - System-level access

---

## 📝 Notes

- All endpoints require `Authorization: Bearer {access_token}` except registration and login
- All POST/PATCH requests require `Content-Type: application/json`
- Pagination is available on list endpoints using `?page=1&limit=20`
- Timestamps are in ISO 8601 format (UTC)
- File uploads use `multipart/form-data`
- Token expiry is 2 hours (7200 seconds)

