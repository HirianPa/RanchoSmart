/**
 * RanchoSmart Finance Module
 */

const FinanceManager = {
    /**
     * Record a transaction
     */
    addTransaction: async (data) => {
        return await rs_db.finances.add({
            ...data,
            amount: parseFloat(data.amount),
            date: new Date(data.date || Date.now()),
            type: data.type, // 'income', 'expense'
            category: data.category // 'sale', 'purchase', 'feed', 'vet', 'labor'
        });
    },

    /**
     * Get financial summary
     */
    getSummary: async () => {
        const transactions = await rs_db.finances.toArray();
        let income = 0;
        let expenses = 0;

        transactions.forEach(t => {
            if (t.type === 'income') income += t.amount;
            else expenses += t.amount;
        });

        return {
            income,
            expenses,
            balance: income - expenses,
            transactions: transactions.slice(-10).reverse() // Last 10
        };
    }
};
