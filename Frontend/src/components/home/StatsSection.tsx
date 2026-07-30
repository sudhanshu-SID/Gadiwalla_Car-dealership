import { Car, Layers, DollarSign, CheckCircle2 } from 'lucide-react';
import StatsCard from './StatsCard';

interface StatsSectionProps {
  totalVehicles?: number;
  totalCategories?: number;
  totalValue?: number;
  availableStock?: number;
}

export default function StatsSection({
  totalVehicles = 48,
  totalCategories = 6,
  totalValue = 4250000,
  availableStock = 34,
}: StatsSectionProps) {
  const stats = [
    {
      icon: Car,
      label: 'Total Vehicles',
      value: totalVehicles,
      delay: 0,
    },
    {
      icon: Layers,
      label: 'Categories',
      value: totalCategories,
      delay: 0.1,
    },
    {
      icon: DollarSign,
      label: 'Inventory Value',
      value: totalValue,
      prefix: '$',
      delay: 0.2,
    },
    {
      icon: CheckCircle2,
      label: 'Available Stock',
      value: availableStock,
      delay: 0.3,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 -mt-10 relative z-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatsCard
            key={idx}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            prefix={stat.prefix}
            delay={stat.delay}
          />
        ))}
      </div>
    </section>
  );
}
