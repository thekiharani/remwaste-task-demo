import { CircleCheckBig, ChevronRight, Headset } from 'lucide-react';

// static data for demo purposes,
// ideally this would come from a prop or context
const steps = [
  { id: 1, title: 'Postcode', completed: true },
  { id: 2, title: 'Waste Type', completed: true },
  { id: 3, title: 'Select Skip', current: true },
  { id: 4, title: 'Permit Check' },
  { id: 5, title: 'Choose Date' },
  { id: 6, title: 'Payment' },
];

export const ProgressBar: React.FC = () => (
  <div className="bg-white border-b sticky top-0 z-10 p-4">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Choose Your Skip Size</h1>
        <div className="flex items-center space-x-2 cursor-pointer hover:scale-110 transition-transform">
          <Headset className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600">Need help choosing?</span>
        </div>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                  ${step.completed ? 'bg-green-600 text-white' : ''}
                  ${step.current ? 'bg-blue-600 text-white' : ''}
                  ${!step.completed && !step.current ? 'bg-gray-200 text-gray-600' : ''}`}
              >
                {step.completed ? <CircleCheckBig className="w-5 h-5" /> : step.id}
              </div>
              <span className={`text-sm font-medium ${step.current ? 'text-blue-600' : 'text-gray-600'}`}>
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);