import React, { useState } from 'react';
import Hero from '../components/home/Hero';
import StatsSection from '../components/home/StatsSection';
import VehicleGrid from '../components/home/VehicleGrid';
import VehicleDetailsDrawer from '../components/home/VehicleDetailsDrawer';
import AdminFAB from '../components/home/AdminFAB';
import AddVehicleModal from '../components/home/AddVehicleModal';
import DeleteDialog from '../components/home/DeleteDialog';
import type { Vehicle } from '../components/home/VehicleCard';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'GW-001',
    brand: 'Tesla',
    model: 'Model S Plaid',
    year: 2025,
    category: 'Electric',
    price: 109990,
    mileage: 1200,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop',
    status: 'AVAILABLE',
    fuelType: 'Electric',
    transmission: 'Automatic',
    description: 'Tri-motor all-wheel drive platform with torque vectoring and 1,020 horsepower peak output.',
    specs: [
      { label: '0-60 MPH', value: '1.99s' },
      { label: 'RANGE', value: '359 mi' },
      { label: 'TOP SPEED', value: '200 mph' },
      { label: 'PEAK HP', value: '1,020 hp' },
    ],
  },
  {
    id: 'GW-002',
    brand: 'Porsche',
    model: 'Taycan Turbo S',
    year: 2024,
    category: 'Electric',
    price: 185000,
    mileage: 3400,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop',
    status: 'AVAILABLE',
    fuelType: 'Electric',
    transmission: '2-Speed Automatic',
    description: 'Precision German engineering meets all-electric performance. Exceptional launch control and track-ready dynamics.',
    specs: [
      { label: '0-60 MPH', value: '2.6s' },
      { label: 'RANGE', value: '278 mi' },
      { label: 'TOP SPEED', value: '161 mph' },
      { label: 'PEAK HP', value: '750 hp' },
    ],
  },
  {
    id: 'GW-003',
    brand: 'Mercedes-Benz',
    model: 'AMG GT 63 S',
    year: 2024,
    category: 'Coupe',
    price: 175900,
    mileage: 5100,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop',
    status: 'RESERVED',
    fuelType: 'Gasoline',
    transmission: '9-Speed Automatic',
    description: 'Handcrafted AMG 4.0L V8 biturbo engine with 4MATIC+ fully variable all-wheel drive.',
    specs: [
      { label: '0-60 MPH', value: '3.1s' },
      { label: 'ENGINE', value: '4.0L V8' },
      { label: 'TOP SPEED', value: '196 mph' },
      { label: 'PEAK HP', value: '630 hp' },
    ],
  },
  {
    id: 'GW-004',
    brand: 'Toyota',
    model: 'Land Cruiser 300',
    year: 2025,
    category: 'SUV',
    price: 88500,
    mileage: 800,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop',
    status: 'AVAILABLE',
    fuelType: 'Hybrid',
    transmission: '10-Speed Automatic',
    description: 'Legendary off-road durability with i-FORCE MAX hybrid powertrain and multi-terrain select system.',
    specs: [
      { label: '0-60 MPH', value: '6.2s' },
      { label: 'DRIVETRAIN', value: '4WD' },
      { label: 'CLEARANCE', value: '9.5"' },
      { label: 'TOWING', value: '8,000 lbs' },
    ],
  },
  {
    id: 'GW-005',
    brand: 'Audi',
    model: 'RS e-tron GT',
    year: 2023,
    category: 'Coupe',
    price: 147500,
    mileage: 8900,
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200&auto=format&fit=crop',
    status: 'AVAILABLE',
    fuelType: 'Electric',
    transmission: 'Automatic',
    description: 'Sculpted aerodynamics and quattro all-wheel drive. High-voltage charging capable up to 270 kW.',
    specs: [
      { label: '0-60 MPH', value: '3.1s' },
      { label: 'RANGE', value: '232 mi' },
      { label: 'TOP SPEED', value: '155 mph' },
      { label: 'PEAK HP', value: '637 hp' },
    ],
  },
  {
    id: 'GW-006',
    brand: 'BMW',
    model: 'i7 xDrive60',
    year: 2024,
    category: 'Sedan',
    price: 126900,
    mileage: 4200,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop',
    status: 'SOLD',
    fuelType: 'Electric',
    transmission: 'Automatic',
    description: 'Executive mobility redefined. Featuring 31-inch BMW Theater Screen in rear lounge and Bowers & Wilkins sound.',
    specs: [
      { label: '0-60 MPH', value: '4.5s' },
      { label: 'RANGE', value: '318 mi' },
      { label: 'TOP SPEED', value: '149 mph' },
      { label: 'PEAK HP', value: '536 hp' },
    ],
  },
];

