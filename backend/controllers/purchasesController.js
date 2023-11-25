import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const DATA_DIR = path.join(__dirname, 'data');
const PURCHASES_FILE = path.join(DATA_DIR, 'purchases.json');

export const getAllPurchases = (req, res) => {
    try {
        const purchasesData = fs.readFileSync(PURCHASES_FILE, 'utf8');
        const purchases = JSON.parse(purchasesData);
        res.json(purchases);
    } catch (err) {
        console.error('Error reading purchases:', err);
        res.status(500).json({ message: 'Internal Server Error'});
    }
};

export const createPurchase = (req, res) => {
    const { name, email, tickets, eventId } = req.body;
    try {
        const purchasesData = fs.readFileSync(PURCHASES_FILE, 'utf8');
        const currentPurchases = JSON.parse(purchasesData);
        const newPurchase = {
            id: currentPurchases.length + 1,
            name,
            email,
            tickets,
            eventId,
            date: new Date().toISOString(),
        };
        currentPurchases.push(newPurchase);
        fs.writeFileSync(PURCHASES_FILE, JSON.stringify(currentPurchases, null, 2), 'utf8');
        res.json( { message: 'Tickets purchased successfully', purchase: newPurchase });
    } catch (err) {
        console.error('Error reading/writing purchases:', err);
        res.status(500).json({ message: 'Internal Server Error'});
    }
};