/**
 * RanchoSmart Pasture Management Module
 */

const PastureManager = {
    /**
     * Get all pastures
     */
    getAll: async () => {
        return await rs_db.pastures.toArray();
    },

    /**
     * Add a new pasture
     */
    add: async (data) => {
        return await rs_db.pastures.add({
            name: data.name,
            location: data.location || '',
            area: Number(data.area) || 0,
            status: data.status || 'resting', // 'grazing', 'resting', 'unavailable'
            lastRotation: null,
            grassType: data.grassType || 'Natural'
        });
    },

    /**
     * Record a rotation event
     */
    rotate: async (pastureId, animalCount, notes = '') => {
        const date = new Date();
        await rs_db.pastures.update(pastureId, { 
            status: 'grazing',
            lastRotation: date,
            currentCattleCount: animalCount
        });
        
        return await rs_db.events.add({
            type: 'pasture_move',
            pastureId,
            date,
            notes
        });
    }
};
