import { useCallback, useState } from 'react'
import LandingScreen from './components/LandingScreen.jsx'
import YesScreen from './components/YesScreen.jsx'

export default function App() {
  const [accepted, setAccepted] = useState(false)

  const handleAccept = useCallback(() => {
    setAccepted(true)
  }, [])

  const handleRestart = useCallback(() => {
    setAccepted(false)
  }, [])

  return (
    <div className="app-root">
      <div className="background-aurora" aria-hidden="true" />

      <div className="screen-wrapper" key={accepted ? 'yes' : 'landing'}>
        {!accepted ? (
          <LandingScreen onYes={handleAccept} />
        ) : (
          <YesScreen onRestart={handleRestart} />
        )}
      </div>
    </div>
  )
}
