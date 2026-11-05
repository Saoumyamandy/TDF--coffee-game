import React, { useEffect, useRef } from 'react';

export interface ParticleTrigger {
  x?: number;
  y?: number;
  type: 'discovery' | 'brew' | 'stars';
  amount?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  shape: 'square' | 'bean' | 'star' | 'cross';
  alpha: number;
  decay: number;
  rotation: number;
  rotSpeed: number;
  gravity: number;
}

interface ParticleCanvasProps {
  trigger: ParticleTrigger | null;
  onFinished?: () => void;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ trigger, onFinished }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const originX = trigger.x ?? rect.width / 2;
    const originY = trigger.y ?? rect.height * 0.45;

    const count = trigger.amount ?? (trigger.type === 'discovery' ? 85 : 45);
    const colors =
      trigger.type === 'discovery'
        ? ['#FDE047', '#F59E0B', '#F97316', '#34D399', '#A7F3D0', '#FFF', '#92400E', '#EAB308']
        : ['#D97706', '#F59E0B', '#B45309', '#78350F', '#FFFDF9', '#FDE68A'];

    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed =
        trigger.type === 'discovery'
          ? 3 + Math.random() * 8
          : 2 + Math.random() * 5;

      const shapes: Particle['shape'][] = ['square', 'bean', 'star', 'cross'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];

      newParticles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (trigger.type === 'discovery' ? 3.5 : 2),
        size: Math.floor(Math.random() * 6) + 4, // chunky pixel sizes
        color: colors[Math.floor(Math.random() * colors.length)],
        shape,
        alpha: 1,
        decay: 0.012 + Math.random() * 0.018,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        gravity: 0.16,
      });
    }

    particlesRef.current.push(...newParticles);

    // Start animation loop if not running
    if (!animFrameRef.current) {
      const render = () => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Turn off smoothing for crisp retro pixel look
        ctx.imageSmoothingEnabled = false;

        const activeParticles: Particle[] = [];

        for (const p of particlesRef.current) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity;
          p.vx *= 0.985;
          p.alpha -= p.decay;
          p.rotation += p.rotSpeed;

          if (p.alpha > 0) {
            ctx.save();
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.translate(Math.round(p.x), Math.round(p.y));
            ctx.rotate(p.rotation);

            ctx.fillStyle = p.color;

            const s = Math.round(p.size);

            if (p.shape === 'square') {
              // Chunky pixel confetti
              ctx.fillRect(-s / 2, -s / 2, s, s);
              ctx.fillStyle = 'rgba(0,0,0,0.3)';
              ctx.fillRect(-s / 2, s / 2 - 2, s, 2);
            } else if (p.shape === 'bean') {
              // Pixel Coffee Bean
              ctx.fillRect(-s, -s / 2, s * 2, s);
              ctx.fillStyle = '#2B140B';
              // Center bean split crease
              ctx.fillRect(-1, -s / 2, 2, s);
            } else if (p.shape === 'star') {
              // 8-bit cross sparkle
              ctx.fillRect(-s / 2, -1, s, 2);
              ctx.fillRect(-1, -s / 2, 2, s);
              ctx.fillRect(-1, -1, 2, 2);
            } else {
              // Diamond / cross
              ctx.fillRect(-s / 2, -s / 2, s, s);
            }

            ctx.restore();
            activeParticles.push(p);
          }
        }

        particlesRef.current = activeParticles;

        if (activeParticles.length > 0) {
          animFrameRef.current = requestAnimationFrame(render);
        } else {
          animFrameRef.current = null;
          if (onFinished) onFinished();
        }
      };

      animFrameRef.current = requestAnimationFrame(render);
    }
  }, [trigger, onFinished]);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      style={{ imageRendering: 'pixelated' }}
    />
  );
};
