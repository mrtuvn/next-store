# Filter & Pagination UI Structure

## Visual Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                     WELLNESS STORE HEADER                        │
│                  (Your trusted source...)                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  🔍  [Search for products...]                    [Search Button] │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  Category ▼          Price Range ▼        Sort By ▼  [Clear]    │
│  All Categories      All Prices           Default               │
│                                                                  │
│  Active filters: [Supplements ×] [$20-$40 ×] [Price: Low ×]     │
└─────────────────────────────────────────────────────────────────┘

┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│  [IMG]   │  │  [IMG]   │  │  [IMG]   │  │  [IMG]   │
│ Product1 │  │ Product2 │  │ Product3 │  │ Product4 │
│ $29.99   │  │ $24.99   │  │ $19.99   │  │ $34.99   │
│ ★★★★☆    │  │ ★★★★★    │  │ ★★★☆☆    │  │ ★★★★☆    │
│ [Add]    │  │ [Add]    │  │ [Add]    │  │ [Add]    │
└──────────┘  └──────────┘  └──────────┘  └──────────┘

┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│  [IMG]   │  │  [IMG]   │  │  [IMG]   │  │  [IMG]   │
│ Product5 │  │ Product6 │  │ Product7 │  │ Product8 │
│ $29.99   │  │ $24.99   │  │ $19.99   │  │ $34.99   │
│ ★★★★☆    │  │ ★★★★★    │  │ ★★★☆☆    │  │ ★★★★☆    │
│ [Add]    │  │ [Add]    │  │ [Add]    │  │ [Add]    │
└──────────┘  └──────────┘  └──────────┘  └──────────┘

┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│  [IMG]   │  │  [IMG]   │  │  [IMG]   │  │  [IMG]   │
│ Product9 │  │ Product10│  │ Product11│  │ Product12│
│ $29.99   │  │ $24.99   │  │ $19.99   │  │ $34.99   │
│ ★★★★☆    │  │ ★★★★★    │  │ ★★★☆☆    │  │ ★★★★☆    │
│ [Add]    │  │ [Add]    │  │ [Add]    │  │ [Add]    │
└──────────┘  └──────────┘  └──────────┘  └──────────┘

┌─────────────────────────────────────────────────────────────────┐
│  [««]  [‹ Previous]  [1] [2] [3] ... [10]  [Next ›]  [»»]       │
│  Showing 1-12 of 120 products                                    │
└─────────────────────────────────────────────────────────────────┘
```

## Component Breakdown

### 1. Header Section
- **Title**: "Welcome to Wellness Store"
- **Subtitle**: "Your trusted source for premium wellness products"

### 2. Search Bar
```html
┌────────────────────────────────────────────────────┐
│  🔍  Search for products...            [Search]    │
└────────────────────────────────────────────────────┘
```
- Full-width input field
- Search button on the right
- Submits on Enter key or button click

### 3. Filter Panel (White Card with Shadow)
```
┌────────────────────────────────────────────────────────────────┐
│  [Category ▼]      [Price Range ▼]      [Sort By ▼]  [Clear]  │
│  ────────────      ────────────────      ──────────            │
│  All Categories    All Prices            Default               │
│  Supplements       Under $20             Price: Low to High    │
│  Vitamins          $20 - $40             Price: High to Low    │
│  Minerals          $40 - $60             Name: A to Z          │
│  Herbs             $60 - $100            Name: Z to A          │
│  Probiotics        Over $100             Highest Rated         │
│  Fitness                                                        │
│  Skincare                                                       │
│  Nutrition                                                      │
│                                                                 │
│  Active filters: [Supplements ×] [$20-$40 ×]                   │
└────────────────────────────────────────────────────────────────┘
```

#### Filter Options:

**Category Dropdown:**
- All Categories
- Supplements
- Vitamins
- Minerals
- Herbs
- Probiotics
- Fitness
- Skincare
- Nutrition

**Price Range Dropdown:**
- All Prices
- Under $20
- $20 - $40
- $40 - $60
- $60 - $100
- Over $100

**Sort By Dropdown:**
- Default (newest first)
- Price: Low to High
- Price: High to Low
- Name: A to Z
- Name: Z to A
- Highest Rated

**Clear Filters Button:**
- Only visible when filters are active
- Clears all filters at once

### 4. Active Filters Display
```
Active filters: [Supplements ×] [$20-$40 ×] [Search: "vitamin" ×]
```
- Colored badges (primary-100 background, primary-800 text)
- Individual × buttons to remove each filter
- Only shown when filters are active

### 5. Product Grid
```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│              │  │              │  │              │  │              │
│   [IMAGE]    │  │   [IMAGE]    │  │   [IMAGE]    │  │   [IMAGE]    │
│              │  │              │  │              │  │              │
├──────────────┤  ├──────────────┤  ├──────────────┤  ├──────────────┤
│ Product Name │  │ Product Name │  │ Product Name │  │ Product Name │
│ Category     │  │ Category     │  │ Category     │  │ Category     │
│ ★★★★☆ (24)   │  │ ★★★★★ (45)   │  │ ★★★☆☆ (12)   │  │ ★★★★☆ (33)   │
│ $29.99       │  │ $19.99       │  │ $24.99       │  │ $34.99       │
│ 100 in stock │  │ 150 in stock │  │ 80 in stock  │  │ 60 in stock  │
│              │  │              │  │              │  │              │
│ [Add to Cart]│  │ [Add to Cart]│  │ [Add to Cart]│  │ [Add to Cart]│
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

