/**
 * RanchoSmart Brand View Component
 * Management interface for Branding Irons (Fierros).
 */

const BrandView = {
    render: async () => {
        const brands = await BrandManager.getAll();
        const container = document.createElement('div');
        container.className = 'fade-in';
        
        container.innerHTML = `
            <div class="view-header-row">
                <h2>Mis Fierros (Marcas)</h2>
                <button class="btn btn-primary" onclick="BrandView.showAddBrandModal()">
                    + Nuevo Fierro
                </button>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <span class="stat-label">Total Fierros</span>
                    <span class="stat-value">${brands.length}</span>
                </div>
            </div>

            <div class="card">
                <div class="card-title">Listado de Fierros</div>
                <div class="brands-grid">
                    ${brands.length === 0 ? '<p style="padding: 24px; text-align: center; color: var(--text-secondary);">No hay fierros registrados aún.</p>' : ''}
                    ${brands.map(brand => `
                        <div class="brand-item-card">
                            <div class="brand-preview">
                                ${brand.image ? `<img src="${brand.image}" alt="${brand.name}">` : '<div class="no-brand-img">No Image</div>'}
                            </div>
                            <div class="brand-info">
                                <h3>${brand.name}</h3>
                                <div class="brand-actions">
                                    <button class="btn btn-small" onclick="BrandView.showEditModal(${brand.id})">✏️</button>
                                    <button class="btn btn-small btn-danger" onclick="BrandView.deleteBrand(${brand.id})">🗑️</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        return container;
    },

    showAddBrandModal: () => {
        UI.createModal('REGISTRAR NUEVO FIERRO', `
            <div class="form-group">
                <label class="form-label">Nombre del Fierro</label>
                <input type="text" id="brand-name" class="form-control" placeholder="Ej: Fierro de la S" required>
            </div>
            <div class="form-group">
                <label class="form-label">Imagen / Foto del Fierro</label>
                <div id="brand-image-capture" class="camera-preview" style="height: 200px; margin-bottom: 12px;">
                    <p style="padding-top: 80px;">Presiona para Capturar Marca</p>
                </div>
                <input type="file" id="brand-image-input" accept="image/*" style="display: none;">
                <input type="hidden" id="brand-image-data">
                <button class="btn btn-secondary w-full" onclick="document.getElementById('brand-image-input').click()">
                    📸 Capturar o Seleccionar Imagen
                </button>
            </div>
            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="UI.closeModal()">CANCELAR</button>
                <button class="btn btn-primary" onclick="BrandView.saveNewBrand()">GUARDAR</button>
            </div>
        `);

        // Handle image input
        const fileInput = document.getElementById('brand-image-input');
        const preview = document.getElementById('brand-image-capture');
        const dataInput = document.getElementById('brand-image-data');

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    preview.innerHTML = `<img src="${event.target.result}" style="width: 100%; height: 100%; object-fit: contain;">`;
                    dataInput.value = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    },

    showEditModal: async (id) => {
        const brand = await BrandManager.getById(id);
        UI.createModal('EDITAR FIERRO', `
            <div class="form-group">
                <label class="form-label">Nombre del Fierro</label>
                <input type="text" id="edit-brand-name" class="form-control" value="${brand.name}" required>
            </div>
            <div class="form-group">
                <label class="form-label">Imagen actual</label>
                <div id="edit-brand-preview" class="camera-preview" style="height: 200px; margin-bottom: 12px;">
                    <img src="${brand.image}" style="width: 100%; height: 100%; object-fit: contain;">
                </div>
                <input type="file" id="edit-brand-input" accept="image/*" style="display: none;">
                <input type="hidden" id="edit-brand-data" value="${brand.image}">
                <button class="btn btn-secondary w-full" onclick="document.getElementById('edit-brand-input').click()">
                    📸 Cambiar Imagen
                </button>
            </div>
            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="UI.closeModal()">CANCELAR</button>
                <button class="btn btn-primary" onclick="BrandView.updateBrand(${id})">ACTUALIZAR</button>
            </div>
        `);

        document.getElementById('edit-brand-input').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    document.getElementById('edit-brand-preview').innerHTML = `<img src="${event.target.result}" style="width: 100%; height: 100%; object-fit: contain;">`;
                    document.getElementById('edit-brand-data').value = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    },

    saveNewBrand: async () => {
        const name = document.getElementById('brand-name').value;
        const image = document.getElementById('brand-image-data').value;

        if (!name) {
            UI.showNotification('El nombre es obligatorio', 'error');
            return;
        }

        await BrandManager.add({ name, image });
        UI.showNotification('Fierro registrado con éxito');
        UI.closeModal();
        app.loadView('brands');
    },

    updateBrand: async (id) => {
        const name = document.getElementById('edit-brand-name').value;
        const image = document.getElementById('edit-brand-data').value;

        await BrandManager.update(id, { name, image });
        UI.showNotification('Fierro actualizado');
        UI.closeModal();
        app.loadView('brands');
    },

    deleteBrand: async (id) => {
        if (confirm('¿Estás seguro de que deseas eliminar este fierro?')) {
            await BrandManager.delete(id);
            UI.showNotification('Fierro eliminado');
            app.loadView('brands');
        }
    }
};
