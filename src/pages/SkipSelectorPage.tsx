import { useState } from 'react';
import { useSkips } from '@/hooks/useSkips';
import { SkipCard } from '@/components/SkipCard';
import { ProgressBar } from '@/components/ProgressBar';
import { ChevronRight } from 'lucide-react';

export const SkipSelectorPage: React.FC = () => {
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null);
  const { data: skips, isLoading, isError } = useSkips();

  return (
    <div className="bg-gray-100 font-sans min-h-screen">
      <ProgressBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* --- Trust signals and info header --- */}
        <div className="text-center mb-10">
          <p className="text-lg text-gray-700">
            We provide a wide range of sizes to suit any project.
          </p>
        </div>

        {/* --- Skip Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              // Simple Skeleton Loader
              <div
                key={i}
                className="bg-white rounded-xl shadow-md p-6 animate-pulse"
              >
                <div className="h-48 bg-gray-200 rounded mb-4" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}

          {isError && (
            <p className="col-span-full text-center text-red-600">
              Could not load skips.
            </p>
          )}

          {skips?.map((skip) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              isSelected={skip.id === selectedSkipId}
              onSelect={() =>
                selectedSkipId === skip.id
                  ? setSelectedSkipId(null)
                  : setSelectedSkipId(skip.id)
              }
            />
          ))}
        </div>

        {/* --- Bottom Navigation --- */}
        <div className="mt-12 flex justify-between items-center">
          <button className="text-gray-600 font-semibold hover:text-gray-900 transition-colors">
            Back
          </button>
          <button
            disabled={!selectedSkipId}
            className="flex items-center gap-2 px-10 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
          >
            Continue <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
};
