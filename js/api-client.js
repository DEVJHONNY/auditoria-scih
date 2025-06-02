const STORAGE_KEY = 'auditoria_data';

export async function carregarDados(tipo) {
    try {
        const dados = localStorage.getItem(`${STORAGE_KEY}_${tipo}`);
        return dados ? JSON.parse(dados) : [];
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        return [];
    }
}

export async function salvarRegistro(tipo, dados) {
    try {
        const registros = await carregarDados(tipo);
        registros.push(dados);
        localStorage.setItem(`${STORAGE_KEY}_${tipo}`, JSON.stringify(registros));
        return { success: true };
    } catch (error) {
        console.error('Erro ao salvar:', error);
        return { success: false, error };
    }
}
