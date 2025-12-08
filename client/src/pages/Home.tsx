import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productService, type Product } from '@/services/product.service';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addToCart } from '@/slices/cartSlice';
import { toast } from 'sonner';

// Components
import { SearchBar, LoadingSpinner } from '@/components/atoms';
import { EmptyState } from '@/components/molecules';
import { ProductFilters, ProductGrid, Pagination } from '@/components/organisms';

// Constants
import { CATEGORIES, PRICE_RANGES, SORT_OPTIONS } from '@/constants/filters';

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

  // Handlers
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
    setCurrentPage(1);
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

  // Computed values
  const hasActiveFilters = Boolean(category || priceRange || sortBy || searchQuery);

  const activeFilters = useMemo(() => {
    const filters = [];
    
    if (category) {
      filters.push({
        key: 'category',
        label: CATEGORIES.find(c => c.value === category)?.label || category,
        onRemove: () => handleCategoryChange('')
      });
    }
    
    if (priceRange) {
      filters.push({
        key: 'priceRange',
        label: PRICE_RANGES.find(p => p.value === priceRange)?.label || priceRange,
        onRemove: () => handlePriceRangeChange('')
      });
    }
    
    if (sortBy) {
      filters.push({
        key: 'sortBy',
        label: SORT_OPTIONS.find(s => s.value === sortBy)?.label || sortBy,
        onRemove: () => handleSortChange('')
      });
    }
    
    if (searchQuery) {
      filters.push({
        key: 'search',
        label: `Search: "${searchQuery}"`,
        onRemove: () => {
          setSearchQuery('');
          setSearchInput('');
        }
      });
    }
    
    return filters;
  }, [category, priceRange, sortBy, searchQuery]);

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EmptyState
          title="Error loading products"
          message="Please try again later or refresh the page."
        />
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
      <SearchBar
        value={searchInput}
        onChange={setSearchInput}
        onSubmit={handleSearch}
        className="mb-8"
      />

      {/* Filters */}
      <ProductFilters
        category={category}
        priceRange={priceRange}
        sortBy={sortBy}
        categoryOptions={CATEGORIES}
        priceRangeOptions={PRICE_RANGES}
        sortOptions={SORT_OPTIONS}
        onCategoryChange={handleCategoryChange}
        onPriceRangeChange={handlePriceRangeChange}
        onSortChange={handleSortChange}
        onClearFilters={handleClearFilters}
        activeFilters={activeFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Loading Indicator */}
      {isFetching && !isLoading && <LoadingSpinner />}

      {/* Products Grid */}
      <ProductGrid
        products={data?.data || []}
        isLoading={isLoading}
        onAddToCart={handleAddToCart}
        skeletonCount={12}
      />

      {/* Pagination */}
      {data?.pagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={data.pagination.totalPages}
          totalItems={data.pagination.totalProducts}
          itemsPerPage={limit}
          onPageChange={handlePageChange}
          infoSuffix={hasActiveFilters ? '(filtered)' : ''}
        />
      )}

      {/* No Results */}
      {!isLoading && data?.data && data.data.length === 0 && (
        <EmptyState
          title="No products found"
          message={hasActiveFilters ? "Try adjusting your filters" : undefined}
          actionLabel={hasActiveFilters ? "Clear Filters" : undefined}
          onAction={hasActiveFilters ? handleClearFilters : undefined}
        />
      )}
    </div>
  );
}

export default Home;
