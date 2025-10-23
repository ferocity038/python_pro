const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = `
    <i class="ri-moon-line"></i>
    <i class="ri-sun-line"></i>
`;
document.body.appendChild(themeToggle);

const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    document.documentElement.classList.add('theme-transition');
    setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
    }, 300);
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'var(--nav-bg)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'var(--nav-bg)';
        navbar.style.boxShadow = 'none';
    }
});

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.querySelectorAll('.course-card, .feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

function highlightPythonCode() {
    const codeElement = document.querySelector('.python-code');
    if (codeElement) {
        let code = codeElement.innerHTML;
        
        code = code.replace(/(def|class|return|if|else|elif|for|while|in|import|from|as|print|self)/g, 
            '<span class="keyword">$1</span>');
        
        code = code.replace(/(\w+)\(/g, 
            '<span class="function">$1</span>(');
        
        code = code.replace(/(".*?"|'.*?')/g, 
            '<span class="string">$1</span>');
        
        code = code.replace(/(#.*)/g, 
            '<span class="comment">$1</span>');
        
        code = code.replace(/class\s+(\w+)/g, 
            'class <span class="class">$1</span>');
        
        code = code.replace(/(def\s+)(\w+)/g, 
            '$1<span class="def">$2</span>');
        
        codeElement.innerHTML = code;
        codeElement.style.direction = 'ltr';
        codeElement.style.textAlign = 'left';
    }
}

document.querySelectorAll('.btn-primary, .btn-course').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const targetValues = [5000, 120, 98];
    
    counters.forEach((counter, index) => {
        const target = targetValues[index];
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                
                let displayValue;
                if (index === 2) {
                    displayValue = Math.ceil(current) + '%';
                } else {
                    displayValue = Math.ceil(current).toLocaleString('en-US') + '+';
                }
                
                counter.innerText = displayValue;
                setTimeout(updateCounter, 30);
            } else {
                let finalValue;
                if (index === 2) {
                    finalValue = target + '%';
                } else {
                    finalValue = target.toLocaleString('en-US') + '+';
                }
                counter.innerText = finalValue;
            }
        };
        
        updateCounter();
    });
};

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            if (entry.target.classList.contains('hero-stats')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.course-card, .hero-stats, .feature-card').forEach(el => {
    observer.observe(el);
});

window.addEventListener('load', () => {
    highlightPythonCode();
    document.body.classList.add('loaded');
});

const style = document.createElement('style');
style.textContent = `
    .theme-transition * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
    }
`;
document.head.appendChild(style);