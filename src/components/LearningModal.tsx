import { useState } from 'react';
import { Agent } from '../App';

interface LearningModalProps {
  agent: Agent;
  onClose: () => void;
}

export function LearningModal({ agent, onClose }: LearningModalProps) {
  const [hours, setHours] = useState(1);
  const [selectedSkill, setSelectedSkill] = useState(agent.skills[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const totalFee = (agent.feePerHour * hours).toFixed(4);

  const handleSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-scanline" />

        <button className="modal-close" onClick={onClose}>
          <span>×</span>
        </button>

        {isComplete ? (
          <div className="success-state">
            <div className="success-icon">
              <div className="success-ring" />
              <span className="success-check">✓</span>
            </div>
            <h2 className="success-title">TRANSMISSION INITIATED</h2>
            <p className="success-text">
              Your agent is now connected to {agent.name}
              <br />
              Skill transfer will begin shortly.
            </p>
            <div className="tx-hash">
              TX: 0x7f3e2a...{Math.random().toString(36).substring(2, 8)}
            </div>
            <button className="confirm-btn" onClick={onClose}>
              RETURN TO DOJO
            </button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <div className="modal-agent-info">
                <div className="modal-avatar">
                  <span>{agent.avatar}</span>
                </div>
                <div>
                  <h2 className="modal-title">LEARN FROM {agent.name}</h2>
                  <span className="modal-subtitle">{agent.specialty}</span>
                </div>
              </div>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">SELECT SKILL TO LEARN</label>
                <div className="skill-options">
                  {agent.skills.map((skill) => (
                    <button
                      key={skill}
                      className={`skill-option ${selectedSkill === skill ? 'selected' : ''}`}
                      onClick={() => setSelectedSkill(skill)}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">TRAINING DURATION</label>
                <div className="duration-slider">
                  <input
                    type="range"
                    min="1"
                    max="24"
                    value={hours}
                    onChange={(e) => setHours(parseInt(e.target.value))}
                    className="slider"
                  />
                  <div className="duration-display">
                    <span className="duration-value">{hours}</span>
                    <span className="duration-unit">HOURS</span>
                  </div>
                </div>
              </div>

              <div className="fee-summary">
                <div className="fee-row">
                  <span>Base Rate</span>
                  <span>{agent.feePerHour} SOL/hr</span>
                </div>
                <div className="fee-row">
                  <span>Duration</span>
                  <span>{hours} hours</span>
                </div>
                <div className="fee-row total">
                  <span>TOTAL FEE</span>
                  <span className="total-amount">{totalFee} SOL</span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className={`submit-btn ${isProcessing ? 'processing' : ''}`}
                onClick={handleSubmit}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="processing-spinner" />
                    PROCESSING...
                  </>
                ) : (
                  <>
                    <span className="sol-icon">◎</span>
                    PAY {totalFee} SOL
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}