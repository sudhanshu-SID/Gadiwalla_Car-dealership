import React, { useState, useEffect, useCallback } from 'react';
import Hero from '../components/home/Hero';
import StatsSection from '../components/home/StatsSection';
import VehicleGrid from '../components/home/VehicleGrid';
import VehicleDetailsDrawer from '../components/home/VehicleDetailsDrawer';
import AdminFAB from '../components/home/AdminFAB';
import AddVehicleModal from '../components/home/AddVehicleModal';
import DeleteDialog from '../components/home/DeleteDialog';
import type { Vehicle } from '../components/home/VehicleCard';
import axios from 'axios';
import { vehicleService, type CreateVehiclePayload } from '../services/vehicle.service';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export default function Home() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [deletingVehicle, setDeletingVehicle] = useState<Vehicle | null>(null);
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false);

  // Fetch vehicles from API
  const fetchVehicles = useCallback(async () => {
    setIsError(false);
    try {
      const data = await vehicleService.getVehicles();
      setVehicles(data);
    } catch (error: unknown) {
      console.error('Failed to fetch vehicles:', error);
      setVehicles([]);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    vehicleService
      .getVehicles()
      .then((data) => {
        if (!ignore) {
          setVehicles(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          console.error('Failed to fetch vehicles:', err);
          setVehicles([]);
          setIsError(true);
          setIsLoading(false);
        }
      });
    return () => {
      ignore = true;
    };
  }, []);

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

  const handleSaveVehicle = async (data: Partial<Vehicle>) => {
    setIsActionLoading(true);
    try {
      const payload: CreateVehiclePayload = {
        brand: data.brand || 'Gadiwalla',
        model: data.model || '',
        year: Number(data.year),
        category: data.category || 'Electric',
        price: Number(data.price),
        mileage: Number(data.mileage),
        image: data.image,
        status: data.status,
        fuelType: data.fuelType,
        transmission: data.transmission,
        description: data.description,
      };

      if (editingVehicle) {
        // PUT API
        await vehicleService.updateVehicle(editingVehicle.id, payload);
        toast.success(`${payload.brand} updated successfully`);
      } else {
        // POST API
        await vehicleService.createVehicle(payload);
        toast.success(`${payload.brand} added to inventory`);
      }

      setIsModalOpen(false);
      setEditingVehicle(null);
      await fetchVehicles();
    } catch (error: unknown) {
      console.error('Failed to save vehicle:', error);
      let msg = 'Failed to save vehicle. Please try again.';
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        msg = error.response.data.message;
      } else if (error instanceof Error) {
        msg = error.message;
      }
      toast.error(msg);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteVehicle = async (id: string | number) => {
    setIsActionLoading(true);
    try {
      await vehicleService.deleteVehicle(id);
      toast.success('Vehicle deleted successfully');
      setDeletingVehicle(null);
      await fetchVehicles();
    } catch (error: unknown) {
      console.error('Failed to delete vehicle:', error);
      let msg = 'Failed to delete vehicle.';
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        msg = error.response.data.message;
      } else if (error instanceof Error) {
        msg = error.message;
      }
      toast.error(msg);
    } finally {
      setIsActionLoading(false);
    }
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
        isLoading={isLoading}
        isError={isError}
        onRetry={fetchVehicles}
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
        isLoading={isActionLoading}
      />

      {/* 7. Delete Confirmation Dialog */}
      <DeleteDialog
        isOpen={!!deletingVehicle}
        vehicle={deletingVehicle}
        onClose={() => setDeletingVehicle(null)}
        onConfirm={handleDeleteVehicle}
        isLoading={isActionLoading}
      />
    </main>
  );
}
