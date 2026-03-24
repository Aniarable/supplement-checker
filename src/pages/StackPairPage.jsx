import { useParams, Link } from 'react-router-dom'
import seoPairs from '../data/seo-pairs.json'
import SeoHead from '../components/SeoHead.jsx'
import AdPlaceholder from '../components/AdPlaceholder.jsx'
import './StackPairPage.css'

const INTERACTION_LABELS = {
  synergy: { label: 'Synergy', emoji: '+', className: 'badge-synergy' },
  competition: { label: 'Competition', emoji: '!', className: 'badge-competition' },
  conflict: { label: 'Conflict', emoji: 'X', className: 'badge-conflict' },
  neutral: { label: 'Neutral', emoji: '-', className: 'badge-neutral' }
}

function capitalize(str) {
  return str.replace(/(^|\s)\S/g, c => c.toUpperCase())
}

function TimingCard({ data }) {
  return (
    <div className="timing-card">
      <h4>{capitalize(data.name)}</h4>
      <ul>
        <li><strong>Best time:</strong> {data.best}</li>
        <li><strong>With food:</strong> {data.withFood ? 'Yes' : 'No'}</li>
        <li>{data.note}</li>
      </ul>
    </div>
  )
}

export default function StackPairPage() {
  const { slug } = useParams()
  const pair = seoPairs.find(p => p.slug === slug)

  if (!pair) {
    return (
      <div className="pair-page">
        <div className="pair-container">
          <h1>Pair not found</h1>
          <p>We don't have data for this supplement combination yet.</p>
          <Link to="/" className="cta-button">Check your stack</Link>
        </div>
      </div>
    )
  }

  const badge = INTERACTION_LABELS[pair.interaction.type] || INTERACTION_LABELS.neutral

  return (
    <div className="pair-page">
      <SeoHead
        title={pair.title}
        description={pair.metaDescription}
        pair={pair}
      />

      <div className="pair-container">
        <header className="pair-header">
          <Link to="/" className="back-link">&larr; Back to Supplement Checker</Link>
          <h1>{pair.title}</h1>
          <span className={`interaction-badge ${badge.className}`}>
            [{badge.emoji}] {badge.label}
          </span>
        </header>

        <section className="pair-intro">
          <p>{pair.intro}</p>
        </section>

        <AdPlaceholder slot="pair-top" />

        <section className="pair-section">
          <h2>Interaction</h2>
          <p className="interaction-summary">{pair.interaction.summary}</p>
          <p>{pair.interaction.details}</p>
        </section>

        <section className="pair-section">
          <h2>Timing</h2>
          <p className="timing-recommendation">{pair.timing.recommendation}</p>
          <div className="timing-grid">
            <TimingCard data={pair.timing.suppA} />
            <TimingCard data={pair.timing.suppB} />
          </div>
        </section>

        <AdPlaceholder slot="pair-middle" />

        <section className="pair-section">
          <h2>Goals</h2>
          <div className="goals-list">
            {pair.goals.map(goal => (
              <span key={goal} className="goal-tag">{goal}</span>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
