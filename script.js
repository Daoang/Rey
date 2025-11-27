
const welcomeScreen = document.getElementById('welcome-screen');

function hideWelcomeScreen() {
    welcomeScreen.style.animation = 'fadeOut 0.5s ease forwards';
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
    }, 500);
}


setTimeout(hideWelcomeScreen, 4000);


const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;


const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}


const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
});


document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.className = 'fas fa-bars';
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


let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        
        navbar.style.transform = 'translateY(-100%)';
    } else {
       
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});


const sections = document.querySelectorAll('.section');

const revealSection = () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
};


revealSection();


window.addEventListener('scroll', revealSection);


const skillsSection = document.getElementById('skills');
let skillsAnimated = false;

const animateSkills = () => {
    if (skillsAnimated) return;
    
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.75) {
        const progressBars = document.querySelectorAll('.progress');
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
        skillsAnimated = true;
    }
};

window.addEventListener('scroll', animateSkills);


const profileImg = document.getElementById('profile-img');

profileImg.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = e => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = event => {
                profileImg.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.click();
});


const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
   
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
   
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
    
    
});


const navLinksArray = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});


const titleElement = document.querySelector('.title');
const titleText = titleElement.textContent;
let index = 0;

function typeTitle() {
    if (index < titleText.length) {
        titleElement.textContent = titleText.slice(0, index + 1);
        index++;
        setTimeout(typeTitle, 100);
    }
}


setTimeout(() => {
    titleElement.textContent = '';
    typeTitle();
}, 4000);
