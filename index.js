// Satium - index.js (Updated with proper proxy handling)

function handleNav(event, target) {
    document.querySelectorAll('#navbar li').forEach(li => li.classList.remove('active'));
    
    if (target === 'home') {
        event.currentTarget.classList.add('active');
    } 
    else if (target === 'games.html') {
        window.location.href = 'games.html';
    } 
    else if (target === 'youtube') {
        proxyGo('https://www.youtube.com');
        document.querySelector('li[data-target="home"]').classList.add('active');
    } 
    else if (target === 'tabconfig') {
        if (typeof settings === 'function') settings();
        document.querySelector('li[data-target="home"]').classList.add('active');
    } 
    else if (target === 'updates') {
        if (typeof updates === 'function') updates();
        document.querySelector('li[data-target="home"]').classList.add('active');
    }
}

// Particle Background
const pJS = (tag_id) => {
    const canvas_el = document.createElement('canvas');
    canvas_el.style.width = "100%";
    canvas_el.style.height = "100%";
    document.getElementById(tag_id).appendChild(canvas_el);
    const ctx = canvas_el.getContext('2d');
    let w, h, particles = [];

    const init = () => {
        w = canvas_el.width = canvas_el.offsetWidth;
        h = canvas_el.height = canvas_el.offsetHeight;
        particles = [];
        for (let i = 0; i < 60; i++) {
            const shade = Math.floor(Math.random() * 60) + 40;
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: Math.random() * 0.6 + 0.3,
                vy: Math.random() * 0.6 + 0.3,
                radius: Math.random() * 1.8 + 0.8,
                color: `rgb(${shade},${shade},${shade})`
            });
        }
    };

    const draw = () => {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.x += p.vx; 
            p.y += p.vy;
            if (p.x > w) p.x = 0;
            if (p.y > h) p.y = 0;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(draw);
    };

    window.addEventListener('resize', init);
    init(); 
    draw();
};

// Ultraviolet Proxy Function (Fixed)
function proxyGo(url) {
    if (typeof __uv$config !== "undefined" && __uv$config.prefix) {
        const encoded = __uv$config.encodeUrl(url);
        location.href = __uv$config.prefix + encoded;
    } else {
        console.warn("Ultraviolet config not loaded - opening in new tab");
        window.open(url, '_blank');
    }
}

function closeNotice() {
    document.getElementById('noticeBox').classList.add('hidden');
}

// Initialize everything
window.onload = () => {
    pJS('particles-js');

    const splashes = ["monochrome", "clean & fast", "satium", "encrypted", "minimal", "ultraviolet"];
    document.getElementById('splash').textContent = splashes[Math.floor(Math.random() * splashes.length)];

    // Search bar
    document.getElementById("homesearch").addEventListener("keydown", e => {
        if (e.key === "Enter") {
            let q = e.target.value.trim();
            if (q) {
                if (q.includes('.')) {
                    proxyGo(q);
                } else {
                    proxyGo(`https://www.google.com/search?q=${encodeURIComponent(q)}`);
                }
            }
        }
    });

    // Sidebar slide-in animation
    ['section1nav', 'section2nav', 'section3nav'].forEach((id, i) => {
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.style.left = "0";
        }, 100 + (i * 100));
    });

    // Show welcome notice
    setTimeout(() => {
        const notice = document.getElementById('noticeBox');
        if (notice) notice.classList.remove('hidden');
    }, 900);
};
