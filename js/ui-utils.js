function showLoading(message = 'Carregando...') {
    const loader = document.createElement('div');
    loader.className = 'loading';
    loader.innerHTML = `<div class="loading-content"><div class="spinner"></div><p>${message}</p></div>`;
    document.body.appendChild(loader);
}

function showLoadingWithMessage(message) {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = `
        <div class="loading-content">
            <div class="spinner"></div>
            <p class="loading-text">${message}</p>
        </div>
    `;
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => toast.remove(), 3000);
}

function pageTransition() {
    document.body.classList.add('page-transition');
    setTimeout(() => document.body.classList.remove('page-transition'), 500);
}

function navigateWithLoading(url, message = 'Carregando...') {
    showLoadingWithMessage(message);
    setTimeout(() => {
        window.location.href = url;
    }, 500);
}

function addTableAnimation() {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach((row, index) => {
        row.style.animation = `fadeIn 0.3s ease-out ${index * 0.1}s`;
        row.style.opacity = '0';
        row.style.animationFillMode = 'forwards';
    });
}

// Expor funções globalmente
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.showToast = showToast;
window.navigateWithLoading = navigateWithLoading;
window.showLoadingWithMessage = showLoadingWithMessage;
