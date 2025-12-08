import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store';

// Use throughout your app instead of plain `useSelector`
export const useAppSelector = useSelector.withTypes<RootState>();

