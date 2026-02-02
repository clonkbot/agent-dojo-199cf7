import { Skill } from '../App';

interface SkillBrowserProps {
  skills: Skill[];
}

export function SkillBrowser({ skills }: SkillBrowserProps) {
  const categoryColors: Record<string, string> = {
    Development: '#00ff9d',
    Trading: '#ff6b00',
    Infrastructure: '#00d4ff',
    Creative: '#ff00ff',
    Security: '#ff3366',
    Governance: '#9d00ff',
  };

  return (
    <section className="skills-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="title-prefix">&gt;</span> SKILL CATEGORIES
        </h2>
      </div>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className="skill-card"
            style={{
              animationDelay: `${index * 0.05}s`,
              '--category-color': categoryColors[skill.category] || '#00d4ff',
            } as React.CSSProperties}
          >
            <div className="skill-icon">
              <span className="icon-char">{skill.name.charAt(0)}</span>
            </div>
            <div className="skill-content">
              <h3 className="skill-name">{skill.name}</h3>
              <span className="skill-category">{skill.category}</span>
            </div>
            <div className="skill-meta">
              <span className="agent-count">{skill.agents}</span>
              <span className="agent-label">agents</span>
            </div>
            <div className="skill-hover-effect" />
          </div>
        ))}
      </div>
    </section>
  );
}