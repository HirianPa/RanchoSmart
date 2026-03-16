/**
 * RanchoSmart UI Components
 * Shared reusable UI elements with a premium feel
 */

const UI = {
    /**
     * Creates a premium card element
     */
    card: (title, content, options = {}) => {
        const card = document.createElement('div');
        card.className = `card fade-in ${options.className || ''}`;
        
        let html = '';
        if (title) html += `<h3 class="card-title">${title}</h3>`;
        html += `<div class="card-content">${content}</div>`;
        
        card.innerHTML = html;
        return card;
    },

    /**
     * Creates a premium button
     */
    button: (text, icon, onClick, type = 'primary') => {
        const btn = document.createElement('button');
        btn.className = `btn btn-${type}`;
        btn.innerHTML = `${icon ? `<span class="btn-icon">${icon}</span>` : ''} <span class="btn-text">${text}</span>`;
        btn.onclick = onClick;
        return btn;
    },

    /**
     * Creates a stats card specifically for the dashboard
     */
    statCard: (label, value, icon, trend = null, color = null) => {
        const card = document.createElement('div');
        card.className = 'stat-card';
        if (color) card.style.setProperty('--accent-vibrant', color);
        
        card.innerHTML = `
            <div class="stat-header">
                <span class="stat-icon">${icon}</span>
                ${trend ? `<span class="stat-trend ${trend > 0 ? 'up' : 'down'}">${trend > 0 ? '↑' : '↓'} ${Math.abs(trend)}%</span>` : ''}
            </div>
            <div class="stat-body">
                <span class="stat-value">${value}</span>
                <span class="stat-label">${label}</span>
            </div>
        `;
        return card;
    },

    createModal: (title, contentHTML) => {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay fade-in';
        overlay.innerHTML = `
            <div class="modal-content card">
                <div class="modal-header">
                    <h3>${title}</h3>
                </div>
                <div class="modal-body">
                    ${contentHTML}
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        window.closeRSModal = () => overlay.remove();
        return overlay;
    },

    closeModal: () => {
        if (window.closeRSModal) {
            window.closeRSModal();
            window.closeRSModal = null;
        } else {
            const overlay = document.querySelector('.modal-overlay');
            if (overlay) overlay.remove();
        }
    },

    showNotification: (text, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type} fade-in`;
        toast.textContent = text;
        if (!document.getElementById('toast-styles')) {
            const style = document.createElement('style');
            style.id = 'toast-styles';
            style.textContent = `
                .toast {
                    position: fixed; bottom: 20px; right: 20px;
                    background: var(--bg-card); color: white;
                    padding: 12px 24px; border-radius: 8px;
                    border-left: 4px solid var(--accent-vibrant);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.5); z-index: 10000;
                    transition: opacity 0.5s;
                }
                .toast-error { border-left-color: #ff4d4d; }
            `;
            document.head.appendChild(style);
        }
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }
};
