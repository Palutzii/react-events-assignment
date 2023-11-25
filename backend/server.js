import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const EVENTS_FILE = path.join(DATA_DIR, 'events.json');
const PURCHASES_FILE = path.join(DATA_DIR, 'purchases.json');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const readEventsData = () => {
    const eventsData = fs.readFileSync(EVENTS_FILE, 'utf8');
    return JSON.parse(eventsData);
};

const readPurchasesData = () => {
    try {
        const purchasesData = fs.readFileSync(PURCHASES_FILE, 'utf8');
        if (purchasesData.trim() === '') {
            return [];
        }
        return JSON.parse(purchasesData);
    } catch (err) {
        console.error('Error reading from purchases.json:', err);
        return [];
    }
}

const writePurchasesData = (purchases) => {
    try {
        fs.writeFileSync(PURCHASES_FILE, JSON.stringify(purchases, null, 2), 'utf8');
    } catch (err) {
        console.error('Error writing to purchases.json:', err);
    }
};

if (!fs.existsSync(PURCHASES_FILE)) {
    writePurchasesData([]);
}

app.get('/api/events', (req, res) => {
    const events = readEventsData();
    res.json(events);
});

app.get('/api/events/:id', (req, res) => {
    const events = readEventsData();
    const event = events.find(e => e.id === Number(req.params.id));
    if (event) {
        res.json(event);
    } else {
        res.status(404).json({ message: 'Event not found' });
    }
});

app.post('/api/tickets', (req,res) => {
    const { name, email,tickets, eventId } = req.body;
    const currentPurchases = readPurchasesData();

    const newPurchase = {
        id: currentPurchases.length + 1,
        name,
        email,
        tickets,
        eventId,
        date: new Date().toISOString(),
    }
    currentPurchases.push(newPurchase);
    writePurchasesData(currentPurchases);

    res.json({ message: 'Tickets purchased successfully', purchase: newPurchase });
})

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});