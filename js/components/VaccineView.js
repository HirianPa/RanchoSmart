/**
 * RanchoSmart Vaccine and Health View Component
 */

const VaccineView = {
    render: async () => {
        const medicines = await MedicineManager.getAll();
        const expiring = await MedicineManager.getExpiring();
        
        const container = document.createElement('div');
        container.className = 'fade-in';
        container.innerHTML = `
            <div class="view-header">
                <h2>Salud y Medicamentos</h2>
                <button class="btn btn-primary" onclick="VaccineView.showAddMedicineModal()">
                    <span>+</span> Nuevo Medicamento
                </button>
            </div>

            <div class="dashboard-grid">
                <div class="stat-card alert">
                    <span class="stat-value">${expiring.length}</span>
                    <span class="stat-label">Próximos a Caducar</span>
                </div>
                <div class="stat-card">
                    <span class="stat-value">${medicines.length}</span>
                    <span class="stat-label">Total en Inventario</span>
                </div>
            </div>

            <div class="table-container card">
                <div class="card-header">
                    <h3>Inventario de Medicamentos</h3>
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Stock</th>
                            <th>Caducidad</th>
                            <th>Categoría</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${medicines.length ? medicines.map(m => `
                            <tr>
                                <td><strong>${m.name}</strong></td>
                                <td>${m.stock} unidades</td>
                                <td>${new Date(m.expiryDate).toLocaleDateString()}</td>
                                <td>${m.category || 'N/A'}</td>
                                <td>
                                    <span class="status-badge ${new Date(m.expiryDate) < new Date() ? 'rejected' : 'active'}">
                                        ${new Date(m.expiryDate) < new Date() ? 'Caducado' : 'Vigente'}
                                    </span>
                                </td>
                            </tr>
                        `).join('') : '<tr><td colspan="5" style="text-align:center; padding: 20px;">No hay medicamentos registrados.</td></tr>'}
                    </tbody>
                </table>
            </div>
        `;
        return container;
    },

    showAddMedicineModal: () => {
        const modal = UI.createModal('Registrar Medicamento', `
            <form id="medicine-form">
                <div class="form-group">
                    <label class="form-label">Nombre del Medicamento</label>
                    <input type="text" name="name" class="form-control" placeholder="Ej. UltraVac 7" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Stock Inicial</label>
                    <input type="number" name="stock" class="form-control" placeholder="0" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Fecha de Caducidad</label>
                    <input type="date" name="expiryDate" class="form-control" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Categoría</label>
                    <select name="category" class="form-control">
                        <option value="Vacuna">Vacuna</option>
                        <option value="Antibiótico">Antibiótico</option>
                        <option value="Desparasitante">Desparasitante</option>
                        <option value="Vitamina">Vitamina</option>
                    </select>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-secondary" onclick="UI.closeModal()">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </div>
            </form>
        `);

        document.getElementById('medicine-form').onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            
            await MedicineManager.save(data);
            UI.closeModal();
            UI.showNotification('Medicamento guardado con éxito');
            window.RanchoSmart.loadView('vaccines');
        };
    }
};