**Product Card:**
- Square image (aspect-ratio: 1/1)
- Product name (2 lines max with ellipsis)
- Category label
- Star rating + review count
- Price (large, bold, primary color)
- Stock status
- "Add to Cart" button (full width)
  - Disabled if out of stock
  - Shows "Out of Stock" text when stock = 0

**Grid Layout:**
- 1 column on mobile
- 3 columns on medium screens (md)
- 4 columns on large screens (lg)
- Gap: 6 (1.5rem)

### 6. Loading States

**Initial Loading (Skeleton):**
```
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ ▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓ │
│ ▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓ │
│ ▓▓▓▓     │  │ ▓▓▓▓     │  │ ▓▓▓▓     │  │ ▓▓▓▓     │
│ ▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓ │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
```

**Fetching New Data:**
```
⟳ Loading...
(Previous products remain visible)
```

### 7. Pagination Controls
```
┌───────────────────────────────────────────────────────────────┐
│  [««]  [‹ Previous]  [1] [2] [3] ... [8] [9] [10]  [Next ›]  │
│                         [»»]                                  │
│                                                               │
│             Showing 13-24 of 120 products (filtered)          │
└───────────────────────────────────────────────────────────────┘
```

**Buttons:**
- `««` - Jump to first page
- `‹ Previous` - Go to previous page
- `[1] [2] [3]` - Page number buttons
- `...` - Ellipsis for skipped pages
- `Next ›` - Go to next page
- `»»` - Jump to last page

**Current Page:**
- Highlighted with primary color
- White text

**Disabled Buttons:**
- Grayed out when at first/last page
- Cannot be clicked

**Product Count:**
- Shows current range and total
- Adds "(filtered)" when filters are active

### 8. Empty State
```
┌─────────────────────────────────────────────────┐
│                                                 │
│              No products found                  │
│                                                 │
│           [Clear Filters Button]                │
│                                                 │
└─────────────────────────────────────────────────┘
```

## Color Scheme

- **Primary**: Teal/Blue (primary-500, primary-600, primary-800)
- **Gray**: For text and backgrounds (gray-200, gray-500, gray-600, gray-700, gray-900)
- **White**: Cards and inputs
- **Yellow**: Star ratings (yellow-500)
- **Red**: Error messages (red-600)

## Interactions

### Filter Changes:
1. User selects a filter
2. Filter badge appears below dropdowns
3. Products grid updates instantly
4. Pagination resets to page 1
5. Product count updates

### Pagination:
1. User clicks page number or navigation button
2. Page scrolls to top smoothly
3. Products grid updates
4. Current page button highlights
5. Product count updates to show new range

### Search:
1. User types search query
2. User clicks Search or presses Enter
3. Search badge appears
4. Products filter by name/description
5. Pagination resets to page 1

### Clear Filters:
1. User clicks Clear Filters
2. All filter badges disappear
3. All dropdowns reset to default
4. All products shown
5. Pagination resets to page 1

## Responsive Behavior

### Mobile (< 768px)
- Product grid: 1 column
- Filter dropdowns: Stack vertically
- Pagination: Smaller buttons, fewer page numbers shown
- Search bar: Full width

### Tablet (768px - 1024px)
- Product grid: 3 columns
- Filter dropdowns: Side by side
- Full pagination controls

### Desktop (> 1024px)
- Product grid: 4 columns
- All controls visible
- Optimal spacing

## Accessibility Features

- All buttons have clear labels
- Keyboard navigation supported
- Focus states on interactive elements
- Screen reader friendly
- Color contrast meets WCAG AA standards

---

**Component Files:**
- `client/src/pages/Home.tsx` - Main component
- `client/src/services/product.service.ts` - API service
- `client/src/components/atoms/Button.tsx` - Button component

**Backend:**
- `server/controllers/productController.js` - API controller
- `server/routes/products.js` - API routes
- `server/models/Product.js` - Product model

