import express from 'express';
import cors from 'cors';
import { createPurchasesFileIfNotExists} from "./data/dataManager.js";

import eventsRoutes from "./routes/eventsRoutes.js";
import purchasesRoutes from "./routes/purchasesRoutes.js";

createPurchasesFileIfNotExists();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/', eventsRoutes);
app.use('/', purchasesRoutes);

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});