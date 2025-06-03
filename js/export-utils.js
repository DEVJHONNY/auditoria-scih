function exportarParaExcel(dados, headers, nomePlanilha = 'dados', dataAtual = new Date().toLocaleDateString()) {
    try {
        // Calcular totais
        const totais = dados.reduce((acc, linha) => {
            for (let i = 2; i < linha.length; i++) {
                acc[i] = (acc[i] || 0) + Number(linha[i] || 0);
            }
            return acc;
        }, {});

        // Criar linha de totais
        const totaisRow = ['TOTAL', ''];
        for (let i = 2; i < headers.length; i++) {
            totaisRow.push(totais[i] || 0);
        }

        // Criar planilha com dados e totais
        const ws = XLSX.utils.aoa_to_sheet([
            headers,
            ...dados,
            totaisRow
        ]);

        // Estilizar a linha de totais (negrito)
        const lastRow = dados.length + 2;
        const range = XLSX.utils.decode_range(ws['!ref']);
        for (let C = range.s.c; C <= range.e.c; C++) {
            const addr = XLSX.utils.encode_cell({ r: lastRow - 1, c: C });
            if (!ws[addr]) ws[addr] = { v: '' };
            ws[addr].s = { font: { bold: true } };
        }

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Dados');
        XLSX.writeFile(wb, `${nomePlanilha}_${dataAtual}.xlsx`);

        return true;
    } catch (error) {
        console.error('Erro ao exportar:', error);
        return false;
    }
}

window.exportarCSV = function () {
    try {
        const tabela = document.getElementById('dadosTable');
        const headers = Array.from(tabela.querySelectorAll('thead th')).map(th => th.textContent);
        const tipo = window.location.pathname.includes('cvc') ? 'cvc' :
            window.location.pathname.includes('vm') ? 'vm' : 'sonda';

        exportarParaExcel(window.dados, headers, `auditoria_${tipo}`);
        window.showToast('Dados exportados com sucesso!');
    } catch (error) {
        console.error('Erro na exportação:', error);
        window.showToast('Erro ao exportar dados', 'error');
    }
}

// Expor funções globalmente
window.exportarParaExcel = exportarParaExcel;
