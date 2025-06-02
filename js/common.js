function atualizarTabela(dados, tabela) {
    tabela.innerHTML = '';
    dados.forEach(linha => {
        const row = tabela.insertRow();
        linha.forEach(valor => {
            const td = row.insertCell();
            td.textContent = valor;
        });
    });
}

function exportarCSV(dados, headers, filename) {
    let csv = headers.join(',') + '\n';
    dados.forEach(linha => {
        csv += linha.map(campo => `"${campo}"`).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

function atualizarTotais(dados, campos, prefixo = 'total') {
    campos.forEach((campo, index) => {
        const total = dados.reduce((sum, linha) => sum + Number(linha[index]), 0);
        document.getElementById(prefixo + campo).textContent = total;
    });
}
