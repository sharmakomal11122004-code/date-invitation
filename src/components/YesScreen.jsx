import { config } from '../config.js'
import Confetti from './Confetti.jsx'

// Dense floating hearts for the celebration screen.
const HEARTS = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 10,
  duration: 5 + Math.random() * 7,
  size: 0.85 + Math.random() * 1.5,
}))

const SPARKLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 4,
  duration: 2 + Math.random() * 3,
}))

const PLAN_CARDS = [
  { icon: '🍜', name: 'FOOD', desc: 'whatever you like ' },
  { icon: '🎬', name: 'TIME', desc: 'Just us, no distractions no pubg' },
  { icon: '❤️', name: 'US', desc: 'Making another memory together' },
]

export default function YesScreen({ onRestart }) {
  const messageLines = config.customMessage.split('\n')

  return (
    <section className="screen yes-screen" aria-label="Date accepted celebration">
      <Confetti />

      <div className="floating-hearts dense" aria-hidden="true">
        {HEARTS.map((h) => (
          <span
            key={h.id}
            className="heart"
            style={{
              left: `${h.left}%`,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
              fontSize: `${h.size}rem`,
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      <div className="sparkles" aria-hidden="true">
        {SPARKLES.map((s) => (
          <span
            key={s.id}
            className="sparkle"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      <main className="card yes-card">
        <div className="badge">DATE INVITATION ACCEPTED 💌</div>

        <h1 className="yes-title">YAYYYYY! ❤️🥹</h1>

        <p className="yes-subtitle">
          finally we are going on a date! 😭❤️
        </p>
        <p className="yes-subtitle-2">
          I knew you’d say yes, {config.boyfriendName.toLowerCase()}. 😌
        </p>

        <p className="congrats-line">
          <strong>Congratulations!</strong>
          <br />
          You have officially accepted your date invitation. 💌
        </p>

        <div className="date-card-inner">
          <h2 className="date-card-title">{config.dateText}</h2>

          <div className="date-card-row">
            <span className="row-label">Date status:</span>
            <span>CONFIRMED ❤️</span>
          </div>
          <div className="date-card-row">
            <span className="row-label">Partner:</span>
            <span>My love🫶</span>
          </div>
          <div className="date-card-row">
            <span className="row-label">Mission:</span>
            <span>Spend some quality time together 💕</span>
          </div>
          <div className="date-card-row">
            <span className="row-label">Vibe:</span>
            <span>Food + talks + laughs + us ✨</span>
          </div>
        </div>

        <div className="plan-section">
          <h3 className="plan-title">Our little plan ✨</h3>
          <div className="plan-cards">
            {PLAN_CARDS.map((c) => (
              <div className="plan-card" key={c.name}>
                <div className="plan-icon" aria-hidden="true">
                  {c.icon}
                </div>
                <div className="plan-name">{c.name}</div>
                <div className="plan-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="personal-message">
          <p className="from-me">From me to you ❤️</p>
          <p className="custom-message">
            {messageLines.map((line, i) => (
              <span className="msg-line" key={i}>
                {line}
              </span>
            ))}
          </p>
        </div>

        <button
          type="button"
          className="btn btn-restart"
          onClick={onRestart}
          aria-label="Read the invitation again"
        >
          Read it again? 🥹
        </button>
      </main>
    </section>
  )
}
