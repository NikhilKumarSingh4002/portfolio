import { Suspense } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Experience from './components/Experience'
import Hero from './components/Hero'
import SocialLinks from './components/SocialLinks'
import Projects from './components/Projects'
import LiquidCursor from './components/LiquidCursor'
// import Certificates from './components/Certificates' // Keeping this for now if we want a preview, or we can remove it. Plan said to verify but maybe remove.
// Actually, let's keep the home page structure as "Home" and the new one as "CertificatesPage".
import CertificatesPage from './pages/CertificatesPage'

function Home() {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-gray-950 text-white selection:bg-emerald-500/30">
            {/* 3D Background */}
            <div className="fixed inset-0 z-0">
                <Suspense fallback={null}>
                    <Experience />
                </Suspense>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10">
                <Hero />
                <Projects />
                {/* Optional: Certificates Preview or Remove? User asked for redirect. 
                    I'll keep it for now but maybe the user wants it gone. 
                    Let's comment it out or keep it? The prompt said "redirecates to certificates page where list of certifcates are visible".
                    This implies they might NOT be visible here. I will remove the full list from here to avoid duplication.
                */}
                {/* <Certificates /> */}
                <div className="h-24"></div> {/* Bottom spacer */}
            </div>

            {/* Social Links */}
            <SocialLinks />

            {/* Scroll Indicator */}
            <div className="fixed bottom-8 right-8 z-40 hidden md:block">
                <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
            </div>
        </div>
    )
}

function App() {
    return (
        <Router>
            <LiquidCursor />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/certificates" element={<CertificatesPage />} />
            </Routes>
        </Router>
    )
}

export default App
