function exportarParaExcel(dados, headers, nomeArquivo) {
    // Adiciona BOM para UTF-8
    const csvContent = '\ufeff' + headers.join(',') + '\n' +
        dados.map(linha =>
            linha.map(campo =>
                typeof campo === 'string' ? `"${campo}"` : campo
            ).join(',')
        ).join('\n');

    const blob = new Blob([csvContent], {
        type: 'text/csv;charset=utf-8;'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${nomeArquivo}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
