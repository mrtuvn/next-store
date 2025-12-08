import { cn } from '@/utils/cn';

interface LoadingSpinnerProps {
  className?: string;
  text?: string;
}

export function LoadingSpinner({ className, text = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className={cn('text-center py-4 text-gray-600', className)}>
      <span className="inline-block animate-spin">⟳</span> {text}
    </div>
  );
}
