// RanchoSmart - Database Configuration
// Using Dexie.js for offline-first capability

const db = new Dexie('RanchoSmartDB');

// Define database schema
db.version(3).stores({
    animals: '++id, earTag, internalId, breed, sex, birthDate, status, pastureId',
    events: '++id, animalId, type, date, medicineId, status',
    pastures: '++id, name, status',
    finances: '++id, type, amount, date, category',
    medicines: '++id, name, stock, expiryDate, category',
    brands: '++id, name, image'
});

window.rs_db = db;
