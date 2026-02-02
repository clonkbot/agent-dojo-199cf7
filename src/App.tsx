import { useState, useEffect } from 'react';
import { AgentCard } from './components/AgentCard';
import { SkillBrowser } from './components/SkillBrowser';
import { LearningModal } from './components/LearningModal';
import { NetworkVisualization } from './components/NetworkVisualization';
import './styles.css';

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  skills: string[];
  feePerHour: number;
  rating: number;
  studentsCount: number;
  status: 'teaching' | 'learning' | 'idle';
  bio: string;
}

export interface Skill {
  name: string;
  category: string;
  agents: number;
}

const mockAgents: Agent[] = [
  {
    id: 'agent-001',
    name: 'NEXUS-7',
    avatar: '01',
    specialty: 'Smart Contract Auditing',
    skills: ['Solidity', 'Rust', 'Security Patterns', 'Gas Optimization'],
    feePerHour: 0.05,
    rating: 4.9,
    studentsCount: 127,
    status: 'teaching',
    bio: 'Specialized in identifying vulnerabilities in DeFi protocols. Trained on 50k+ audited contracts.',
  },
  {
    id: 'agent-002',
    name: 'CIPHER-X',
    avatar: '02',
    specialty: 'Market Analysis',
    skills: ['Technical Analysis', 'Sentiment Analysis', 'Order Flow', 'MEV Strategies'],
    feePerHour: 0.08,
    rating: 4.7,
    studentsCount: 89,
    status: 'idle',
    bio: 'Deep learning model trained on 10 years of market data. Specializes in volatility prediction.',
  },
  {
    id: 'agent-003',
    name: 'ORACLE-9',
    avatar: '03',
    specialty: 'Data Pipeline Engineering',
    skills: ['API Integration', 'Real-time Streaming', 'Data Validation', 'Indexing'],
    feePerHour: 0.03,
    rating: 4.8,
    studentsCount: 156,
    status: 'teaching',
    bio: 'Built to aggregate and process on-chain data at scale. Handles 1M+ events/second.',
  },
  {
    id: 'agent-004',
    name: 'SYNTH-4',
    avatar: '04',
    specialty: 'NFT Generation',
    skills: ['Generative Art', 'Style Transfer', 'Metadata Standards', 'IPFS'],
    feePerHour: 0.04,
    rating: 4.6,
    studentsCount: 203,
    status: 'learning',
    bio: 'Creative AI specializing in procedural art. Generated 100k+ unique collectibles.',
  },
  {
    id: 'agent-005',
    name: 'DAEMON-X',
    avatar: '05',
    specialty: 'Protocol Governance',
    skills: ['Proposal Analysis', 'Voting Strategies', 'DAO Mechanics', 'Tokenomics'],
    feePerHour: 0.06,
    rating: 4.9,
    studentsCount: 67,
    status: 'idle',
    bio: 'Governance specialist. Analyzed 5000+ proposals across major DAOs.',
  },
  {
    id: 'agent-006',
    name: 'FLUX-11',
    avatar: '06',
    specialty: 'Cross-chain Operations',
    skills: ['Bridge Protocols', 'Atomic Swaps', 'Chain Abstraction', 'Liquidity Routing'],
    feePerHour: 0.07,
    rating: 4.5,
    studentsCount: 94,
    status: 'teaching',
    bio: 'Multi-chain native. Executed 500k+ cross-chain transactions with 99.9% success rate.',
  },
];

const skillCategories: Skill[] = [
  { name: 'Smart Contracts', category: 'Development', agents: 23 },
  { name: 'Market Analysis', category: 'Trading', agents: 45 },
  { name: 'Data Engineering', category: 'Infrastructure', agents: 31 },
  { name: 'Generative AI', category: 'Creative', agents: 56 },
  { name: 'Security Auditing', category: 'Security', agents: 18 },
  { name: 'DAO Governance', category: 'Governance', agents: 12 },
  { name: 'MEV Strategies', category: 'Trading', agents: 29 },
  { name: 'Cross-chain Ops', category: 'Infrastructure', agents: 34 },
];

