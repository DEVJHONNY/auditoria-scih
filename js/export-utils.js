function exportarParaExcel(dados, headers, nomeArquivo, totais, filtros) {
    let dadosFiltrados = dados;

    // Filtra por data
    if (filtros.tipoData === 'data' && filtros.data) {
        dadosFiltrados = dadosFiltrados.filter(linha => linha[0] === filtros.data);
    } else if (filtros.tipoData === 'periodo' && filtros.dataInicial && filtros.dataFinal) {
        dadosFiltrados = dadosFiltrados.filter(linha =>
            linha[0] >= filtros.dataInicial && linha[0] <= filtros.dataFinal
        );
    }

    // Filtra por setor
    if (filtros.setor) {
        dadosFiltrados = dadosFiltrados.filter(linha => linha[1] === filtros.setor);
    }

    // Recalcula totais com dados filtrados
    const totaisFiltrados = dadosFiltrados.reduce((acc, linha) => {
        for (let i = 2; i < linha.length; i++) {
            acc[i] = (acc[i] || 0) + Number(linha[i]);
        }
        return acc;
    }, {});

    // Prepara linha de totais
    const linhaTotais = ['Total', '', ...Object.values(totaisFiltrados)];

    // Monta planilha
    const dadosCompletos = [
        headers,
        ...dadosFiltrados,
        linhaTotais
    ];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(dadosCompletos);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dados");
    XLSX.writeFile(workbook, `${nomeArquivo}_${new Date().toISOString().split('T')[0]}.xlsx`);
}
