/**
 * RanchoSmart Medicine and Inventory Manager
 */

const MedicineManager = {
    /**
     * Get all medicines from inventory
     */
    getAll: async () => {
        return await rs_db.medicines.toArray();
    },

    /**
     * Add or update a medicine
     */
    save: async (data) => {
        if (data.id) {
            return await rs_db.medicines.update(data.id, data);
        }
        return await rs_db.medicines.add({
            ...data,
            stock: Number(data.stock) || 0,
            expiryDate: new Date(data.expiryDate)
        });
    },

    /**
     * Register a vaccination/treatment event
     */
    recordVaccination: async (animalId, medicineId, dose, note = '') => {
        const medicine = await rs_db.medicines.get(medicineId);
        if (!medicine || medicine.stock < dose) {
            throw new Error('Stock insuficiente');
        }

        // Add event
        await rs_db.events.add({
            animalId,
            medicineId,
            type: 'vaccine',
            value: dose,
            date: new Date(),
            note,
            status: 'completed'
        });

        // Update stock
        return await rs_db.medicines.update(medicineId, {
            stock: medicine.stock - dose
        });
    },

    /**
     * Get expiring medicines (within 30 days)
     */
    getExpiring: async (days = 30) => {
        const threshold = new Date();
        threshold.setDate(threshold.getDate() + days);
        
        return await rs_db.medicines
            .where('expiryDate')
            .below(threshold)
            .toArray();
    }
};
