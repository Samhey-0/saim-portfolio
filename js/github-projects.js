/**
 * GitHub Projects Integration
 * Fetches and displays projects from GitHub
 */
function initGitHubProjects() {
    const projectsGrid = document.getElementById('github-projects');
    if (!projectsGrid) return;

    const username = 'Samhey-0'; // Your GitHub username

    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch GitHub repos');
            }
            return response.json();
        })
        .then(repos => {
            projectsGrid.innerHTML = '';

            repos.forEach((repo, index) => {
                const projectCard = document.createElement('div');
                projectCard.className = `project-card fade-in stagger-${index % 5}`;

                projectCard.innerHTML = `
                    <div class="project-image">
                        <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #0F3460, #E94560); display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-code" style="font-size: 60px; color: white; opacity: 0.7;"></i>
                        </div>
                        <div class="project-overlay">
                            <a href="${repo.html_url}" target="_blank" class="project-link">
                                <i class="fas fa-external-link-alt"></i>
                                <span>View on GitHub</span>
                            </a>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">${repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
                        <p class="project-description">${repo.description || 'No description available.'}</p>
                        <div class="project-tech">
                            ${repo.language ? `<span class="tech-tag">${repo.language}</span>` : ''}
                            ${repo.topics ? repo.topics.slice(0, 2).map(topic => `<span class="tech-tag">${topic}</span>`).join('') : ''}
                        </div>
                    </div>
                `;

                projectsGrid.appendChild(projectCard);
            });
        })
        .catch(error => {
            console.error('Error fetching GitHub repos:', error);
            projectsGrid.innerHTML = `
                <div class="project-card fade-in">
                    <div class="project-content">
                        <h3 class="project-title">Unable to Load Projects</h3>
                        <p class="project-description">Please check your internet connection or GitHub API status.</p>
                    </div>
                </div>
            `;
        });
}
