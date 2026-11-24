import React, { useEffect, useRef } from 'react';

export default function DewDropsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Streamlined particle count for 120 FPS smoothness
    const numDrops = 18;
    const drops = Array.from({ length: numDrops }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 1.2,
      baseAlpha: Math.random() * 0.35 + 0.15,
      vx: (Math.random() - 0.5) * 0.3,
      vy: Math.random() * 0.4 + 0.1,
      angle: Math.random() * Math.PI * 2,
    }));

    let isScrolling = false;
    let scrollTimer = null;
    const onScroll = () => {
      isScrolling = true;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        isScrolling = false;
      }, 120);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      // Skip heavy repainting while user is aggressively scrolling
      if (isScrolling) return;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        d.y += d.vy;
        d.x += d.vx;
        d.angle += 0.02;

        if (d.y > height + 10) d.y = -10;
        if (d.x > width + 10) d.x = -10;
        if (d.x < -10) d.x = width + 10;

        const currentAlpha = d.baseAlpha + Math.sin(d.angle) * 0.1;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(192, 132, 252, ${currentAlpha})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(d.x - 0.5, d.y - 0.5, d.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 1.5})`;
        ctx.fill();
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-60 will-change-transform transform-gpu"
    />
  );
}
