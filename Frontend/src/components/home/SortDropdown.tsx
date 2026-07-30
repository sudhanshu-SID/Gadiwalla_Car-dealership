import { ArrowUpDown } from 'lucide-react';

export type SortOption = 'FEATURED' | 'PRICE_LOW_HIGH' | 'PRICE_HIGH_LOW' | 'YEAR_NEWEST' | 'NAME_AZ';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown size={14} className="text-text-muted hidden sm:block" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="px-3.5 py-2 rounded-button bg-background hover:bg-white text-text text-body-sm border border-border outline-none focus:border-primary cursor-pointer transition-all font-medium"
      >
        <option value="FEATURED">Sort: Featured</option>
        <option value="PRICE_LOW_HIGH">Price: Low → High</option>
        <option value="PRICE_HIGH_LOW">Price: High → Low</option>
        <option value="YEAR_NEWEST">Year: Newest First</option>
        <option value="NAME_AZ">Name: A → Z</option>
      </select>
    </div>
  );
}
