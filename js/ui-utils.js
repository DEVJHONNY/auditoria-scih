export function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loading';
    loader.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loader);
}

export function hideLoading() {
    const loader = document.querySelector('.loading');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => loader.remove(), 300);
    }
}

export function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    });
}

export function pageTransition() {
    document.body.classList.add('page-transition');
    setTimeout(() => document.body.classList.remove('page-transition'), 500);
}

export function navigateWithLoading(url, message = 'Carregando...') {
    showLoadingWithMessage(message);
    setTimeout(() => {
        window.location.href = url;
    }, 800);
}

export function showLoadingWithMessage(message) {
    const loader = document.createElement('div');
    loader.className = 'loading';
    loader.innerHTML = `
        <div class="loading-content">
            <div class="spinner"></div>
            <p class="loading-text">${message}</p>
        </div>
    `;
    document.body.appendChild(loader);
}

export function addTableAnimation() {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach((row, index) => {
        row.style.animation = `fadeIn 0.3s ease-out ${index * 0.1}s`;
        row.style.opacity = '0';
        row.style.animationFillMode = 'forwards';
    });
}
