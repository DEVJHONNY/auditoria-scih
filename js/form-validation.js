export function validarFormulario(formData, tipo) {
    const errors = [];

    // Validação geral
    const nome = formData.get('nome')?.trim();
    if (!nome || nome.length < 3) {
        errors.push('Nome do paciente deve ter pelo menos 3 caracteres');
    }

    // Validação de data
    const dataAuditoria = new Date(formData.get('data'));
    const hoje = new Date();
    hoje.setHours(23, 59, 59, 999);

    if (dataAuditoria > hoje) {
        errors.push('A data da auditoria não pode ser futura');
    }

    // Validações específicas por tipo
    switch (tipo) {
        case 'cvc':
            validarCVC(formData, errors);
            break;
        case 'vm':
            validarVM(formData, errors);
            break;
        case 'sonda':
            validarSonda(formData, errors);
            break;
    }

    return { isValid: errors.length === 0, errors };
}

function validarCVC(formData, errors) {
    const indicacao = formData.get('indicacaoCVC');
    const curativoIntegro = formData.get('curativoIntegro');

    if (indicacao === '0' && curativoIntegro === '0') {
        errors.push('Atenção: CVC sem indicação e curativo não íntegro');
    }
}

function validarVM(formData, errors) {
    const pressaoCuff = Number(formData.get('pressaoCuffMedida'));
    if (isNaN(pressaoCuff) || pressaoCuff < 20 || pressaoCuff > 30) {
        errors.push('Pressão do Cuff deve estar entre 20-30 cmH2O');
    }
}

function validarSonda(formData, errors) {
    const indicacao = formData.get('indicacaoSVD');
    const sistemaFechado = formData.get('sistemaFechado');

    if (indicacao === '0' && sistemaFechado === '0') {
        errors.push('Atenção: SVD sem indicação e sistema não fechado');
    }
}

export function mostrarErros(errors, formId) {
    // Remove erros anteriores
    const form = document.getElementById(formId);
    form.querySelectorAll('.error-message').forEach(el => el.remove());
    form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

    errors.forEach(error => {
        showToast(error, 'error');
    });
}

export function confirmarEnvio(message = 'Confirma o envio deste registro?') {
    return new Promise(resolve => {
        const modal = document.createElement('div');
        modal.className = 'modal fade-in';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Confirmação</h3>
                <p>${message}</p>
                <div class="modal-buttons">
                    <button class="button-primary" onclick="this.closest('.modal').dataset.result='true'">Confirmar</button>
                    <button class="button-secondary" onclick="this.closest('.modal').dataset.result='false'">Cancelar</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const handleResult = (result) => {
            modal.classList.add('fade-out');
            setTimeout(() => modal.remove(), 300);
            resolve(result);
        };

        modal.addEventListener('click', e => {
            if (e.target === modal) {
                handleResult(false);
            } else if (modal.dataset.result) {
                handleResult(modal.dataset.result === 'true');
            }
        });
    });
}
