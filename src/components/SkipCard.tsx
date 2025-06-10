import { cn } from '@/lib/utils';
import type { SkipCardProps } from '@/types';
import { CircleCheckBig, Clock, AlertTriangle } from 'lucide-react';

export const SkipCard: React.FC<SkipCardProps> = ({
  skip,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      className={cn("bg-white rounded-xl overflow-hidden shadow-md border transition-all duration-300 ease-in-out cursor-pointer group hover:shadow-xl hover:-translate-y-1 hover:scale-105", {
        'ring-4 ring-blue-500 border-transparent scale-105': isSelected,
        'border-gray-200': !isSelected,
      })}>
      <div className="relative">
        <img
          src={skip.image_url}
          alt={skip.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
          {skip.size} Yards
        </div>
        {skip.is_permit_required && (
          <div className={cn("absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1", {
            "animate-bounce": isSelected,
          })}>
            <AlertTriangle className="w-3 h-3" />
            Permit Required
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">{skip.name}</h3>
          <p className="text-2xl font-bold text-blue-600">
            {skip.formatted_price}
          </p>
        </div>
        <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
          <Clock className="w-4 h-4" />
          {skip.hire_period_days} day hire
        </p>

        <p className="text-sm text-gray-600 mb-4 h-10">
          <strong className="text-gray-800">Suitable for:</strong>{' '}
          {skip.description}
        </p>

        <button className={cn("w-full mt-2 px-4 py-3 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors", {
          'bg-blue-600': isSelected,
          'bg-gray-800': !isSelected,
        })}>
          {isSelected ? (
            <div>
              <span>Selected</span>
              <CircleCheckBig className="w-5 h-5 inline-block mr-2" />
            </div>
          ) : (
            <div>
              <span>Get This Skip</span>
              <CircleCheckBig className="w-5 h-5 inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
