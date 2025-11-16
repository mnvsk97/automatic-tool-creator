'use client';

import { useState } from 'react';

// Placeholder data - easily replaceable with real data later
const PLACEHOLDER_ITERATIONS = [
  { id: 1, timestamp: '2025-10-06 19:34:00', status: 'completed', loss: 0.182 },
  { id: 2, timestamp: '2025-10-06 20:15:00', status: 'completed', loss: 0.165 },
  { id: 3, timestamp: '2025-10-06 21:42:00', status: 'in_progress', loss: 0.148 },
];

const AVAILABLE_SKILLS = [
  { id: 'frontend-design', name: 'frontend-design', enabled: true },
  { id: 'algorithmic-art', name: 'algorithmic-art', enabled: false },
  { id: 'canvas-design', name: 'canvas-design', enabled: false },
  { id: 'slack-gif-creator', name: 'slack-gif-creator', enabled: false },
  { id: 'artifacts-builder', name: 'artifacts-builder', enabled: false },
  { id: 'mcp-builder', name: 'mcp-builder', enabled: false },
  { id: 'webapp-testing', name: 'webapp-testing', enabled: false },
  { id: 'brand-guidelines', name: 'brand-guidelines', enabled: false },
  { id: 'internal-comms', name: 'internal-comms', enabled: false },
  { id: 'theme-factory', name: 'theme-factory', enabled: false },
];

const PLACEHOLDER_CANDIDATES = [
  {
    id: 'candidate-1',
    name: 'Variant A: Minimal Cards',
    preview: '/api/placeholder/400/300',
    sandboxUrl: 'https://daytona.io/preview/abc123',
    features: ['Clean grid layout', 'Subtle shadows', 'High contrast text'],
    timestamp: '2025-10-06 21:42:12',
  },
  {
    id: 'candidate-2',
    name: 'Variant B: Dense Info',
    preview: '/api/placeholder/400/300',
    sandboxUrl: 'https://daytona.io/preview/def456',
    features: ['Compact spacing', 'Borderless design', 'Monochrome palette'],
    timestamp: '2025-10-06 21:42:18',
  },
  {
    id: 'candidate-3',
    name: 'Variant C: Asymmetric',
    preview: '/api/placeholder/400/300',
    sandboxUrl: 'https://daytona.io/preview/ghi789',
    features: ['Diagonal flow', 'Variable sizing', 'Dynamic hierarchy'],
    timestamp: '2025-10-06 21:42:24',
  },
];