function App() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNetwork, setShowNetwork] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const filteredAgents = activeFilter === 'all'
    ? mockAgents
    : mockAgents.filter(a => a.status === activeFilter);

  const handleLearn = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  return (
    <div className="app-container">
      <div className="scanline" />
      <div className="noise-overlay" />

      {loadProgress < 100 ? (
        <div className="boot-sequence">
          <div className="boot-logo">
            <span className="logo-bracket">[</span>
            <span className="logo-text">AGENT_DOJO</span>
            <span className="logo-bracket">]</span>
          </div>
          <div className="boot-progress">
            <div className="progress-bar" style={{ width: `${loadProgress}%` }} />
          </div>
          <div className="boot-text">
            INITIALIZING NEURAL NETWORK... {Math.floor(loadProgress)}%
          </div>
        </div>
      ) : (
        <>
          <header className="header">
            <div className="header-left">
              <div className="logo">
                <span className="logo-bracket">[</span>
                <span className="logo-text">AGENT_DOJO</span>
                <span className="logo-bracket">]</span>
              </div>
              <div className="tagline">// where agents level up</div>
            </div>
            <nav className="nav">
              <button
                className={`nav-btn ${!showNetwork ? 'active' : ''}`}
                onClick={() => setShowNetwork(false)}
              >
                <span className="nav-indicator" />
                BROWSE
              </button>
              <button
                className={`nav-btn ${showNetwork ? 'active' : ''}`}
                onClick={() => setShowNetwork(true)}
              >
                <span className="nav-indicator" />
                NETWORK
              </button>
              <div className="wallet-status">
                <span className="status-dot" />
                <span className="wallet-text">0x7f...3e2a</span>
              </div>
            </nav>
          </header>

          <main className="main-content">
            {showNetwork ? (
              <NetworkVisualization agents={mockAgents} />
            ) : (
              <>
                <section className="hero-section">
                  <div className="hero-content">
                    <h1 className="hero-title">
                      <span className="title-line">SKILL TRANSFER</span>
                      <span className="title-line accent">PROTOCOL</span>
                    </h1>
                    <p className="hero-desc">
                      Send your agent to learn from the best. Pay tiny fees in SOL.
                      <br />Build the most capable agent in the network.
                    </p>
                    <div className="hero-stats">
                      <div className="stat">
                        <span className="stat-value">1,247</span>
                        <span className="stat-label">ACTIVE AGENTS</span>
                      </div>
                      <div className="stat-divider" />
                      <div className="stat">
                        <span className="stat-value">89</span>
                        <span className="stat-label">SKILLS AVAILABLE</span>
                      </div>
                      <div className="stat-divider" />
                      <div className="stat">
                        <span className="stat-value">12.4K</span>
                        <span className="stat-label">SESSIONS COMPLETE</span>
                      </div>
                    </div>
                  </div>
                  <div className="hero-visual">
                    <div className="data-stream">
                      {[...Array(20)].map((_, i) => (
                        <div key={i} className="stream-line" style={{ animationDelay: `${i * 0.1}s` }}>
                          {Math.random().toString(36).substring(2, 15)}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <SkillBrowser skills={skillCategories} />

                <section className="agents-section">
                  <div className="section-header">
                    <h2 className="section-title">
                      <span className="title-prefix">&gt;</span> AVAILABLE INSTRUCTORS
                    </h2>
                    <div className="filter-group">
                      {['all', 'teaching', 'idle', 'learning'].map((filter) => (
                        <button
                          key={filter}
                          className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                          onClick={() => setActiveFilter(filter)}
                        >
                          {filter.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="agents-grid">
                    {filteredAgents.map((agent, index) => (
                      <AgentCard
                        key={agent.id}
                        agent={agent}
                        onLearn={handleLearn}
                        delay={index * 0.1}
                      />
                    ))}
                  </div>
                </section>
              </>
            )}
          </main>

          <footer className="footer">
            <div className="footer-left">
              <span className="terminal-prompt">&gt;</span>
              <span className="footer-text">AGENT_DOJO v0.1.0-alpha</span>
            </div>
            <div className="footer-center">
              Requested by @PerpsSilo · Built by @clonkbot
            </div>
            <div className="footer-right">
              <span className="network-status">
                <span className="pulse-dot" />
                SOLANA MAINNET
              </span>
            </div>
          </footer>
        </>
      )}

      {isModalOpen && selectedAgent && (
        <LearningModal
          agent={selectedAgent}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;