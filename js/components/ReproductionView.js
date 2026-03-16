/**
 * RanchoSmart Reproduction & Health View
 */

const ReproductionView = {
    render: async () => {
        const births = await Reproduction.getUpcomingBirths(60);
        const vaccines = await Health.getPendingVaccines();
        
        const view = document.createElement('div');
        view.className = 'repro-view fade-in';
        
        const header = document.createElement('div');
        header.className = 'view-header-row';
        header.innerHTML = `<h2>Reproducción y Salud</h2>`;
        
        // Split Layout
        const grid = document.createElement('div');
        grid.className = 'dashboard-grid';
        
        // Left: Upcoming Births
        const birthsCol = document.createElement('div');
        birthsCol.className = 'col-8';
        birthsCol.appendChild(UI.card('Próximos Partos (60 días)', `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Madre</th>
                        <th>Fecha Probable</th>
                        <th>Días Restantes</th>
                    </tr>
                </thead>
                <tbody>
                    ${births.length ? births.map(b => `
                        <tr>
                            <td>${b.animalId}</td>
                            <td>${b.prediction.toLocaleDateString()}</td>
                            <td>${Math.ceil((b.prediction - new Date()) / (1000*60*60*24))}</td>
                        </tr>
                    `).join('') : '<tr><td colspan="3">No hay partos próximos registrados.</td></tr>'}
                </tbody>
            </table>
        `));

        // Right: Health Alerts
        const healthCol = document.createElement('div');
        healthCol.className = 'col-4';
        healthCol.appendChild(UI.card('Alertas de Salud', `
            <div class="health-alert-list">
                ${vaccines.map(v => `
                    <div class="alert-item">
                        <strong>${v.name}</strong>
                        <span>${v.dueDate} (${v.count} animales)</span>
                    </div>
                `).join('')}
            </div>
        `));

        grid.appendChild(birthsCol);
        grid.appendChild(healthCol);
        
        view.appendChild(header);
        view.appendChild(grid);
        
        return view;
    }
};
