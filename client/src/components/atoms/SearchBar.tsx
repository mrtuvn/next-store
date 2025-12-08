import type { FormEvent } from 'react';
import { Button } from './Button';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search for products...',
  className = ''
}: SearchBarProps) {
  return (
    <form onSubmit={onSubmit} className={className}>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <Button
          type="submit" 
          size="lg" 
          variant="primary" 
          fullWidth={false} 
          className="btn-search">
          Search
        </Button>
      </div>
    </form>
  );
}

