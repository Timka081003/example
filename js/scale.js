function applyScaleLayout() {
    const baseWidth = 1920;
    const currentWidth = window.innerWidth;
    const app = document.getElementById('app');

    if (!app) return;

    const scaleFactor = currentWidth / baseWidth;

    app.style.transform = `scale(${scaleFactor})`;
    app.style.transformOrigin = 'top left';
    app.style.width = `${baseWidth}px`;
    app.style.height = `${window.innerHeight / scaleFactor}px`; // чтобы не было скролла
}

window.addEventListener('resize', applyScaleLayout);
window.addEventListener('DOMContentLoaded', applyScaleLayout);
