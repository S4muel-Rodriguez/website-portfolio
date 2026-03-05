document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('cv_data.json');
        const data = await response.json();
        
        populateData(data);
        initAnimations();
        lucide.createIcons();
    } catch (error) {
        console.error('Error loading CV data:', error);
    }
});

function populateData(data) {
    document.getElementById('nav-name').textContent = `root@${data.personal.name.split(' ')[0].toLowerCase()}:~#`;
    document.getElementById('hero-status').textContent = `STATUS: ${data.personal.name.toUpperCase()} ONLINE`;
    
    typeWriterEffect(document.getElementById('hero-title'), data.personal.title);
    
    document.getElementById('hero-subtitle').textContent = data.personal.summary;
    document.getElementById('about-text').textContent = data.personal.summary;

    const expContainer = document.getElementById('experience-container');
    data.experience.forEach(exp => {
        const div = document.createElement('div');
        div.className = 'cyber-card bg-cyber-surface border border-cyber-border p-6 rounded-lg gs-reveal';
        div.innerHTML = `
            <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h3 class="text-xl font-bold text-white">${exp.role} <span class="text-cyber-accent font-mono text-sm font-normal">@ ${exp.company}</span></h3>
                <span class="text-cyber-muted font-mono text-sm mt-2 md:mt-0">[ ${exp.period} ]</span>
            </div>
            <p class="text-gray-400 text-sm leading-relaxed">${exp.description}</p>
        `;
        expContainer.appendChild(div);
    });

    const skillsContainer = document.getElementById('skills-container');
    data.skills.forEach(skill => {
        const div = document.createElement('div');
        div.className = 'bg-cyber-surface border border-cyber-border p-4 rounded text-center font-mono text-sm text-gray-300 hover:text-cyber-accent hover:border-cyber-accent transition-colors cursor-default gs-reveal';
        div.textContent = skill;
        skillsContainer.appendChild(div);
    });

    const contactContainer = document.getElementById('contact-container');
    const contactLinks =[
        { icon: 'mail', text: data.contact.email, href: `mailto:${data.contact.email}` },
        { icon: 'github', text: data.contact.github, href: `https://${data.contact.github}` },
        { icon: 'linkedin', text: data.contact.linkedin, href: `https://${data.contact.linkedin}` }
    ];

    contactLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.target = '_blank';
        a.className = 'flex items-center space-x-3 bg-cyber-surface border border-cyber-border px-6 py-4 rounded hover:border-cyber-accent group transition-colors gs-reveal w-full md:w-auto';
        a.innerHTML = `
            <i data-lucide="${link.icon}" class="w-5 h-5 text-cyber-muted group-hover:text-cyber-accent transition-colors"></i>
            <span class="font-mono text-sm text-gray-300 group-hover:text-white">${link.text}</span>
        `;
        contactContainer.appendChild(a);
    });

    document.getElementById('footer-text').innerHTML = `&copy; ${new Date().getFullYear()} ${data.personal.name}. END OF FILE.`;
}

function typeWriterEffect(element, text) {
    element.innerHTML = '';
    const span = document.createElement('span');
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    element.appendChild(span);
    element.appendChild(cursor);

    let i = 0;
    const speed = 50;

    function type() {
        if (i < text.length) {
            span.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    setTimeout(type, 500);
}

function initAnimations() {
    gsap.from('nav', {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('#hero-subtitle, #hero a', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 1.5,
        ease: 'power3.out'
    });

    const reveals = document.querySelectorAll('.gs-reveal');
    reveals.forEach((element) => {
        gsap.fromTo(element, 
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%'
                }
            }
        );
    });
}
