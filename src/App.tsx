import { Suspense, Component, type ReactNode } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Experience from './components/Experience'
import Hero from './components/Hero'
import SocialLinks from './components/SocialLinks'
import Projects from './components/Projects'
import LiquidCursor from './components/LiquidCursor'
import CertificatesPage from './pages/CertificatesPage'

// Error boundary to catch Three.js/WebGL crashes
class CanvasErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
    constructor(props: { children: ReactNode }) {
        super(props)
        this.state = { hasError: false }
    }
    static getDerivedStateFromError() {
        return { hasError: true }
    }
    render() {
        if (this.state.hasError) {
            return null
        }
        return this.props.children
    }
}

function Home() {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-gray-950 text-white selection:bg-emerald-500/30">
            {/* 3D Background */}
            <div className="fixed inset-0 z-0">
                <CanvasErrorBoundary>
                    <Suspense fallback={null}>
                        <Experience />
                    </Suspense>
                </CanvasErrorBoundary>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10">
                <Hero />
                <Projects />
                <div className="h-24"></div>
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
