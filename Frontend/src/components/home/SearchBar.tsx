import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search make, model, category...',
}: SearchBarProps) {
  return (
    <div className="relative w-full md:w-80">
      <div className="relative flex items-center">
        <Search
          size={18}
          className="absolute left-4 text-text-muted pointer-events-none"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-10 py-3 bg-background hover:bg-white focus:bg-white text-text text-body-sm rounded-button border border-border focus:border-primary outline-none transition-all duration-200 shadow-inner"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 p-1 rounded-full text-text-muted hover:text-text hover:bg-background transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
