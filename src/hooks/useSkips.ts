import { useQuery } from '@tanstack/react-query';
import type { RawSkip, Skip } from '@/types';
import { processSkips } from '@/utils/skip';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.example.com/skips';
const fetchRawSkips = async (): Promise<RawSkip[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch skips');
  const data = await res.json();
  return data || [];
};

export const useSkips = () => {
  return useQuery<RawSkip[], Error, Skip[]>({
    queryKey: ['skips'],
    queryFn: fetchRawSkips,
    // `select` option is for data transformation
    select: (rawSkips) => processSkips(rawSkips),
  });
};
