/**
 * RanchoSmart Animal Management Module
 */

const AnimalManager = {
    /**
     * Get all animals with optional filtering (default: only active)
     */
    getAll: async (filters = { status: 'active' }) => {
        let collection = rs_db.animals;
        if (filters.status) {
            return await collection.where('status').equals(filters.status).toArray();
        }
        return await collection.toArray();
    },

    /**
     * Set status for multiple animals
     */
    setBatchStatus: async (ids, status) => {
        return await rs_db.animals.where('id').anyOf(ids).modify({ status });
    },

    /**
     * Get pasture name by ID
     */
    getPastureName: async (pastureId) => {
        if (!pastureId) return 'N/A';
        const p = await rs_db.pastures.get(Number(pastureId));
        return p ? p.name : 'N/A';
    },

    /**
     * Add a new animal
     */
    add: async (animalData) => {
        return await rs_db.animals.add({
            ...animalData,
            createdAt: new Date(),
            status: animalData.status || 'active',
            photoUrl: animalData.photoUrl || ''
        });
    },

    /**
     * Update an existing animal
     */
    update: async (id, updates) => {
        return await rs_db.animals.update(id, updates);
    },

    /**
     * Get animal by ID with history
     */
    getById: async (id) => {
        const animal = await rs_db.animals.get(id);
        if (!animal) return null;
        
        const history = await rs_db.events.where('animalId').equals(id).reverse().sortBy('date');
        return { ...animal, history };
    },

    /**
     * Record a weight event
     */
    addWeight: async (animalId, weight, note = '') => {
        const date = new Date();
        await rs_db.events.add({
            animalId,
            type: 'weight',
            value: weight,
            date,
            note
        });
        return await rs_db.animals.update(animalId, { lastWeight: weight, lastWeightDate: date });
    }
};
