// RanchoSmart - Main Application File

class App {
    constructor() {
        this.currentView = 'dashboard';
        this.applySavedTheme();
        this.init();
    }

    applySavedTheme() {
        const theme = localStorage.getItem('rs-theme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);
    }

    async init() {
        console.log('RanchoSmart Initializing...');
        
        // Register Service Worker
        this.registerServiceWorker();

        // Initialize Router
        this.setupRouter();

        // Initial Data Load
        await this.updateStats();

        // Handle initial route
        this.handleRoute();
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./js/sw.js')
                .then(() => console.log('Service Worker Registered'))
                .catch(err => console.error('SW Registration Failed', err));
        }
    }

    setupRouter() {
        window.addEventListener('hashchange', () => this.handleRoute());
        
        // Navigation clicks
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const view = e.currentTarget.getAttribute('data-view');
                window.location.hash = view;
            });
        });

        // Mobile menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                document.getElementById('sidebar').classList.toggle('active');
            });
        }
    }

    async handleRoute() {
        const hash = window.location.hash.substring(1) || 'dashboard';
        this.currentView = hash;

        // Update Nav UI
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.toggle('active', nav.getAttribute('data-view') === hash);
        });

        // Update Title
        const titleMap = {
            'dashboard': 'Dashboard',
            'animals': 'Ganado',
            'reproduction': 'Reproducción',
            'pastures': 'Potreros',
            'vaccines': 'Vacunas',
            'finance': 'Finanzas',
            'settings': 'Ajustes'
        };
        document.getElementById('view-title').textContent = titleMap[hash] || 'RanchoSmart';

        // Load View Content
        this.loadView(hash);
    }

    async loadView(view) {
        console.log(`Loading view: ${view}`);
        const container = document.getElementById('view-container');
        
        // Reset layout from field mode if needed
        document.getElementById('sidebar').style.display = 'flex';
        document.querySelector('.top-bar').style.display = 'flex';
        document.getElementById('main-content').style.padding = 'var(--spacing-md)';

        container.innerHTML = '';
        if (view === 'dashboard') {
            container.appendChild(await Dashboard.render());
        } else if (view === 'animals') {
            container.appendChild(await AnimalDetail.render());
        } else if (view === 'reproduction') {
            container.appendChild(await ReproductionView.render());
        } else if (view === 'pastures') {
            container.appendChild(await PastureView.render());
        } else if (view === 'vaccines') {
            container.appendChild(await VaccineView.render());
        } else if (view === 'brands') {
            container.appendChild(await BrandView.render());
        } else if (view === 'field-mode') {
            container.appendChild(await FieldModeView.render());
            document.getElementById('sidebar').style.display = 'none';
            document.querySelector('.top-bar').style.display = 'none';
            document.getElementById('main-content').style.padding = '0';
        } else if (view === 'finance') {
            container.appendChild(await FinanceView.render());
        } else if (view === 'settings') {
            container.appendChild(await SettingsView.render());
        } else {
            container.innerHTML = `<div class="view fade-in"><h2>Sección ${view} en construcción</h2></div>`;
        }
    }

    async updateStats() {
        const totalAnimals = await rs_db.animals.count();
        document.getElementById('stat-total-animals').textContent = totalAnimals || '0';
        
        // Mocking other stats for initial demo
        document.getElementById('stat-pregnant-cows').textContent = '12';
    }
}

// Start App when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.RanchoSmart = new App();
});
