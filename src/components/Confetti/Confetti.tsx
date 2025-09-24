import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
  active: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrame = useRef<number | null>(null);
  const particles = useRef<Array<{
    x: number;
    y: number;
    size: number;
    color: string;
    speed: number;
    angle: number;
    rotation: number;
    rotationSpeed: number;
    wobble: number;
    wobbleSpeed: number;
  }>>([]);
  const particleCount = 150;
  const particleColors = ['#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000'];

  useEffect(() => {
    if (!active || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    particles.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: -10,
      size: Math.random() * 10 + 5,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      speed: Math.random() * 3 + 2,
      angle: Math.random() * Math.PI * 2,
      rotation: Math.random() * 0.2 - 0.1,
      rotationSpeed: Math.random() * 0.02 - 0.01,
      wobble: Math.random() * 10,
      wobbleSpeed: Math.random() * 0.1,
    }));

    let lastTime = 0;
    const animate = (time: number) => {
      if (!ctx) return;
      
      const deltaTime = time - lastTime;
      lastTime = time;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current = particles.current.filter(particle => {
        // Update position
        particle.y += particle.speed;
        particle.x += Math.sin(particle.angle) * 2;
        particle.angle += 0.1;
        particle.rotation += particle.rotationSpeed;
        particle.wobble += particle.wobbleSpeed;
        
        // Draw particle
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        
        // Draw square particle with wobble effect
        const size = particle.size + Math.sin(particle.wobble) * 2;
        ctx.fillStyle = particle.color;
        ctx.fillRect(-size/2, -size/2, size, size);
        
        ctx.restore();
        
        // Remove particles that are off screen
        return particle.y < canvas.height + 20;
      });
      
      // Continue animation if there are still particles
      if (particles.current.length > 0) {
        animationFrame.current = requestAnimationFrame(animate);
      }
    };
    
    animationFrame.current = requestAnimationFrame(animate);
    
    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    />
  );
};

export default Confetti;
