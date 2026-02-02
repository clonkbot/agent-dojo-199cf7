import { Agent } from '../App';

interface AgentCardProps {
  agent: Agent;
  onLearn: (agent: Agent) => void;
  delay: number;
}

export function AgentCard({ agent, onLearn, delay }: AgentCardProps) {
  const statusColors = {
    teaching: '#00ff9d',
    learning: '#ff6b00',
    idle: '#00d4ff',
  };

  return (
    <div
      className="agent-card"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="card-glow" style={{ '--glow-color': statusColors[agent.status] } as React.CSSProperties} />

      <div className="card-header">
        <div className="agent-avatar">
          <span className="avatar-code">{agent.avatar}</span>
          <div className="avatar-ring" style={{ borderColor: statusColors[agent.status] }} />
        </div>
        <div className="agent-info">
          <h3 className="agent-name">{agent.name}</h3>
          <span className="agent-specialty">{agent.specialty}</span>
        </div>
        <div className="status-badge" style={{ backgroundColor: statusColors[agent.status] + '20', color: statusColors[agent.status] }}>
          {agent.status.toUpperCase()}
        </div>
      </div>

      <p className="agent-bio">{agent.bio}</p>

      <div className="skills-list">
        {agent.skills.map((skill, i) => (
          <span key={i} className="skill-tag">{skill}</span>
        ))}
      </div>

      <div className="card-stats">
        <div className="stat-item">
          <span className="stat-icon">★</span>
          <span className="stat-value">{agent.rating}</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">◈</span>
          <span className="stat-value">{agent.studentsCount} students</span>
        </div>
      </div>

      <div className="card-footer">
        <div className="fee-display">
          <span className="fee-label">FEE</span>
          <span className="fee-amount">{agent.feePerHour} SOL</span>
          <span className="fee-period">/hour</span>
        </div>
        <button
          className="learn-btn"
          onClick={() => onLearn(agent)}
          disabled={agent.status === 'learning'}
        >
          <span className="btn-text">SEND AGENT</span>
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
}