// js/scale.js

function applyScaleLayout() {
    const baseWidth = 1920;
    const currentWidth = window.innerWidth;
    const app = document.getElementById('app');

    if (!app) return;

    if (currentWidth >= baseWidth) {
        app.style.transform = 'scale(1)';
        app.style.transformOrigin = 'top left';
        app.style.width = '100%';
    } else {
        const scaleFactor = currentWidth / baseWidth;
        app.style.transform = `scale(${scaleFactor})`;
        app.style.transformOrigin = 'top left';
        app.style.width = `${baseWidth}px`;
    }
}

window.addEventListener('resize', applyScaleLayout);
window.addEventListener('DOMContentLoaded', applyScaleLayout);
