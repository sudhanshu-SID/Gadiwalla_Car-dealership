import prisma from "../config/prisma";
import bcrypt from "bcrypt";

export async function seedDatabase() {
    try {
        const adminEmail = "admin@gadiwalla.com";
        const adminPassword = "GadiwallaAdmin#2025!";
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        // 1. Seed or Update Admin User
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
            console.log(`Admin user seeded (${adminEmail} / ${adminPassword}).`);
        } else {
            await prisma.user.update({
                where: { email: adminEmail },
                data: { password: hashedPassword },
            });
        }

        // 2. Seed Vehicle Fleet if empty
        const vehicleCount = await prisma.vehicle.count();

        if (vehicleCount === 0) {
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

            for (const v of dummyVehicles) {
                await prisma.vehicle.create({ data: v });
            }

            console.log("Vehicle fleet seeded successfully.");
        }
    } catch (error) {
        console.error("Auto-seed error:", error);
    }
}
