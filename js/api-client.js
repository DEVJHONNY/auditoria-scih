const dadosIniciais = {
    cvc: [],
    vm: [],
    sonda: []
};

// Armazenamento inicial vazio para cada tipo de auditoria
function carregarDados(tipo) {
    try {
        const dados = localStorage.getItem(`dados_${tipo}`);
        return dados ? JSON.parse(dados) : [];
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        return [];
    }
}

function salvarRegistro(tipo, registro) {
    try {
        const dados = carregarDados(tipo);
        dados.push(registro);
        localStorage.setItem(`dados_${tipo}`, JSON.stringify(dados));
        return true;
    } catch (error) {
        console.error('Erro ao salvar registro:', error);
        return false;
    }
}

function limparDados() {
    try {
        localStorage.removeItem('dados_cvc');
        localStorage.removeItem('dados_vm');
        localStorage.removeItem('dados_sonda');
        return true;
    } catch (error) {
        console.error('Erro ao limpar dados:', error);
        return false;
    }
}

// Expor funções globalmente
window.carregarDados = carregarDados;
window.salvarRegistro = salvarRegistro;
window.limparDados = limparDados;
