// Vamos definir o IP dinamicamente
const getApiUrl = () => {
    // Em desenvolvimento, use localhost
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:8080/api';
    }
    // Em produção, use o IP do WiFi
    return `http://${window.location.hostname}:8080/api`;
};

class GithubAPI {
    constructor(owner, repo, token = null) {
        this.owner = owner;
        this.repo = repo;
        this.token = token;
    }

    async carregarDados(tipo) {
        try {
            const response = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/data/${tipo}.json`);
            if (response.status === 404) return [];
            const data = await response.json();
            return JSON.parse(atob(data.content));
        } catch (error) {
            console.error('Erro ao carregar:', error);
            return [];
        }
    }

    async salvarRegistro(tipo, dados) {
        try {
            // Carregar dados existentes
            let registros = await this.carregarDados(tipo);
            if (!Array.isArray(registros)) registros = [];

            // Adicionar novo registro
            registros.push(dados);

            const content = btoa(JSON.stringify(registros, null, 2));
            const path = `data/${tipo}.json`;

            // Obter SHA do arquivo se existir
            let sha;
            try {
                const fileInfo = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`);
                if (fileInfo.ok) {
                    const data = await fileInfo.json();
                    sha = data.sha;
                }
            } catch (e) {
                console.log('Arquivo não existe ainda');
            }

            // Criar/atualizar arquivo
            const response = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${this.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: `Atualização dos dados de ${tipo}`,
                    content,
                    sha,
                    branch: 'main'
                })
            });

            if (!response.ok) throw new Error('Erro ao salvar');
            return { success: true };
        } catch (error) {
            console.error('Erro ao salvar:', error);
            return { success: false, error };
        }
    }
}

const api = new GithubAPI('seu-usuario', 'seu-repo', 'seu-token-github');
export const { carregarDados, salvarRegistro } = api;
