const usuarios = {
    'enfermeira1': 'senha123',
    'enfermeira2': 'senha456',
    'admin': 'senhaAdmin'
};

function login(usuario, senha) {
    if (usuarios[usuario] === senha) {
        localStorage.setItem('auth', JSON.stringify({
            usuario: usuario,
            timestamp: Date.now()
        }));
        return true;
    }
    return false;
}

function verificarLogin() {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    if (!auth.usuario || !auth.timestamp) {
        return false;
    }
    // Sessão expira em 8 horas
    if (Date.now() - auth.timestamp > 8 * 60 * 60 * 1000) {
        localStorage.removeItem('auth');
        return false;
    }
    return true;
}

export { login, verificarLogin };
