import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    // 1. Seed Admin User with secure non-breached password
    const adminEmail = "admin@gadiwalla.com";
    const adminPassword = "GadiwallaAdmin#2025!";
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail },
    });

    if (!existingAdmin) {
        await prisma.user.create({
            data: {
                name: "Admin",
                email: adminEmail,
                password: hashedPassword,
                role: "ADMIN",
            },
        });
        console.log(`Admin user created: ${adminEmail} / ${adminPassword}`);
    } else {
        // Update password to secure version
        await prisma.user.update({
            where: { email: adminEmail },
            data: { password: hashedPassword },
        });
        console.log(`Admin user password updated for: ${adminEmail}`);
    }

    // 2. Seed Initial Vehicles if < 6
    const vehicleCount = await prisma.vehicle.count();

    if (vehicleCount < 6) {
        const dummyVehicles = [
            {
                make: "Tesla",
                model: "Model S Plaid",
                year: 2025,
                category: "Electric",
                price: 109990,
                quantity: 5,
            },
            {
                make: "Porsche",
                model: "Taycan Turbo S",
                year: 2024,
                category: "Electric",
                price: 185000,
                quantity: 3,
            },
            {
                make: "Mercedes-Benz",
                model: "AMG GT 63 S",
                year: 2024,
                category: "Coupe",
                price: 175900,
                quantity: 4,
            },
            {
                make: "Toyota",
                model: "Land Cruiser 300",
                year: 2025,
                category: "SUV",
                price: 88500,
                quantity: 6,
            },
            {
                make: "Audi",
                model: "RS e-tron GT",
                year: 2023,
                category: "Coupe",
                price: 147500,
                quantity: 2,
            },
            {
                make: "BMW",
                model: "i7 xDrive60",
                year: 2024,
                category: "Sedan",
                price: 126900,
                quantity: 0,
            },
        ];

        // Clear existing incomplete vehicle records and re-seed clean fleet
        await prisma.vehicle.deleteMany();
        for (const v of dummyVehicles) {
            await prisma.vehicle.create({ data: v });
        }

        console.log("Full vehicle fleet (6 cars) seeded successfully.");
    } else {
        console.log(`Vehicles present in database (${vehicleCount} found).`);
    }
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });