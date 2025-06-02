const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const rootDir = path.join(__dirname, '..');
const dataPath = path.join(__dirname, 'data');
const PORT = 8080;

// Criar pasta data se não existir
async function init() {
    try {
        await fs.mkdir(dataPath, { recursive: true });
    } catch (err) {
        console.error('Erro ao criar pasta:', err);
    }
}

// Configurar arquivos estáticos
app.use(express.static(rootDir));

// API para dados
app.get('/api/:tipo', async (req, res) => {
    try {
        const arquivo = path.join(dataPath, `${req.params.tipo}.json`);
        const dados = await fs.readFile(arquivo, 'utf8').catch(() => '[]');
        res.json(JSON.parse(dados));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/:tipo', async (req, res) => {
    try {
        const arquivo = path.join(dataPath, `${req.params.tipo}.json`);
        let dados = [];
        try {
            dados = JSON.parse(await fs.readFile(arquivo, 'utf8'));
        } catch {
            dados = [];
        }
        dados.push(req.body);
        await fs.writeFile(arquivo, JSON.stringify(dados, null, 2));
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rotas para arquivos HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(rootDir, 'index.html'));
});

app.get('/auditoria-cvc', (req, res) => {
    res.sendFile(path.join(rootDir, 'auditoria-cvc.html'));
});

app.get('/auditoria-sonda', (req, res) => {
    res.sendFile(path.join(rootDir, 'auditoria-sonda.html'));
});

app.get('/auditoria-vm', (req, res) => {
    res.sendFile(path.join(rootDir, 'auditoria-vm.html'));
});

// Iniciar servidor
init().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        const networkInterfaces = require('os').networkInterfaces();
        console.log('\nEndereços IP disponíveis:');
        for (const interfaceName of Object.keys(networkInterfaces)) {
            for (const interface of networkInterfaces[interfaceName]) {
                if (interface.family === 'IPv4' && !interface.internal) {
                    console.log(`http://${interface.address}:${PORT}`);
                }
            }
        }
        console.log('\nServidor rodando em:');
        console.log(`- Local: http://localhost:${PORT}`);
        console.log(`- Rede: Use um dos IPs acima\n`);
    });
});
