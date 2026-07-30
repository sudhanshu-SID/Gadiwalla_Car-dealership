const fs = require('fs');
const path = require('path');

const files = [
  'src/tests/vehicle/getVehicles.test.ts',
  'src/tests/vehicle/getVehicleById.test.ts',
  'src/tests/vehicle/updateVehicles.test.ts',
  'src/tests/vehicle/deleteVehicles.test.ts',
];

const targetPattern1 = `const user = {
            name: "Sid",
            email: "sid@test.com",
            password: "123456",
        };

        await request(app)
            .post("/api/auth/register")
            .send(user);

        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: user.email,
                password: user.password,
            });

        const token = loginResponse.body.token;`;

const targetPattern2 = `const user = {
            name: "Sid",
            email: "sid@test.com",
            password: "123456",
        };

        await request(app)
            .post("/api/auth/register")
            .send(user);

        // Login
        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: user.email,
                password: user.password,
            });

        const token = loginResponse.body.token;`;


const replacement = `const admin = {
            name: "Admin",
            email: "admin@test.com",
            password: "admin123",
            role: "ADMIN",
        };

        await prisma.user.create({
            data: {
                ...admin,
                password: await require("bcrypt").hash(admin.password, 10),
            },
        });

        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: admin.email,
                password: admin.password,
            });

        const token = loginResponse.body.token;`;

for (const file of files) {
  const p = path.join(__dirname, file);
  let content = fs.readFileSync(p, 'utf8');
  
  // try replacing with or without "// Login" comment
  let newContent = content.replace(targetPattern2, replacement);
  if (newContent === content) {
    newContent = content.replace(targetPattern1, replacement);
  }
  
  fs.writeFileSync(p, newContent);
  console.log('Updated ' + file);
}
