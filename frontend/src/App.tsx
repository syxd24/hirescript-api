import { useState } from 'react'
import './App.css'
import GeneratorForm from './components/GeneratorForm'
import LandingPage from './components/LandingPage'
import Navbar from './components/Navbar'

type View = 'landing' | 'generator'

function App() {
  const [view, setView] = useState<View>('landing')

  const showGenerator = () => {
    setView('generator')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const showLanding = () => {
    setView('landing')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app-shell">
      {view === 'landing' ? (
        <>
          <Navbar onLogoClick={showLanding} onGenerateClick={showGenerator} />
          <LandingPage onGenerateClick={showGenerator} />
        </>
      ) : (
        <GeneratorForm onBackToLanding={showLanding} />
      )}
    </div>
  )
}

export default App
