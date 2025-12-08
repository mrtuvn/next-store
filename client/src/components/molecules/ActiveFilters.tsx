import { FilterBadge } from '@/components/atoms';

export interface ActiveFilter {
  key: string;
  label: string;
  onRemove: () => void;
}

interface ActiveFiltersProps {
  filters: ActiveFilter[];
}

export function ActiveFilters({ filters }: ActiveFiltersProps) {
  if (filters.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <span className="text-sm text-gray-600">Active filters:</span>
      {filters.map((filter) => (
        <FilterBadge
          key={filter.key}
          label={filter.label}
          onRemove={filter.onRemove}
        />
      ))}
    </div>
  );
}

