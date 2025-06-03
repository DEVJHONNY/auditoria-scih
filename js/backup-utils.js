function realizarBackup() {
    try {
        const backup = {
            cvc: localStorage.getItem('dados_cvc'),
            vm: localStorage.getItem('dados_vm'),
            sonda: localStorage.getItem('dados_sonda'),
            timestamp: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup_auditorias_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);

        window.showToast('Backup realizado com sucesso');
        return true;
    } catch (error) {
        console.error('Erro ao fazer backup:', error);
        window.showToast('Erro ao fazer backup', 'error');
        return false;
    }
}

// Expor função globalmente
window.realizarBackup = realizarBackup;
