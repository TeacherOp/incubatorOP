async function loadHTML(url) {
    const response = await fetch(url);
    return await response.text();
}

class FooterComponent extends HTMLElement {
    async connectedCallback() {
        const content = await loadHTML('components/footer-component.html');
        this.innerHTML = content;
        this.updateYear();
    }

    updateYear() {
        const yearSpan = this.querySelector('#current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }
}

customElements.define('footer-component', FooterComponent);