export default function Home() {
  const [repoUrl, setRepoUrl] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('frontend-design');
  const [userPrompt, setUserPrompt] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState<'idle' | 'generating' | 'ready' | 'evolving'>('ready');

  const handleGenerate = () => {
    setStatus('generating');
    // Placeholder - will connect to backend later
    setTimeout(() => setStatus('ready'), 2000);
  };

  const handleSubmitFeedback = () => {
    setStatus('evolving');
    // Placeholder - will connect to backend later
    setTimeout(() => {
      setStatus('idle');
      setSelectedCandidate(null);
      setFeedback('');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="hairline border-b px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">SkillEvolve</h1>
          <p className="text-[13px] text-[var(--text-tertiary)] mt-1">
            Self-improving agent skills through execution feedback
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider">Iteration</div>
            <div className="text-2xl font-semibold tabular-nums">03</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Sidebar - Evolution Log */}
        <aside className="w-80 hairline border-r flex flex-col">
          <div className="p-4 hairline border-b">
            <span className="section-tag">Evolution Log</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {PLACEHOLDER_ITERATIONS.map((iter, idx) => (
              <div
                key={iter.id}
                onClick={() => {/* Placeholder - will load iteration details later */}}
                className={`p-5 hairline border-b cursor-pointer transition-all hover:bg-[var(--bg-paper)] ${
                  idx === PLACEHOLDER_ITERATIONS.length - 1 ? 'bg-[var(--bg-card)]' : ''
                }`}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm font-semibold">Iteration {iter.id}</span>
                  <span className="text-[11px] text-[var(--text-tertiary)]">#{iter.id}</span>
                </div>
                <div className="text-[13px] text-[var(--text-secondary)] mb-3">
                  {iter.timestamp}
                </div>
                <div className="flex items-baseline gap-4">
                  <div>
                    <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">Loss</div>
                    <div className="text-base font-semibold tabular-nums">{iter.loss.toFixed(3)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">Status</div>
                    <div className="text-[13px] capitalize">{iter.status.replace('_', ' ')}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Center - Main Workspace */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-8">
            {/* Repository Input */}
            <section className="mb-8">
              <div className="mb-3">
                <span className="section-tag">Repository Input</span>
              </div>
              <div className="card">
                <label className="block text-[13px] text-[var(--text-secondary)] mb-2 uppercase tracking-wide">
                  GitHub Repository URL
                </label>
                <input
                  type="url"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/username/repo"
                  className="mb-5"
                />

                <label className="block text-[13px] text-[var(--text-secondary)] mb-2 uppercase tracking-wide">
                  Select Skill
                </label>
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="mb-5"
                >
                  {AVAILABLE_SKILLS.map((skill) => (
                    <option
                      key={skill.id}
                      value={skill.id}
                      disabled={!skill.enabled}
                      className={!skill.enabled ? 'text-[var(--text-tertiary)]' : ''}
                    >
                      {skill.name} {!skill.enabled ? '(coming soon)' : ''}
                    </option>
                  ))}
                </select>

                <label className="block text-[13px] text-[var(--text-secondary)] mb-2 uppercase tracking-wide">
                  User Prompt
                </label>
                <input
                  type="text"
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  placeholder="e.g., Create a modern budgeting app with dark mode and data visualization"
                  className="mb-5"
                />

                <button onClick={handleGenerate} className="btn-primary w-full">
                  Generate Designs
                </button>
              </div>
            </section>

            {/* Status */}
            {status !== 'idle' && (
              <section className="mb-8">
                <div className="card bg-[var(--bg-paper)] text-center py-8">
                  <div className="text-[12px] uppercase tracking-widest text-[var(--text-tertiary)] mb-2">
                    {status === 'generating' && 'Generating Candidate Designs...'}
                    {status === 'ready' && 'Ready for Selection'}
                    {status === 'evolving' && 'Evolving Skill...'}
                  </div>
                  {status === 'generating' && (
                    <div className="flex items-center justify-center gap-1.5 mt-4">
                      <div className="w-2 h-2 bg-[var(--text-primary)] rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-[var(--text-primary)] rounded-full animate-pulse [animation-delay:150ms]"></div>
                      <div className="w-2 h-2 bg-[var(--text-primary)] rounded-full animate-pulse [animation-delay:300ms]"></div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Candidate Designs */}
            {status === 'ready' && (
              <>
                <section className="mb-8">
                  <div className="mb-3">
                    <span className="section-tag">Candidate Designs</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {PLACEHOLDER_CANDIDATES.map((candidate) => (
                      <div
                        key={candidate.id}
                        className={`card cursor-pointer transition-all ${
                          selectedCandidate === candidate.id
                            ? 'border-[2px] !border-[var(--accent-primary)] bg-[var(--bg-paper)]'
                            : 'hover:border-[var(--border-medium)]'
                        }`}
                        onClick={() => setSelectedCandidate(candidate.id)}
                      >
                        {/* Preview placeholder */}
                        <div className="aspect-[4/3] bg-[var(--bg-paper)] hairline mb-4 flex items-center justify-center text-[11px] text-[var(--text-tertiary)]">
                          PREVIEW
                        </div>

                        <h3 className="text-sm font-semibold mb-2">{candidate.name}</h3>

                        <div className="text-[12px] text-[var(--text-tertiary)] mb-4">
                          {candidate.timestamp}
                        </div>

                        <div className="mb-4">
                          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
                            Key Features
                          </div>
                          <ul className="text-[13px] space-y-1.5">
                            {candidate.features.map((feature, idx) => (
                              <li key={idx} className="text-[var(--text-secondary)]">• {feature}</li>
                            ))}
                          </ul>
                        </div>

                        <a
                          href={candidate.sandboxUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline block text-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Open in Daytona →
                        </a>

                        {selectedCandidate === candidate.id && (
                          <div className="mt-4 pt-3 pb-1 hairline border-t flex items-center justify-center gap-2">
                            <div className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full"></div>
                            <span className="text-[11px] uppercase tracking-wider text-[var(--accent-primary)] font-semibold">Selected</span>
                            <div className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Feedback Form */}
                {selectedCandidate && (
                  <section className="mb-8">
                    <div className="mb-3">
                      <span className="section-tag">Selection Feedback</span>
                    </div>
                    <div className="card">
                      <label className="block text-[11px] text-[var(--text-secondary)] mb-2 uppercase tracking-wide">
                        Why did you choose this design? (Optional)
                      </label>
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Share your thoughts on what makes this design effective..."
                        className="mb-4"
                      />
                      <button onClick={handleSubmitFeedback} className="btn-primary">
                        Submit & Evolve Skill
                      </button>
                    </div>
                  </section>
                )}
              </>
            )}
          </div>
        </main>

        {/* Right Sidebar - Info */}
        <aside className="w-80 hairline border-l">
          <div className="p-4 hairline border-b">
            <span className="section-tag">Configuration</span>
          </div>
          <div className="p-5">
            <div className="mb-6">
              <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
                Base Skill
              </div>
              <div className="text-sm">frontend-design</div>
            </div>

            <div className="mb-6">
              <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
                Sandbox Provider
              </div>
              <div className="text-sm">Daytona</div>
            </div>

            <div className="mb-6">
              <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
                Candidates per Iteration
              </div>
              <div className="text-sm">3</div>
            </div>

            <div className="hairline border-t pt-6 mt-6">
              <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-3">
                About SkillEvolve
              </div>
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                Submit a GitHub repo and watch Claude generate three design candidates using the frontend-design skill. Select your favorite, share feedback, and the skill evolves—learning from your choices to create better designs with each iteration.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
