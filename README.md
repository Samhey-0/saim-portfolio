# Portfolio Website

A modern, responsive portfolio website for a full-stack web developer. Built with HTML, CSS, and JavaScript, featuring a dark/light mode toggle, smooth animations, and a professional design.

![Portfolio Preview](screenshots)

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between themes with localStorage persistence
- **Smooth Animations**: Scroll-triggered fade-in animations
- **Custom Cursor**: Interactive cursor with hover effects
- **Contact Form**: Ready for EmailJS integration
- **SEO Optimized**: Meta tags and semantic HTML
- **Accessibility**: Keyboard navigation and ARIA labels

## Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Flexbox, Grid, animations
- **JavaScript (ES6+)**: Vanilla JS with modern features
- **Font Awesome**: Icons
- **Google Fonts**: Outfit font family

## Getting Started

### Prerequisites

- A modern web browser
- A code editor (VS Code recommended)
- Git (for version control)

### Installation

1. **Clone the repository**
   
```
bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   
```

2. **Open in browser**
   Simply open `index.html` in your browser, or use a local server:
   
   
```
bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   
```

3. **Customize the content**
   
   Edit `index.html` to update:
   - Your name and profession (in the Hero section)
   - About section content and skills
   - Project information and GitHub links
   - Contact information
   - Social media links

## Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles
├── js/
│   └── script.js       # JavaScript functionality
├── images/
│   ├── profile.jpg     # Profile photo
│   ├── about.jpg       # About section image
│   └── project*.jpg    # Project screenshots
├── SPEC.md             # Design specification
└── README.md           # This file
```

## Customization

### Adding Your Projects

1. Add project screenshots to the `images/` folder
2. Update the project cards in `index.html`:
   
```
html
   <article class="project-card">
       <div class="project-image">
           <img src="images/your-project.jpg" alt="Your Project">
       </div>
       <div class="project-content">
           <h3 class="project-title">Your Project Name</h3>
           <p class="project-description">Project description...</p>
           <div class="project-tech">
               <span class="tech-tag">React</span>
               <span class="tech-tag">Node.js</span>
           </div>
           <a href="https://github.com/yourusername/project" 
              target="_blank" rel="noopener noreferrer" class="project-btn">
               <span>View on GitHub</span>
               <i class="fas fa-external-link-alt"></i>
           </a>
       </div>
   </article>
   
```

### Updating Skills

In the skills grid section of `index.html`:
```
html
<div class="skill-item">
    <i class="fab fa-your-icon"></i>
    <span>Your Skill</span>
</div>
```

Available Font Awesome icons: https://fontawesome.com/icons

### Contact Form Setup (EmailJS)

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service (e.g., Gmail)
3. Create an email template
4. Get your Public Key, Service ID, and Template ID
5. Update `js/script.js`:

```
javascript
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY',
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID'
};
```

6. Uncomment the EmailJS sending code in the form handler

## Deploying to GitHub Pages

### Method 1: Using GitHub Web Interface

1. **Create a new repository**
   - Go to [GitHub](https://github.com)
   - Click "New repository"
   - Name it `yourusername.github.io`

2. **Upload files**
   - Click "uploading an existing file"
   - Drag and drop all your project files
   - Click "Commit changes"

3. **Your site is live!**
   - Visit `https://yourusername.github.io`

### Method 2: Using Git

1. **Initialize git** (if not already initialized)
   
```
bash
   git init
   
```

2. **Create .gitignore**
   
```
   node_modules/
   .DS_Store
   
```

3. **Commit your changes**
   
```bash
   git add .
   git commit -m "Initial portfolio commit"
   
```

4. **Create a new repository on GitHub** and follow the instructions to push:
   
```
bash
   git remote add origin https://github.com/yourusername/portfolio.git
   git branch -M main
   git push -u origin main
   
```

5. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click "Settings"
   - Click "Pages" in the sidebar
   - Under "Source", select "main" branch
   - Click "Save"

6. **Your site will be live at**
   `https://yourusername.github.io/portfolio`

### Method 3: Using GitHub CLI

```
bash
gh repo create portfolio --public
git push -u origin main
# Then enable GitHub Pages in repository settings
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [Font Awesome](https://fontawesome.com) for icons
- [Google Fonts](https://fonts.google.com) for typography
- [Unsplash](https://unsplash.com) for placeholder images

---

