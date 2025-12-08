interface FilterBadgeProps {
  label: string;
  onRemove: () => void;
}

export function FilterBadge({ label, onRemove }: FilterBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
      {label}
      <button
        onClick={onRemove}
        className="hover:text-primary-900 transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        ×
      </button>
    </span>
  );
}