export default function Home() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [deletingVehicle, setDeletingVehicle] = useState<Vehicle | null>(null);

  // Compute live statistics for StatsSection
  const totalVehicles = vehicles.length;
  const categoriesCount = new Set(vehicles.map((v) => v.category)).size;
  const totalValue = vehicles.reduce((acc, v) => acc + v.price, 0);
  const availableStock = vehicles.filter((v) => v.status === 'AVAILABLE').length;

  // Handlers
  const handleViewDetails = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleOpenAddModal = () => {
    setEditingVehicle(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setIsDrawerOpen(false);
    setIsModalOpen(true);
  };

  const handleOpenDeleteDialog = (vehicle: Vehicle) => {
    setDeletingVehicle(vehicle);
    setIsDrawerOpen(false);
  };

  const handleSaveVehicle = (data: Partial<Vehicle>) => {
    if (editingVehicle) {
      // Edit existing
      setVehicles((prev) =>
        prev.map((v) => (v.id === editingVehicle.id ? { ...v, ...data } : v))
      );
      toast.success(`${data.brand} ${data.model} updated successfully`);
    } else {
      // Add new
      const newVehicle: Vehicle = {
        id: `GW-00${vehicles.length + 1}`,
        brand: data.brand || 'Gadiwalla',
        model: data.model || 'Concept',
        year: data.year || new Date().getFullYear(),
        category: data.category || 'Electric',
        price: data.price || 0,
        mileage: data.mileage || 0,
        image: data.image || 'https://images.unsplash.com/photo-1617788138017-80ad40651399',
        status: data.status || 'AVAILABLE',
        fuelType: data.fuelType,
        transmission: data.transmission,
        description: data.description,
      };
      setVehicles((prev) => [newVehicle, ...prev]);
      toast.success(`${newVehicle.brand} ${newVehicle.model} added to inventory`);
    }
    setIsModalOpen(false);
    setEditingVehicle(null);
  };

  const handleDeleteVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    toast.error('Vehicle removed from inventory');
    setDeletingVehicle(null);
  };

  return (
    <main className="w-full min-h-screen bg-background pb-20">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Statistics Section (live compute) */}
      <StatsSection
        totalVehicles={totalVehicles}
        totalCategories={categoriesCount}
        totalValue={totalValue}
        availableStock={availableStock}
      />

      {/* 3. Vehicle Inventory Section */}
      <VehicleGrid
        vehicles={vehicles}
        onViewDetails={handleViewDetails}
      />

      {/* 4. Slide-in Details Drawer */}
      <VehicleDetailsDrawer
        vehicle={selectedVehicle}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        isAdmin={isAdmin}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteDialog}
      />

      {/* 5. Floating Admin Action Button (Visible for ADMIN users) */}
      {isAdmin && <AdminFAB onClick={handleOpenAddModal} />}

      {/* 6. Add / Edit Vehicle Modal */}
      <AddVehicleModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingVehicle(null);
        }}
        onSubmit={handleSaveVehicle}
        initialData={editingVehicle}
      />

      {/* 7. Delete Confirmation Dialog */}
      <DeleteDialog
        isOpen={!!deletingVehicle}
        vehicle={deletingVehicle}
        onClose={() => setDeletingVehicle(null)}
        onConfirm={handleDeleteVehicle}
      />
    </main>
  );
}
