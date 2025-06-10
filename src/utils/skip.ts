import type { RawSkip, Skip } from '../types';

// format numbers into GBP currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
};

// generate a dynamic description based on skip properties
const generateDynamicDescription = (skip: RawSkip): string => {
  const details: string[] = [];

  // Add use-cases based on size
  switch (true) {
    case skip.size <= 4:
      details.push('Small clearouts', 'garden waste');
      break;
    case skip.size <= 8:
      details.push('Building work', 'kitchen refits');
      break;
    case skip.size <= 16:
      details.push('Major renovations', 'bulky waste');
      break;
    default:
      details.push('Commercial projects', 'large-scale construction');
      break;
  }

  // add a key capability if applicable
  if (skip.allows_heavy_waste) {
    details.push('heavy soil & rubble');
  }

  // format the description nicely
  return details.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(', ');
};

// transform raw API data into the clean model for our UI
export const processSkips = (rawSkips: RawSkip[]): Skip[] => {
  return (
    rawSkips
      // 1. Filter out any "forbidden" skips
      .filter((skip) => !skip.forbidden)
      // 2. Map the remaining skips to our clean `Skip` type
      .map((rawSkip) => {
        const final_price = rawSkip.price_before_vat * (1 + rawSkip.vat / 100);
        const metadata = {
          name: `${rawSkip.size} Yard Skip`,
          description: generateDynamicDescription(rawSkip),
          image_url: `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${rawSkip.size}-yarder-skip.jpg`, // Fallback image
        };

        return {
          id: rawSkip.id,
          size: rawSkip.size,
          hire_period_days: rawSkip.hire_period_days,
          final_price,
          formatted_price: formatCurrency(final_price),
          // IMPORTANT: Inverted logic from the API field name
          is_permit_required: !rawSkip.allowed_on_road,
          allows_heavy_waste: rawSkip.allows_heavy_waste,
          ...metadata,
        };
      })
  );
};
