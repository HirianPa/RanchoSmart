/**
 * RanchoSmart Settings View
 */

const SettingsView = {
    render: async () => {
        const currentTheme = localStorage.getItem('rs-theme') || 'light';
        const view = document.createElement('div');
        view.className = 'settings-view fade-in';
        
        const header = document.createElement('div');
        header.className = 'view-header-row';
        header.innerHTML = `<h2>Ajustes</h2>`;
        
        const configCard = UI.card('General', `
            <div class="form-group">
                <label class="form-label">Idioma</label>
                <select class="form-control" id="lang-select">
                    <option value="es" selected>Español</option>
                    <option value="en">English (Próximamente)</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Tema</label>
                <select class="form-control" id="theme-select">
                    <option value="light" ${currentTheme === 'light' ? 'selected' : ''}>Claro (Teal & Gold)</option>
                    <option value="dark" ${currentTheme === 'dark' ? 'selected' : ''}>Dark Nature</option>
                </select>
            </div>
        `);

        view.appendChild(header);
        view.appendChild(configCard);
        
        // Add event listener for theme change
        setTimeout(() => {
            const select = document.getElementById('theme-select');
            if (select) {
                select.onchange = (e) => {
                    const theme = e.target.value;
                    document.documentElement.setAttribute('data-theme', theme);
                    localStorage.setItem('rs-theme', theme);
                    UI.showNotification(`Tema cambiado a ${theme === 'light' ? 'Claro' : 'Oscuro'}`);
                };
            }
        }, 0);
        
        return view;
    }
};
