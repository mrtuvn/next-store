import { Button, Select } from '@/components/atoms';
import { ActiveFilters, type ActiveFilter } from '@/components/molecules';

interface FilterOption {
  value: string;
  label: string;
}

interface ProductFiltersProps {
  category: string;
  priceRange: string;
  sortBy: string;
  categoryOptions: FilterOption[];
  priceRangeOptions: FilterOption[];
  sortOptions: FilterOption[];
  onCategoryChange: (value: string) => void;
  onPriceRangeChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onClearFilters: () => void;
  activeFilters: ActiveFilter[];
  hasActiveFilters: boolean;
}

export function ProductFilters({
  category,
  priceRange,
  sortBy,
  categoryOptions,
  priceRangeOptions,
  sortOptions,
  onCategoryChange,
  onPriceRangeChange,
  onSortChange,
  onClearFilters,
  activeFilters,
  hasActiveFilters
}: ProductFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-wrap items-center gap-4">
        <Select
          label="Category"
          value={category}
          options={categoryOptions}
          onChange={onCategoryChange}
        />

        <Select
          label="Price Range"
          value={priceRange}
          options={priceRangeOptions}
          onChange={onPriceRangeChange}
        />

        <Select
          label="Sort By"
          value={sortBy}
          options={sortOptions}
          onChange={onSortChange}
        />

        {hasActiveFilters && (
          <div className="flex items-end">
            <Button
              variant="secondary"
              onClick={onClearFilters}
              className="whitespace-nowrap"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <ActiveFilters filters={activeFilters} />
    </div>
  );
}

