import { useEffect, useState } from 'react'
import { config } from '../config.js'

// ============================================================
//  NO BUTTON — PLEADING POPUP SEQUENCE
// ============================================================
//  Each NO click opens a cute popup with a new playful message
//  and a "Try Again" type dismiss button. The only way to
//  proceed to the celebration screen is to click YES.
// ============================================================

const NO_POPUPS = [
  { message: 'Jana padega please baby 🥺❤️', button: 'Pleaseee 😭', emoji: '🥺' },
  { message: 'Baby pleaseeee, jana padega na 🥺👉👈', button: 'Still NO? 😭', emoji: '🥺' },
  { message: 'Please baby, mere saath jana padega ❤️', button: 'Please maan jao 🥹', emoji: '🥹' },
  {
    message: 'Jana hi padega 😭❤️ I’ve already decided.',
    button: 'Okay okay 😭',
    emoji: '😭',
  },
  { message: 'Baby pleaseeeee... ek date toh banti hai 🥺💕', button: 'Think again 😭', emoji: '🥺' },
  { message: 'NO option technically exist hi nahi karta 😌❤️', button: 'Okay fine...', emoji: '😌' },
  { message: 'Please baby pleaseeeeee, jana padega 🥹❤️', button: 'One more time 😭', emoji: '🥹' },
  {
    message: 'Tum nahi maanoge? 😭 Main toh manwa lungii...',
    button: 'Accha sun na 😭',
    emoji: '😭',
  },
  {
    message: 'Just one little date baby, I promise I’ll be cute 🥺💕',
    button: 'Fine, try again 😭',
    emoji: '🥺',
  },
  { message: 'Main ghar bana ke khaana pakaungi 😭❤️ Please?', button: 'Hmm... 😭', emoji: '😭' },
  { message: 'Ek smile ke liye ek date? Pleaseeee? 🥺', button: 'Try once more 😭', emoji: '🥺' },
  { message: 'Tum nahi jaoge toh main akeli... 😭💔', button: 'Don’t do this 😭', emoji: '😭' },
  { message: 'Okay baby, last last LAST time... Please 🥹❤️', button: 'Okay last time 😭', emoji: '🥹' },
  {
    message: 'I’ll be the cutest date ever, I promise 🥺💕',
    button: 'Pleaseeee 😭',
    emoji: '🥺',
  },
  {
    message: 'Man jao na baby, please 🥹❤️ Bohot pyaar se puch rahi hu',
    button: 'Acha try again 😭',
    emoji: '🥹',
  },
  { message: 'You know you want to say YES 😌❤️', button: 'Okay think 😭', emoji: '😌' },
  { message: 'I’m not giving up baby, jana padega 😤❤️', button: 'Try again 😭', emoji: '😤' },
  {
    message: 'Tumhari marzi nahi chalegi, mere rules hai 😌❤️',
    button: 'Okay okay 😭',
    emoji: '😌',
  },
  { message: 'Last try: YES bola toh ek extra kiss 😘', button: 'Hmm fine 😭', emoji: '😘' },
  {
    message: 'Okay fine, ek aur try... but I’m winning this 😌❤️',
    button: 'Try once more 😭',
    emoji: '😌',
  },
]

// NO button text variations (indexed by clickCount).
const NO_LABELS = [
  'NO 🙈',
  'no? 🙈',
  'nooo? 🙈',
  'really no? 🙈',
  'no pls 🙈',
  '...no? 🙈',
  'no? 🙈',
  'no 🙈',
  'no 🙈',
  'no 🙈',
  'no 🙈',
  'no 🙈',
  'no 🙈',
  'no 🙈',
  'no 🙈',
  'no 🙈',
  'no 🙈',
  'no 🙈',
  'no 🙈',
  'no 🙈',
]

// Decorative floating hearts on the main screen (pre-computed once).
const HEARTS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 6 + Math.random() * 6,
  size: 0.8 + Math.random() * 1.2,
}))

// Decorative twinkling sparkles on the main screen.
const SPARKLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 4,
  duration: 2 + Math.random() * 3,
}))

// Floating hearts inside the popup (smaller, fewer).
const POPUP_HEARTS = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 4,
  duration: 4 + Math.random() * 3,
  size: 0.7 + Math.random() * 0.8,
}))

export default function LandingScreen({ onYes }) {
  const [noCount, setNoCount] = useState(0)
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupClosing, setPopupClosing] = useState(false)
  const [yesScale, setYesScale] = useState(1)
  const [noScale, setNoScale] = useState(1)

  // Cycle through the popups. First NO click → index 0, etc. Cycles after 20.
  const popupIndex = noCount === 0 ? 0 : (noCount - 1) % NO_POPUPS.length
  const currentPopup = NO_POPUPS[popupIndex]
  const currentLabel = NO_LABELS[Math.min(noCount, NO_LABELS.length - 1)]

  const handleNoClick = () => {
    setNoCount((c) => c + 1)
    // Make YES slightly bigger and more attractive each time.
    setYesScale((s) => Math.min(1.55, s + 0.05))
    // Shrink NO a tiny bit so it stays usable but feels less appealing.
    setNoScale((s) => Math.max(0.78, s - 0.022))
    // Reset closing state and open the popup fresh.
    setPopupClosing(false)
    setPopupOpen(true)
  }

  const closePopup = () => {
    if (popupClosing || !popupOpen) return
    setPopupClosing(true)
    window.setTimeout(() => {
      setPopupOpen(false)
      setPopupClosing(false)
    }, 240)
  }

  // Close popup on Escape (keyboard accessibility).
  useEffect(() => {
    if (!popupOpen) return undefined
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        closePopup()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [popupOpen, popupClosing])

  // Lock body scroll while popup is open (mobile especially).
  useEffect(() => {
    if (!popupOpen) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [popupOpen])

  return (
    <section className="screen landing-screen" aria-label="Date invitation question">
      <div className="floating-hearts" aria-hidden="true">
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

      <main className="card">
        <div className="badge">IMPORTANT QUESTION FOR YOU 💌</div>

        <h1 className="main-question">
          {config.boyfriendName}, will you go on a date with me?{' '}
          <span className="heart-emoji" aria-hidden="true">
            ❤️
          </span>
        </h1>

        <p className="sub-question">I have a very important question to ask you...</p>

        <div className="buttons">
          <button
            type="button"
            className="btn btn-yes"
            onClick={onYes}
            style={{ transform: `scale(${yesScale})` }}
            aria-label="Yes, I will go on a date with you"
          >
            YES ❤️
          </button>

          <button
            type="button"
            className="btn btn-no"
            onClick={handleNoClick}
            style={{ transform: `scale(${noScale})` }}
            aria-label="No, I will not go on a date with you"
          >
            {currentLabel}
          </button>
        </div>

        <p className="hint">
          From <span className="hint-name">{config.yourName}</span> 💕
        </p>
      </main>

      {popupOpen && (
        <div
          className={`popup-overlay ${popupClosing ? 'closing' : ''}`}
          onClick={closePopup}
          role="presentation"
        >
          <div
            className={`popup-card ${popupClosing ? 'closing' : ''}`}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-message"
          >
            <div className="popup-hearts" aria-hidden="true">
              {POPUP_HEARTS.map((h) => (
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

            <div className="popup-emoji" aria-hidden="true">
              {currentPopup.emoji}
            </div>

            <p
              id="popup-message"
              className="popup-message"
              key={noCount}
            >
              {currentPopup.message}
            </p>

            <button
              type="button"
              className="btn btn-popup"
              onClick={closePopup}
              aria-label="Okay, try again"
            >
              {currentPopup.button}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
