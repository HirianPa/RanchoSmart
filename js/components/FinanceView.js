/**
 * RanchoSmart Finance View
 */

const FinanceView = {
    render: async () => {
        const summary = await FinanceManager.getSummary();
        
        const view = document.createElement('div');
        view.className = 'finance-view fade-in';
        
        const header = document.createElement('div');
        header.className = 'view-header-row';
        header.innerHTML = `<h2>Gestión Financiera</h2>`;
        
        const addBtn = UI.button('Registrar Gasto/Ingreso', '💸', () => alert('Registro rápido de finanzas en desarrollo'));
        header.appendChild(addBtn);

        // Stats Row
        const statsGrid = document.createElement('div');
        statsGrid.className = 'stats-grid';
        statsGrid.appendChild(UI.statCard('Ingresos Totales', `$${summary.income.toLocaleString()}`, '📈', null, '#4caf50'));
        statsGrid.appendChild(UI.statCard('Gastos Totales', `$${summary.expenses.toLocaleString()}`, '📉', null, '#ff5252'));
        statsGrid.appendChild(UI.statCard('Balance Neto', `$${summary.balance.toLocaleString()}`, '⚖️', null, summary.balance >= 0 ? '#81c784' : '#ff8a80'));

        // Recent Transactions
        const reportCard = UI.card('Transacciones Recientes', `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Concepto</th>
                        <th>Categoría</th>
                        <th>Monto</th>
                    </tr>
                </thead>
                <tbody>
                    ${summary.transactions.length ? summary.transactions.map(t => `
                        <tr>
                            <td>${t.date.toLocaleDateString()}</td>
                            <td>${t.type === 'income' ? 'Venta' : 'Gasto'}</td>
                            <td>${t.category}</td>
                            <td style="color: ${t.type === 'income' ? '#81c784' : '#ff8a80'}; font-weight: 700;">
                                ${t.type === 'income' ? '+' : '-'}$${t.amount.toLocaleString()}
                            </td>
                        </tr>
                    `).join('') : '<tr><td colspan="4" style="text-align:center; padding: 20px;">Sin transacciones recientes.</td></tr>'}
                </tbody>
            </table>
        `);

        view.appendChild(header);
        view.appendChild(statsGrid);
        view.appendChild(reportCard);
        
        return view;
    }
};
