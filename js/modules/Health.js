/**
 * RanchoSmart Health Module
 */

const Health = {
    /**
     * Record a health event (Vaccine, Treatment, Disease)
     */
    addEvent: async (animalId, data) => {
        return await rs_db.events.add({
            animalId,
            type: data.type, // 'vaccine', 'treatment', 'disease'
            name: data.name,
            date: new Date(data.date || Date.now()),
            dosage: data.dosage,
            batch: data.batch,
            notes: data.notes
        });
    },

    /**
     * Get records for an animal
     */
    getRecords: async (animalId) => {
        return await rs_db.events
            .where('animalId')
            .equals(animalId)
            .filter(e => ['vaccine', 'treatment', 'disease'].includes(e.type))
            .reverse()
            .sortBy('date');
    },

    /**
     * Get upcoming vaccines (mocking for now, could be based on age/date)
     */
    getPendingVaccines: async () => {
        // In a real app, this would query a schedule
        return [
            { id: 1, name: 'Aftosa', dueDate: 'En 3 días', count: 45 },
            { id: 2, name: 'Brucelosis', dueDate: 'En 15 días', count: 12 }
        ];
    }
};
