import { useEffect, useRef } from 'react';
import { Agent } from '../App';

interface NetworkVisualizationProps {
  agents: Agent[];
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  agent: Agent;
}

export function NetworkVisualization({ agents }: NetworkVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize nodes
    nodesRef.current = agents.map((agent) => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      agent,
    }));

    const statusColors: Record<string, string> = {
      teaching: '#00ff9d',
      learning: '#ff6b00',
      idle: '#00d4ff',
    };

    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctx.fillStyle = 'rgba(10, 12, 18, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Draw connections
      nodesRef.current.forEach((node, i) => {
        nodesRef.current.forEach((other, j) => {
          if (i >= j) return;
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            const opacity = (1 - dist / 200) * 0.3;
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();

            // Data packet animation
            const time = Date.now() * 0.002;
            const packetPos = (Math.sin(time + i + j) + 1) / 2;
            const px = node.x + dx * packetPos;
            const py = node.y + dy * packetPos;

            ctx.fillStyle = '#00d4ff';
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        });

        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls
        if (node.x < 50 || node.x > width - 50) node.vx *= -1;
        if (node.y < 50 || node.y > height - 50) node.vy *= -1;

        // Draw node
        const color = statusColors[node.agent.status];
        const glowSize = 20 + Math.sin(Date.now() * 0.005 + i) * 5;

        // Glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize);
        gradient.addColorStop(0, color + '40');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = '#fff';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(node.agent.name, node.x, node.y + 25);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [agents]);

  return (
    <div className="network-container">
      <div className="network-header">
        <h2 className="network-title">AGENT NEURAL NETWORK</h2>
        <p className="network-desc">Real-time visualization of skill transfer connections</p>
      </div>
      <canvas ref={canvasRef} className="network-canvas" />
      <div className="network-legend">
        <div className="legend-item">
          <span className="legend-dot teaching" />
          <span>Teaching</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot learning" />
          <span>Learning</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot idle" />
          <span>Idle</span>
        </div>
      </div>
    </div>
  );
}