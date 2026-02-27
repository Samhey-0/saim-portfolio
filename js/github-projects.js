/**
 * GitHub Projects Integration
 * Features: language-specific gradients, skeleton loaders, repo stats
 *
 * NOTE: Remove initGitHubProjects() from the DOMContentLoaded
 * in script.js — this file handles its own initialization.
 */
function initGitHubProjects() {
    const projectsGrid = document.getElementById('github-projects');
    if (!projectsGrid) return;

    const username = 'Samhey-0';

    // Language-specific gradient + icon config
    const langConfig = {
        JavaScript: { gradient: 'linear-gradient(135deg, #1a1a00, #4a3800)', icon: 'fab fa-js', color: '#F7DF1E' },
        TypeScript: { gradient: 'linear-gradient(135deg, #001a33, #003d7a)', icon: 'fab fa-js', color: '#3178C6' },
        PHP:        { gradient: 'linear-gradient(135deg, #1a1a2e, #2d1b69)', icon: 'fab fa-php', color: '#777BB4' },
        Python:     { gradient: 'linear-gradient(135deg, #00001a, #002b36)', icon: 'fab fa-python', color: '#3776AB' },
        HTML:       { gradient: 'linear-gradient(135deg, #1a0000, #4a0e0e)', icon: 'fab fa-html5', color: '#E34F26' },
        CSS:        { gradient: 'linear-gradient(135deg, #00001a, #0a0a3d)', icon: 'fab fa-css3-alt', color: '#264DE4' },
        Vue:        { gradient: 'linear-gradient(135deg, #001a0d, #00331a)', icon: 'fab fa-vuejs', color: '#42B883' },
        default:    { gradient: 'linear-gradient(135deg, #0F3460, #E94560)', icon: 'fas fa-code', color: '#E94560' },
    };

    // Skeleton loaders
    projectsGrid.innerHTML = Array(6).fill(0).map(() => `
        <div class="project-card skeleton-card">
            <div class="skeleton-image"></div>
            <div class="project-content">
                <div class="skeleton-line skeleton-title"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line short"></div>
                <div class="skeleton-tags">
                    <div class="skeleton-tag"></div>
                    <div class="skeleton-tag"></div>
                </div>
            </div>
        </div>
    `).join('');

    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=9`)
        .then(res => {
            if (!res.ok) throw new Error('GitHub API error');
            return res.json();
        })
        .then(repos => {
            projectsGrid.innerHTML = '';

            const display = repos
                .filter(r => !r.fork)
                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                .slice(0, 6);

            const finalRepos = display.length > 0 ? display : repos.slice(0, 6);

            finalRepos.forEach((repo, index) => {
                const cfg = langConfig[repo.language] || langConfig.default;

                const formattedName = repo.name
                    .replace(/[-_]/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase());

                const langTag = repo.language
                    ? `<span class="tech-tag lang-tag">${repo.language}</span>` : '';

                const topicTags = (repo.topics || []).slice(0, 2)
                    .map(t => `<span class="tech-tag">${t}</span>`).join('');

                const card = document.createElement('div');
                card.className = `project-card fade-in stagger-${(index % 5) + 1}`;
                card.innerHTML = `
                    <div class="project-image">
                        <div class="project-thumb" style="background: ${cfg.gradient};">
                            <i class="${cfg.icon}" style="color: ${cfg.color};"></i>
                            <span class="project-thumb-name">${repo.language || 'Code'}</span>
                        </div>
                        <div class="project-overlay">
                            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-link">
                                <i class="fab fa-github"></i>
                                <span>View on GitHub</span>
                            </a>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">${formattedName}</h3>
                        <p class="project-description">${repo.description || 'Check out this project on GitHub for more details.'}</p>
                        <div class="project-tech">
                            ${langTag}
                            ${topicTags}
                        </div>
                        <div class="repo-stats">
                            <span class="repo-stat"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                            <span class="repo-stat"><i class="fas fa-code-fork"></i> ${repo.forks_count}</span>
                            <span class="repo-stat"><i class="fas fa-eye"></i> ${repo.watchers_count}</span>
                        </div>
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-btn">
                            <span>View Repository</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                `;
                projectsGrid.appendChild(card);
            });

            // Trigger animations
            const cards = projectsGrid.querySelectorAll('.fade-in');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.05 });

            cards.forEach(c => observer.observe(c));

            // Fallback visibility
            setTimeout(() => {
                cards.forEach(c => {
                    if (c.getBoundingClientRect().top < window.innerHeight) {
                        c.classList.add('visible');
                    }
                });
            }, 150);
        })
        .catch(() => {
            projectsGrid.innerHTML = `
                <div class="project-card" style="grid-column:1/-1;text-align:center;padding:60px 20px;">
                    <div class="project-content">
                        <i class="fab fa-github" style="font-size:4rem;color:var(--text-muted);margin-bottom:20px;display:block;"></i>
                        <h3 class="project-title">Could Not Load Projects</h3>
                        <p class="project-description">GitHub API may be rate-limited. Visit the profile directly.</p>
                        <a href="https://github.com/${username}" target="_blank" class="btn btn-primary" style="display:inline-flex;margin-top:20px;">
                            <i class="fab fa-github"></i><span>Visit GitHub Profile</span>
                        </a>
                    </div>
                </div>
            `;
        });
}

document.addEventListener('DOMContentLoaded', initGitHubProjects);