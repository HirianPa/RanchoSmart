const PastureView = {
    render: async () => {
        const pastures = await PastureManager.getAll();
        const animals = await AnimalManager.getAll({ status: 'active' });
        
        const view = document.createElement('div');
        view.className = 'pasture-view fade-in';
        
        const header = document.createElement('div');
        header.className = 'view-header-row';
        header.innerHTML = `<h2>Gestión de Potreros</h2>`;
        
        const addBtn = UI.button('Nuevo Potrero', '🌱', () => PastureView.showAddModal());
        header.appendChild(addBtn);

        // Grid for pastures
        const grid = document.createElement('div');
        grid.className = 'stats-grid'; 
        
        if (pastures.length === 0) {
            const emptyHint = document.createElement('p');
            emptyHint.style.cssText = 'padding: 40px; text-align: center; opacity: 0.6; grid-column: 1/-1;';
            emptyHint.textContent = 'No hay potreros registrados.';
            grid.appendChild(emptyHint);
        } else {
            pastures.forEach(p => {
                const animalCount = animals.filter(a => a.pastureId == p.id).length;
                const card = UI.card(p.name, `
                    <div class="pasture-info">
                        <p>📍 <strong>Ubicación:</strong> ${p.location || 'N/A'}</p>
                        <p>📏 <strong>Hectáreas:</strong> ${p.area || '--'} ha</p>
                        <p>🐂 <strong>Cabezas:</strong> ${animalCount} animales</p>
                        <p>🏷️ <strong>Estado:</strong> <span class="status-badge ${p.status}">${p.status}</span></p>
                    </div>
                    <div class="card-footer" style="margin-top: 15px; display: flex; gap: 10px;">
                        <button class="btn btn-secondary btn-small w-full">Rotar</button>
                        <button class="btn btn-danger btn-small" onclick="PastureView.delete(${p.id})">🗑️</button>
                    </div>
                `);
                grid.appendChild(card);
            });
        }
        
        view.appendChild(header);
        view.appendChild(grid);
        
        return view;
    },

    showAddModal: () => {
        UI.createModal('REGISTRAR NUEVO POTRERO', `
            <form id="add-pasture-form">
                <div class="form-group">
                    <label class="form-label">Nombre del Potrero</label>
                    <input type="text" name="name" class="form-control" placeholder="Ej: Las Palmas" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Ubicación / Coordenadas</label>
                    <input type="text" name="location" class="form-control" placeholder="Ej: Sector Norte" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Hectáreas (Área)</label>
                    <input type="number" name="area" class="form-control" step="0.1" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Tipo de Pasto</label>
                    <input type="text" name="grassType" class="form-control" placeholder="Ej: Estrella, Brizantha">
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-secondary" onclick="UI.closeModal()">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar Potrero</button>
                </div>
            </form>
        `);

        document.getElementById('add-pasture-form').onsubmit = async (e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.target));
            await PastureManager.add(data);
            UI.closeModal();
            UI.showNotification('Potrero registrado con éxito');
            window.RanchoSmart.loadView('pastures');
        };
    },

    delete: async (id) => {
        if (confirm('¿Estás seguro de eliminar este potrero?')) {
            await rs_db.pastures.delete(id);
            UI.showNotification('Potrero eliminado');
            window.RanchoSmart.loadView('pastures');
        }
    }
};
