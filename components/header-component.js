async function loadHTML(url) {
    const response = await fetch(url);
    return await response.text();
}

class HeaderComponent extends HTMLElement {
    async connectedCallback() {
        const content = await loadHTML('components/header-component.html');
        this.innerHTML = content;
        this.initializeMenu();
    }

    initializeMenu() {
        const mobileMenuButton = document.querySelector('#mobile-menu-button');
        const mobileMenu = document.querySelector('#mobile-menu');
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }
}

customElements.define('header-component', HeaderComponent);