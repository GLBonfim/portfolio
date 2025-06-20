document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('starryBackground');
    if (!canvas) {
        console.error('Elemento canvas com id "starryBackground" não encontrado. Verifique seu index.html.');
        return;
    }

    const ctx = canvas.getContext('2d');

    let stars = [];
    const numStars = 200;
    const starSpeed = 0.05;
    const twinkleSpeed = 0.05;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars();
    }

    class Star {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 1.5 + 0.5;
            this.opacity = Math.random();
            this.direction = Math.random() * Math.PI * 2;
            this.speedX = Math.cos(this.direction) * starSpeed;
            this.speedY = Math.sin(this.direction) * starSpeed;
            this.twinkleFactor = Math.random() * Math.PI * 2;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.shadowColor = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.shadowBlur = this.radius * 2;
            ctx.fill();
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;

            this.twinkleFactor += twinkleSpeed;
            this.opacity = (Math.sin(this.twinkleFactor) * 0.5) + 0.5;
            if (this.opacity < 0.1) this.opacity = 0.1;
        }
    }

    function initStars() {
        stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push(new Star());
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            star.update();
            star.draw();
        });
    }

    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
    animate();
});