/**
 * RanchoSmart Brand Manager
 * Handles Branding Iron (Fierro) inventory and records.
 */

const BrandManager = {
    getAll: async () => {
        return await rs_db.brands.toArray();
    },

    getById: async (id) => {
        return await rs_db.brands.get(Number(id));
    },

    add: async (brand) => {
        // brand: { name, image (base64) }
        return await rs_db.brands.add(brand);
    },

    update: async (id, brand) => {
        return await rs_db.brands.update(Number(id), brand);
    },

    delete: async (id) => {
        return await rs_db.brands.delete(Number(id));
    }
};
