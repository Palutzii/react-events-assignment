import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const DATA_DIR = path.join(__dirname, 'data');
const PURCHASES_FILE = path.join(DATA_DIR, 'purchases.json');

export const createPurchasesFileIfNotExists = () => {
    if (!fs.existsSync(PURCHASES_FILE)) {
        try {
            fs.writeFileSync(PURCHASES_FILE, '[]', 'utf8');
            console.log('Created purchases.json file.');
        } catch (err) {
            console.error('Error creating purchases.json file:', err);
        }
    }
};
