import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productService, type Product } from '@/services/product.service';
import { Button } from '@/components/atoms';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addToCart } from '@/slices/cartSlice';
import { toast } from 'sonner';

const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'supplements', label: 'Supplements' },
  { value: 'vitamins', label: 'Vitamins' },
  { value: 'minerals', label: 'Minerals' },
  { value: 'herbs', label: 'Herbs' },
  { value: 'probiotics', label: 'Probiotics' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'skincare', label: 'Skincare' },
  { value: 'nutrition', label: 'Nutrition' },
];

const PRICE_RANGES = [
  { value: '', label: 'All Prices' },
  { value: '0-20', label: 'Under $20' },
  { value: '20-40', label: '$20 - $40' },
  { value: '40-60', label: '$40 - $60' },
  { value: '60-100', label: '$60 - $100' },
  { value: '100-', label: 'Over $100' },
];

const SORT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'rating', label: 'Highest Rated' },
];

function Home() {
  const dispatch = useAppDispatch();
  
  // Filter and pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const limit = 12;

  // Fetch products from API with filters
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['products', { page: currentPage, limit, category, search: searchQuery, priceRange, sortBy }],
    queryFn: () => productService.getProducts({ 
      page: currentPage, 
      limit,
      category: category || undefined,
      search: searchQuery || undefined,
      priceRange: priceRange || undefined,
      sortBy: sortBy || undefined,
    }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({
      id: product._id,
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0]
    }));
    toast.success(`${product.name} added to cart!`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (newPriceRange: string) => {
    setPriceRange(newPriceRange);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setCategory('');
    setPriceRange('');
    setSortBy('');
    setSearchQuery('');
    setSearchInput('');
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasActiveFilters = category || priceRange || sortBy || searchQuery;

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-red-600">Error loading products. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Wellness Store
        </h1>
        <p className="text-xl text-gray-600">
          Your trusted source for premium wellness products
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for products..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Button type="submit" className="px-6">
            Search
          </Button>
        </div>
      </form>

      {/* Filters Bar */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-wrap items-center gap-4">
          {/* Category Filter */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <select
              value={priceRange}
              onChange={(e) => handlePriceRangeChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {PRICE_RANGES.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="flex items-end">
              <Button
                variant="secondary"
                onClick={handleClearFilters}
                className="whitespace-nowrap"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {category && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                {CATEGORIES.find(c => c.value === category)?.label}
                <button
                  onClick={() => handleCategoryChange('')}
                  className="hover:text-primary-900"
                >
                  ×
                </button>
              </span>
            )}
            {priceRange && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                {PRICE_RANGES.find(p => p.value === priceRange)?.label}
                <button
                  onClick={() => handlePriceRangeChange('')}
                  className="hover:text-primary-900"
                >
                  ×
                </button>
              </span>
            )}
            {sortBy && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                {SORT_OPTIONS.find(s => s.value === sortBy)?.label}
                <button
                  onClick={() => handleSortChange('')}
                  className="hover:text-primary-900"
                >
                  ×
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                Search: "{searchQuery}"
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSearchInput('');
                  }}
                  className="hover:text-primary-900"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Loading Overlay */}
      {isFetching && !isLoading && (
        <div className="text-center py-4 text-gray-600">
          <span className="inline-block animate-spin">⟳</span> Loading...
        </div>
      )}

      {isLoading ? (
        // Loading skeleton
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="bg-white rounded-lg shadow-md p-6 animate-pulse"
            >
              <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-10 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      ) : (
        // Products grid
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.data?.map((product: Product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
                {product.images[0] && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-500">★</span>
                <span className="text-sm text-gray-600">
                  {product.ratings.average.toFixed(1)} ({product.ratings.count})
                </span>
              </div>
              <p className="text-xl font-bold text-primary-600 mb-2">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mb-4">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </p>
              <Button
                onClick={() => handleAddToCart(product)}
                fullWidth
                disabled={product.stock === 0}
                className="mt-auto"
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {data?.pagination && data.pagination.totalPages > 1 && (
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="px-3"
            >
              ««
            </Button>
            <Button
              variant="secondary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ‹ Previous
            </Button>
            
            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: data.pagination.totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  // Show first page, last page, current page, and 2 pages around current
                  return (
                    page === 1 ||
                    page === (data.pagination?.totalPages || 1) ||
                    Math.abs(page - currentPage) <= 2
                  );
                })
                .map((page, index, array) => {
                  // Add ellipsis if there's a gap
                  const prevPage = array[index - 1];
                  const showEllipsis = prevPage && page - prevPage > 1;

                  return (
                    <div key={page} className="flex items-center gap-1">
                      {showEllipsis && (
                        <span className="px-2 text-gray-500">...</span>
                      )}
                      <Button
                        variant={page === currentPage ? 'primary' : 'secondary'}
                        onClick={() => handlePageChange(page)}
                        className="px-3 min-w-[40px]"
                      >
                        {page}
                      </Button>
                    </div>
                  );
                })}
            </div>

            <Button
              variant="secondary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === (data.pagination?.totalPages || 1)}
            >
              Next ›
            </Button>
            <Button
              variant="secondary"
              onClick={() => handlePageChange(data.pagination.totalPages)}
              disabled={currentPage === data.pagination.totalPages}
              className="px-3"
            >
              »»
            </Button>
          </div>

          <p className="text-gray-600">
            Showing {(currentPage - 1) * limit + 1} - {Math.min(currentPage * limit, data.pagination.totalProducts)} of {data.pagination.totalProducts} products
            {hasActiveFilters && ' (filtered)'}
          </p>
        </div>
      )}

      {/* No Results Message */}
      {!isLoading && data?.data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">No products found</p>
          {hasActiveFilters && (
            <Button variant="secondary" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;

