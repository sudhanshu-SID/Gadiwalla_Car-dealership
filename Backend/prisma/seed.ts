import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {

    const existingAdmin = await prisma.user.findUnique({
        where: {
            email: "admin@gadiwalla.com",
        },
    });

    if (existingAdmin) {
        console.log("Admin already exists.");
        return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await prisma.user.create({
        data: {
            name: "Admin",
            email: "admin@gadiwalla.com",
            password: hashedPassword,
            role: "ADMIN",
        },
    });

    console.log("Admin user created successfully.");

}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });