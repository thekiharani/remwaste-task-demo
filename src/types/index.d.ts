// Represents the raw data shape directly from the API
export interface RawSkip {
  id: number;
  size: number;
  hire_period_days: number;
  price_before_vat: number;
  vat: number;
  forbidden: boolean;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

// Represents the clean, processed data our components will consume
export interface Skip {
  id: number;
  size: number;
  name: string;
  description: string;
  image_url: string;
  hire_period_days: number;
  final_price: number;
  formatted_price: string;
  is_permit_required: boolean;
  allows_heavy_waste: boolean;
}

export interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: () => void;
}
