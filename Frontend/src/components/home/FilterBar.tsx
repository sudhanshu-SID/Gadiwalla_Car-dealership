import React from 'react';

interface FilterBarProps {
  category: string;
  onCategoryChange: (category: string) => void;
  priceRange: string;
  onPriceRangeChange: (priceRange: string) => void;
  year: string;
  onYearChange: (year: string) => void;
  categories: string[];
}

export default function FilterBar({
  category,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  year,
  onYearChange,
  categories,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => {
          const isActive = category === cat;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-2 rounded-pill text-caption uppercase font-semibold transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-background hover:bg-border-light text-text-secondary hover:text-text border border-border'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="h-6 w-px bg-border hidden sm:block" />

      {/* Dropdown Filters */}
      <div className="flex items-center gap-2">
        {/* Price Range */}
        <select
          value={priceRange}
          onChange={(e) => onPriceRangeChange(e.target.value)}
          className="px-3.5 py-2 rounded-button bg-background hover:bg-white text-text text-body-sm border border-border outline-none focus:border-primary cursor-pointer transition-all"
        >
          <option value="ALL">All Prices</option>
          <option value="UNDER_100K">Under $100k</option>
          <option value="100K_150K">$100k - $150k</option>
          <option value="OVER_150K">Over $150k</option>
        </select>

        {/* Year */}
        <select
          value={year}
          onChange={(e) => onYearChange(e.target.value)}
          className="px-3.5 py-2 rounded-button bg-background hover:bg-white text-text text-body-sm border border-border outline-none focus:border-primary cursor-pointer transition-all"
        >
          <option value="ALL">All Years</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>
    </div>
  );
}
