import app from "./app";
import { seedDatabase } from "./utils/seedDatabase";

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`);
    if (process.env.NODE_ENV !== "test") {
        await seedDatabase();
    }
});