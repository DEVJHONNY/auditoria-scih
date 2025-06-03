export function realizarBackup() {
    const dados = {
        cvc: JSON.parse(localStorage.getItem('auditoria_data_cvc') || '[]'),
        vm: JSON.parse(localStorage.getItem('auditoria_data_vm') || '[]'),
        sonda: JSON.parse(localStorage.getItem('auditoria_data_sonda') || '[]'),
        timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_auditoria_${formatDate(new Date())}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

export async function restaurarBackup(file) {
    try {
        const texto = await file.text();
        const dados = JSON.parse(texto);

        // Validar estrutura do backup
        if (!dados.timestamp || !dados.cvc || !dados.vm || !dados.sonda) {
            throw new Error('Arquivo de backup inválido');
        }

        localStorage.setItem('auditoria_data_cvc', JSON.stringify(dados.cvc));
        localStorage.setItem('auditoria_data_vm', JSON.stringify(dados.vm));
        localStorage.setItem('auditoria_data_sonda', JSON.stringify(dados.sonda));

        return true;
    } catch (error) {
        console.error('Erro ao restaurar backup:', error);
        return false;
    }
}
