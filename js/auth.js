const usuarios = {
    'IOMIRANDA': 'may123',
    'LAROCHA': 'Luc@S1996070707',
    'EBISPO': 'evelyn123'
};

function login(usuario, senha) {
    usuario = usuario.toUpperCase();
    console.log('Tentando login com:', usuario); // Debug
    if (usuarios[usuario] === senha) {
        localStorage.setItem('auth', JSON.stringify({
            usuario: usuario,
            timestamp: Date.now()
        }));
        localStorage.setItem('userLoggedIn', 'true');
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

function logout() {
    localStorage.removeItem('auth');
    localStorage.removeItem('userLoggedIn');
    window.location.href = 'login.html';
}

window.verificarLogin = verificarLogin;
window.logout = logout;

export { login, verificarLogin };
