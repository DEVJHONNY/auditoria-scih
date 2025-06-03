// Funções de utilidade
function calcularTotais(dados, colunas) {
    if (!dados || !Array.isArray(dados)) return {};

    return dados.reduce((acc, linha) => {
        colunas.forEach((coluna, index) => {
            acc[coluna] = (acc[coluna] || 0) + Number(linha[index + 2] || 0);
        });
        return acc;
    }, {});
}

function atualizarTotaisNaTabela(totais, prefixoId = 'total') {
    Object.entries(totais).forEach(([campo, valor]) => {
        const elemento = document.getElementById(`${prefixoId}${campo}`);
        if (elemento) elemento.textContent = valor;
    });
}

// Expor funções globalmente
window.calcularTotais = calcularTotais;
window.atualizarTotaisNaTabela = atualizarTotaisNaTabela;
