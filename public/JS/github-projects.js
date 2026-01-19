const GITHUB_USERNAME = 'Murzuqisah';
const FEATURED_PROJECTS = ['passa', 'passapay', 'sippar', 'digital-agricultural-management'];

async function fetchGithubProjects() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        const repos = await response.json();
        
        const additionalProjects = repos
            .filter(repo => !repo.fork && !FEATURED_PROJECTS.some(fp => repo.name.toLowerCase().includes(fp)))
            .slice(0, 6)
            .map(repo => ({
                name: repo.name,
                description: repo.description || 'No description available',
                url: repo.html_url,
                language: repo.language,
                stars: repo.stargazers_count
            }));
        
        displayAdditionalProjects(additionalProjects);
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
    }
}

function displayAdditionalProjects(projects) {
    const container = document.getElementById('github-projects-container');
    if (!container || projects.length === 0) return;
    
    const projectsHTML = projects.map(project => `
        <div class="project-card animate-fade-in">
            <div class="project-content">
                <h3 class="project-title">${formatProjectName(project.name)}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-meta">
                    ${project.language ? `<span class="project-language">${project.language}</span>` : ''}
                    ${project.stars > 0 ? `<span class="project-stars">⭐ ${project.stars}</span>` : ''}
                </div>
                <a href="${project.url}" class="project-link" target="_blank">View on GitHub →</a>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = projectsHTML;
}

function formatProjectName(name) {
    return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

document.addEventListener('DOMContentLoaded', fetchGithubProjects);
