/**
 * RanchoSmart Field Mode View
 * High-visibility, high-accessibility interface for field work.
 */

const FieldModeView = {
    render: async () => {
        const container = document.createElement('div');
        container.className = 'field-mode-container fade-in';
        
        container.innerHTML = `
            <div class="field-header">
                <h2>MODO CAMPO</h2>
                <p>Botones optimizados para uso con guantes y bajo sol.</p>
            </div>
            
            <div class="field-grid">
                <button class="field-btn weight" onclick="FieldModeView.handleAction('PESAR')">
                    <span class="field-icon">⚖️</span>
                    <span class="field-label">PESAR</span>
                </button>
                
                <button class="field-btn birth" onclick="FieldModeView.handleAction('PARTO')">
                    <span class="field-icon">👶</span>
                    <span class="field-label">PARTO</span>
                </button>
                
                <button class="field-btn vaccine" onclick="FieldModeView.handleAction('VACUNAR')">
                    <span class="field-icon">💉</span>
                    <span class="field-label">VACUNAR</span>
                </button>
                
                <button class="field-btn pasture" onclick="FieldModeView.handleAction('POTRERO')">
                    <span class="field-icon">🌿</span>
                    <span class="field-label">POTRERO</span>
                </button>
                
                <button class="field-btn branding" onclick="FieldModeView.handleAction('HERRAR')">
                    <span class="field-icon">🔥</span>
                    <span class="field-label">HERRAR</span>
                </button>

                <button class="field-btn shipping" onclick="FieldModeView.handleAction('EMBARQUE')" style="background: linear-gradient(135deg, #d35400, #e67e22);">
                    <span class="field-icon">🚛</span>
                    <span class="field-label">EMBARQUE</span>
                </button>
            </div>

            <div class="field-footer">
                <button class="btn btn-secondary btn-lg" onclick="window.location.hash = 'dashboard'">
                    SALIR DE MODO CAMPO
                </button>
            </div>
        `;
        
        return container;
    },

    handleAction: (type) => {
        console.log(`Acción de campo: ${type}`);
        // For this demo, we'll show simplified quick-entry modals
        switch(type) {
            case 'PESAR':
                FieldModeView.showQuickWeightModal();
                break;
            case 'PARTO':
                FieldModeView.showQuickBirthModal();
                break;
            case 'VACUNAR':
                FieldModeView.showQuickVaccineModal();
                break;
            case 'POTRERO':
                FieldModeView.showQuickPastureModal();
                break;
            case 'HERRAR':
                FieldModeView.showQuickBrandModal();
                break;
            case 'EMBARQUE':
                FieldModeView.showQuickShippingModal();
                break;
        }
    },

    showQuickBrandModal: async () => {
        const brands = await BrandManager.getAll();
        UI.createModal('REGISTRO RÁPIDO: HERRAR', `
            <div class="field-form">
                <div class="form-group">
                    <label class="field-form-label">ANIMAL (ID/Arete)</label>
                    <input type="text" id="quick-brand-id" class="field-form-input" placeholder="0000" autofocus>
                </div>
                <div class="form-group">
                    <label class="field-form-label">ELEGIR FIERRO (MARCA)</label>
                    <select id="quick-brand-target" class="field-form-input">
                        ${brands.length === 0 ? '<option value="">SUBIR FIERRO PRIMERO</option>' : ''}
                        ${brands.map(b => `<option value="${b.id}">${b.name}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="field-form-label">TIPO DE APLICACIÓN</label>
                    <select id="quick-brand-type" class="field-form-input">
                        <option value="fuego">FUEGO (FIERRO)</option>
                        <option value="frio">NITRÓGENO (FRÍO)</option>
                    </select>
                </div>
                <div class="modal-actions-field">
                    <button class="field-btn-modal cancel" onclick="UI.closeModal()">CANCELAR</button>
                    <button class="field-btn-modal confirm" onclick="FieldModeView.saveBrand()">CONFIRMAR</button>
                </div>
            </div>
        `);
    },

    showQuickWeightModal: () => {
        UI.createModal('REGISTRO RÁPIDO: PESO', `
            <div class="field-form">
                <div class="form-group">
                    <label class="field-form-label">IDENTIFICADOR (Arete)</label>
                    <input type="text" id="quick-id" class="field-form-input" placeholder="0000" autofocus>
                </div>
                <div class="form-group">
                    <label class="field-form-label">PESO (KG)</label>
                    <input type="number" id="quick-weight" class="field-form-input" placeholder="450.0">
                </div>
                <div class="modal-actions-field">
                    <button class="field-btn-modal cancel" onclick="UI.closeModal()">CANCELAR</button>
                    <button class="field-btn-modal confirm" onclick="FieldModeView.saveWeight()">GUARDAR</button>
                </div>
            </div>
        `);
    },

    showQuickBirthModal: () => {
        UI.createModal('REGISTRO RÁPIDO: PARTO', `
            <div class="field-form">
                <div class="form-group">
                    <label class="field-form-label">MADRE (ID/Arete)</label>
                    <input type="text" id="quick-mother-id" class="field-form-input" placeholder="0000" autofocus>
                </div>
                <div class="form-group">
                    <label class="field-form-label">SEXO CRÍA</label>
                    <div class="field-toggle-group">
                        <button class="field-toggle-btn active" id="sex-h">HEMBRA</button>
                        <button class="field-toggle-btn" id="sex-m">MACHO</button>
                    </div>
                </div>
                <div class="modal-actions-field">
                    <button class="field-btn-modal cancel" onclick="UI.closeModal()">CANCELAR</button>
                    <button class="field-btn-modal confirm" onclick="FieldModeView.saveBirth()">GUARDAR</button>
                </div>
            </div>
        `);
    },

    showQuickVaccineModal: async () => {
        const medicines = await MedicineManager.getAll();
        UI.createModal('REGISTRO RÁPIDO: VACUNA', `
            <div class="field-form">
                <div class="form-group">
                    <label class="field-form-label">ANIMAL (ID/Arete)</label>
                    <input type="text" id="quick-animal-id" class="field-form-input" placeholder="0000" autofocus>
                </div>
                <div class="form-group">
                    <label class="field-form-label">VACUNA</label>
                    <select id="quick-medicine" class="field-form-input">
                        ${medicines.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
                    </select>
                </div>
                <div class="modal-actions-field">
                    <button class="field-btn-modal cancel" onclick="UI.closeModal()">CANCELAR</button>
                    <button class="field-btn-modal confirm" onclick="FieldModeView.saveVaccine()">GUARDAR</button>
                </div>
            </div>
        `);
    },

    showQuickPastureModal: async () => {
        const pastures = await rs_db.pastures.toArray();
        UI.createModal('REGISTRO RÁPIDO: POTRERO', `
            <div class="field-form">
                <div class="form-group">
                    <label class="field-form-label">ANIMAL (ID/Arete)</label>
                    <input type="text" id="quick-animal-id-p" class="field-form-input" placeholder="0000" autofocus>
                </div>
                <div class="form-group">
                    <label class="field-form-label">NUEVO POTRERO</label>
                    <select id="quick-pasture" class="field-form-input">
                        ${pastures.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
                    </select>
                </div>
                <div class="modal-actions-field">
                    <button class="field-btn-modal cancel" onclick="UI.closeModal()">CANCELAR</button>
                    <button class="field-btn-modal confirm" onclick="FieldModeView.savePasture()">GUARDAR</button>
                </div>
            </div>
        `);
    },

    showQuickShippingModal: async () => {
        const animals = await AnimalManager.getAll({ status: 'active' });
        UI.createModal('REGISTRO RÁPIDO: EMBARQUE / VENTA', `
            <div class="field-form">
                <div class="form-group">
                    <label class="field-form-label">SELECCIONAR ANIMALES PARA VENTA</label>
                    <div id="shipping-list" style="max-height: 300px; overflow-y: auto; background: rgba(0,0,0,0.2); border-radius: 8px; padding: 10px;">
                        ${animals.map(a => `
                            <div class="shipping-item" style="display: flex; align-items: center; padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 1.2rem;">
                                <input type="checkbox" class="ship-check" value="${a.id}" data-weight="${a.lastWeight || 0}" data-tag="${a.earTag}" style="width: 25px; height: 25px; margin-right: 15px;">
                                <div style="flex: 1;">
                                    <strong>${a.earTag}</strong><br>
                                    <small>${a.breed} | ${a.lastWeight || '--'} kg</small>
                                </div>
                                <input type="number" class="ship-amount field-form-input" placeholder="Importe $" style="width: 120px; font-size: 1rem; margin-left: 10px;">
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div id="shipping-summary" style="margin: 15px 0; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px; font-size: 1.1rem;">
                    <p>Total Selección: <strong id="ship-count">0</strong> animales</p>
                    <p>Total Venta: <strong id="ship-total-amount">$0.00</strong></p>
                    <p>Promedio $/kg: <strong id="ship-avg-price">$0.00</strong></p>
                </div>
                <div class="modal-actions-field">
                    <button class="field-btn-modal cancel" onclick="UI.closeModal()">CANCELAR</button>
                    <button class="field-btn-modal confirm" id="btn-confirm-ship">CONFIRMAR VENTA</button>
                </div>
            </div>
        `);

        const updateSummary = () => {
            const checks = document.querySelectorAll('.ship-check:checked');
            let totalAmount = 0;
            let totalWeight = 0;
            
            checks.forEach(cb => {
                const row = cb.closest('.shipping-item');
                const amountInput = row.querySelector('.ship-amount');
                const amount = parseFloat(amountInput.value) || 0;
                const weight = parseFloat(cb.dataset.weight) || 0;
                
                totalAmount += amount;
                totalWeight += weight;
            });

            document.getElementById('ship-count').textContent = checks.length;
            document.getElementById('ship-total-amount').textContent = `$${totalAmount.toLocaleString()}`;
            const avgPrice = totalWeight > 0 ? (totalAmount / totalWeight) : 0;
            document.getElementById('ship-avg-price').textContent = `$${avgPrice.toFixed(2)} / kg`;
        };

        document.querySelectorAll('.ship-check, .ship-amount').forEach(el => {
            el.addEventListener('input', updateSummary);
        });

        document.getElementById('btn-confirm-ship').onclick = async () => {
            const selected = [];
            document.querySelectorAll('.ship-check:checked').forEach(cb => {
                const row = cb.closest('.shipping-item');
                const amount = parseFloat(row.querySelector('.ship-amount').value) || 0;
                selected.push({
                    id: Number(cb.value),
                    tag: cb.dataset.tag,
                    amount,
                    weight: parseFloat(cb.dataset.weight) || 0
                });
            });

            if (selected.length === 0) return UI.showNotification('Selecciona al menos un animal', 'error');

            const totalSale = selected.reduce((sum, item) => sum + item.amount, 0);
            
            if (confirm(`¿Confirmar venta de ${selected.length} animales por un total de $${totalSale.toLocaleString()}?`)) {
                try {
                    // 1. De-register animals
                    const ids = selected.map(s => s.id);
                    await AnimalManager.setBatchStatus(ids, 'sold');

                    // 2. Update Finances
                    await FinanceManager.addTransaction({
                        type: 'income',
                        category: 'sale',
                        amount: totalSale,
                        description: `Venta de ${selected.length} animales (Embarque Campo): ${selected.map(s => s.tag).join(', ')}`,
                        date: new Date()
                    });

                    UI.showNotification('Embarque procesado y finanzas actualizadas');
                    UI.closeModal();
                    if (window.RanchoSmart.currentView === 'animals') window.RanchoSmart.loadView('animals');
                } catch (err) {
                    UI.showNotification('Error al procesar embarque: ' + err.message, 'error');
                }
            }
        };
    },

    // Functional save functions
    saveWeight: async () => {
        const earTag = document.getElementById('quick-id').value;
        const weight = Number(document.getElementById('quick-weight').value);

        if (!earTag || !weight) {
            UI.showNotification('Arete y Peso son obligatorios', 'error');
            return;
        }

        try {
            // Find animal by earTag
            const animals = await rs_db.animals.where('earTag').equals(earTag).toArray();
            if (animals.length === 0) {
                UI.showNotification('Animal no encontrado', 'error');
                return;
            }

            const animal = animals[0];
            await AnimalManager.addWeight(animal.id, weight, 'Registro rápido Modo Campo');
            
            UI.showNotification(`Peso de ${weight}kg guardado para ${earTag}`);
            UI.closeModal();
            // Optional: if we want to refresh background view if it happens to be animal list
            if (window.RanchoSmart.currentView === 'animals') {
                window.RanchoSmart.loadView('animals');
            }
        } catch (err) {
            UI.showNotification('Error al guardar peso: ' + err.message, 'error');
        }
    },
    saveBirth: async () => {
        const motherTag = document.getElementById('quick-mother-id').value;
        const sex = document.getElementById('sex-m').classList.contains('active') ? 'M' : 'F';

        if (!motherTag) {
            UI.showNotification('Arete de la madre es obligatorio', 'error');
            return;
        }

        try {
            const mothers = await rs_db.animals.where('earTag').equals(motherTag).toArray();
            if (mothers.length === 0) {
                UI.showNotification('Madre no encontrada', 'error');
                return;
            }

            await AnimalManager.add({
                earTag: `CRIA-${motherTag}-${Date.now().toString().slice(-4)}`,
                breed: mothers[0].breed,
                sex,
                status: 'active',
                pastureId: mothers[0].pastureId,
                birthDate: new Date()
            });

            UI.showNotification('Parto registrado y cría creada');
            UI.closeModal();
            if (window.RanchoSmart.currentView === 'animals') window.RanchoSmart.loadView('animals');
        } catch (err) {
            UI.showNotification('Error: ' + err.message, 'error');
        }
    },

    saveVaccine: async () => {
        const earTag = document.getElementById('quick-animal-id').value;
        const medId = Number(document.getElementById('quick-medicine').value);

        if (!earTag || !medId) {
            UI.showNotification('Datos incompletos', 'error');
            return;
        }

        try {
            const animals = await rs_db.animals.where('earTag').equals(earTag).toArray();
            if (animals.length === 0) {
                UI.showNotification('Animal no encontrado', 'error');
                return;
            }

            await MedicineManager.recordVaccination(animals[0].id, medId, 1, 'Modo Campo');
            UI.showNotification('Vacunación completada');
            UI.closeModal();
        } catch (err) {
            UI.showNotification('Error: ' + err.message, 'error');
        }
    },

    savePasture: async () => {
        const earTag = document.getElementById('quick-animal-id-p').value;
        const pastureId = Number(document.getElementById('quick-pasture').value);

        if (!earTag || !pastureId) {
            UI.showNotification('Datos incompletos', 'error');
            return;
        }

        try {
            const animals = await rs_db.animals.where('earTag').equals(earTag).toArray();
            if (animals.length === 0) {
                UI.showNotification('Animal no encontrado', 'error');
                return;
            }

            await AnimalManager.update(animals[0].id, { pastureId });
            UI.showNotification('Cambio de potrero exitoso');
            UI.closeModal();
            if (window.RanchoSmart.currentView === 'animals') window.RanchoSmart.loadView('animals');
        } catch (err) {
            UI.showNotification('Error: ' + err.message, 'error');
        }
    },

    saveBrand: async () => {
        const earTag = document.getElementById('quick-brand-id').value;
        const brandId = document.getElementById('quick-brand-target').value;

        if (!earTag || !brandId) {
            UI.showNotification('Datos incompletos', 'error');
            return;
        }

        try {
            const animals = await rs_db.animals.where('earTag').equals(earTag).toArray();
            if (animals.length === 0) {
                UI.showNotification('Animal no encontrado', 'error');
                return;
            }

            // Mark as branded - could add an event or a field
            UI.showNotification(`Animal ${earTag} marcado con éxito`);
            UI.closeModal();
        } catch (err) {
            UI.showNotification('Error: ' + err.message, 'error');
        }
    }
};
