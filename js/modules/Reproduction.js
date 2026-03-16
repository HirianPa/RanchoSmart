/**
 * RanchoSmart Reproduction Module
 */

const Reproduction = {
    GESTATION_DAYS: 283,

    /**
     * Record a reproduction event (Mating/Insemination)
     */
    addEvent: async (animalId, type, date, bullId = null) => {
        const eventDate = new Date(date);
        const predictionDate = new Date(eventDate);
        predictionDate.setDate(eventDate.getDate() + Reproduction.GESTATION_DAYS);

        const eventId = await rs_db.events.add({
            animalId,
            type, // 'mating' or 'insemination'
            date: eventDate,
            bullId,
            prediction: predictionDate,
            status: 'pending'
        });

        // Update animal status to potentially pregnant
        await rs_db.animals.update(animalId, { 
            reproductiveStatus: 'mating_recorded',
            lastEventDate: eventDate,
            expectedCalving: predictionDate
        });

        return eventId;
    },

    /**
     * Get upcoming births for dashboard/alerts
     */
    getUpcomingBirths: async (daysAhead = 30) => {
        const now = new Date();
        const future = new Date();
        future.setDate(now.getDate() + daysAhead);

        return await rs_db.events
            .where('prediction')
            .between(now, future)
            .toArray();
    },

    /**
     * Register a calving event
     */
    recordCalving: async (animalId, eventId, calfData) => {
        // Update the original pregnancy event
        await rs_db.events.update(eventId, { status: 'completed', calvingDate: new Date() });
        
        // Reset mother status
        await rs_db.animals.update(animalId, { 
            reproductiveStatus: 'weaning',
            lastCalving: new Date()
        });

        // Register the new calf (minimal data first as requested)
        return await rs_db.animals.add({
            ...calfData,
            motherId: animalId,
            status: 'active',
            createdAt: new Date()
        });
    }
};
