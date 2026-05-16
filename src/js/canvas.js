// src/js/canvas.js
export function initCanvasEngine() {
    const canvas = document.getElementById('stage');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let W, H;
    const particles = [];
    const COUNT = 45;

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * W,
            y: H + Math.random() * 60,
            r: 0.8 + Math.random() * 2,
            vx: (Math.random() - 0.5) * 0.4,
            vy: -(0.2 + Math.random() * 0.6),
            life: 0,
            maxLife: 200 + Math.random() * 280,
            hue: 38 + (Math.random() - 0.5) * 16
        };
    }

    function init() {
        resize();
        for (let i = 0; i < COUNT; i++) {
            const p = createParticle();
            p.y = Math.random() * H;
            p.life = Math.random() * p.maxLife;
            particles.push(p);
        }
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life++;

            const t = p.life / p.maxLife;
            const alpha = t < 0.15 ? t / 0.15 : t > 0.8 ? (1 - t) / 0.2 : 1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue}, 72%, 65%, ${Math.min(alpha, 0.55)})`;
            ctx.fill();

            if (p.life >= p.maxLife) {
                particles[i] = createParticle();
            }
        }
        requestAnimationFrame(draw);
    }

    // تفعيل ResizeObserver كبديل حديث لـ window.resize لتجنب عنق الزجاجة
    const resizeObserver = new ResizeObserver(() => {
        resize();
    });
    resizeObserver.observe(document.body);

    init();
    draw();
}
