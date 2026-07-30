import { cn } from '../../utils/helpers';

interface AuthTabsProps {
  activeTab: 'signin' | 'join';
  onTabChange: (tab: 'signin' | 'join') => void;
}

export default function AuthTabs({ activeTab, onTabChange }: AuthTabsProps) {
  return (
    <div className="flex items-center gap-md mb-10 relative">
      <button 
        onClick={() => onTabChange('signin')}
        className={cn(
          "font-label-md text-label-md tracking-widest pb-2 transition-colors",
          activeTab === 'signin' ? "text-on-surface" : "text-on-surface-variant hover:text-on-surface"
        )}
      >
        SIGN IN
      </button>
      <button 
        onClick={() => onTabChange('join')}
        className={cn(
          "font-label-md text-label-md tracking-widest pb-2 transition-colors",
          activeTab === 'join' ? "text-on-surface" : "text-on-surface-variant hover:text-on-surface"
        )}
      >
        JOIN CLUB
      </button>
      {/* Active Indicator */}
      <div 
        className={cn(
          "absolute bottom-0 h-[2px] w-[60px] bg-primary-container transition-transform duration-300 ease-out",
          activeTab === 'signin' ? "left-0" : "left-[90px]" // hardcoded positions for simplicity, matching Stitch
        )} 
      ></div>
    </div>
  );
}
