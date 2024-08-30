async function loadHTML(url) {
    const response = await fetch(url);
    return await response.text();
}

class ProjectList extends HTMLElement {
    constructor() {
        super();
        this.projects = JSON.parse(localStorage.getItem('projects')) || [];
    }

    async connectedCallback() {
        const content = await loadHTML('components/project-list.html');
        this.innerHTML = content;
        this.renderProjects();
        this.setupEventListeners();
    }

    renderProjects() {
        const tableBody = this.querySelector('#projectTableBody');
        if (!tableBody) return;

        tableBody.innerHTML = '';
        this.projects.forEach((project, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="border px-4 py-2">${project.name}</td>
                <td class="border px-4 py-2">
                    <input type="range" min="0" max="100" value="${project.progress}" 
                           class="w-full" data-index="${index}">
                    <span class="ml-2">${project.progress}%</span>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    setupEventListeners() {
        const addProjectForm = this.querySelector('#addProjectForm');
        const projectInput = this.querySelector('#projectInput');

        if (addProjectForm && projectInput) {
            addProjectForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const projectName = projectInput.value.trim();
                if (projectName) {
                    this.addProject(projectName);
                    projectInput.value = '';
                }
            });
        }

        const tableBody = this.querySelector('#projectTableBody');
        if (tableBody) {
            tableBody.addEventListener('input', (e) => {
                if (e.target.type === 'range') {
                    const index = e.target.dataset.index;
                    const newProgress = e.target.value;
                    this.updateProjectProgress(index, newProgress);
                }
            });
        }
    }

    addProject(name) {
        this.projects.push({ name, progress: 0 });
        this.saveProjects();
        this.renderProjects();
    }

    updateProjectProgress(index, progress) {
        this.projects[index].progress = parseInt(progress);
        this.saveProjects();
        this.renderProjects();
    }

    saveProjects() {
        localStorage.setItem('projects', JSON.stringify(this.projects));
    }
}

customElements.define('project-list', ProjectList);