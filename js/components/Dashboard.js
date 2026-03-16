/**
 * RanchoSmart Dashboard View
 */

const Dashboard = {
    render: async () => {
        const stats = await Dashboard.getStats();
        
        const view = document.createElement('div');
        view.className = 'dashboard-view fade-in';
        
        // Grid for stats
        const statsGrid = document.createElement('div');
        statsGrid.className = 'stats-grid';
        
        statsGrid.appendChild(UI.statCard('Total Animales', stats.total, '🐂', 5));
        statsGrid.appendChild(UI.statCard('Vacas Próximas', stats.pregnant, '🤰', -2));
        statsGrid.appendChild(UI.statCard('Salud General', '98%', '🏥', 1, '#4caf50'));
        statsGrid.appendChild(UI.statCard('Peso Total', `${stats.weight}kg`, '⚖️', 3, '#ffa726'));
        
        // Main Grid for content
        const mainGrid = document.createElement('div');
        mainGrid.className = 'dashboard-grid';
        
        // Alerts Section
        const alertsRow = document.createElement('div');
        alertsRow.className = 'col-8';
        alertsRow.appendChild(UI.card('Recomendaciones AI', `
            <div class="ai-recommendation">
                <p>🌿 <strong>Pastoreo:</strong> El Potrero "La Loma" requiere 3 días de descanso adicionales.</p>
                <p>📉 <strong>Crecimiento:</strong> 5 terneros del Lote A muestran ganancia de peso bajo el promedio.</p>
            </div>
        `, { className: 'highlight-card' }));
        
        // Weather Section
        const weatherRow = document.createElement('div');
        weatherRow.className = 'col-4';
        weatherRow.appendChild(UI.card('Clima & Estrés', `
            <div class="weather-widget">
                <div class="temp">28°C</div>
                <div class="condition">Soleado - Estrés calórico bajo</div>
            </div>
        `));

        mainGrid.appendChild(alertsRow);
        mainGrid.appendChild(weatherRow);
        
        view.appendChild(statsGrid);
        view.appendChild(mainGrid);
        
        return view;
    },

    getStats: async () => {
        const animals = await rs_db.animals.where('status').equals('active').toArray();
        const total = animals.length;
        
        let totalWeight = 0;
        let pregnantCount = 0;

        animals.forEach(a => {
            totalWeight += Number(a.lastWeight || 0);
            if (a.sex === 'F' && a.reproStatus === 'pregnant') {
                pregnantCount++;
            }
        });

        return {
            total,
            pregnant: pregnantCount,
            weight: totalWeight
        };
    }
};
