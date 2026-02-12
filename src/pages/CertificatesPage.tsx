import { Award, ArrowLeft } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import { Link } from 'react-router-dom'

export default function CertificatesPage() {
    const base = import.meta.env.BASE_URL
    const certificates = [
        {
            title: 'Model Context Protocol: Advanced Topics',
            issuer: 'Anthropic',
            date: 'Jan 2026',
            image: `${base}certificates/cert1.png`,
            description: 'Advanced certification covering Model Context Protocol concepts, architecture, and implementation patterns.'
        },
        {
            title: 'Introduction to Model Context Protocol',
            issuer: 'Anthropic',
            date: 'Jan 2026',
            image: `${base}certificates/cert2.png`,
            description: 'Foundational course on the Model Context Protocol, covering core principles and practical applications.'
        },
        {
            title: 'Artificial Intelligence for Economics',
            issuer: 'NPTEL / IIT Kharagpur',
            date: 'Jul–Sep 2025',
            image: `${base}certificates/cert3.png`,
            description: 'Elite certification with 82% score covering AI applications in economics. 8-week course by IIT Kharagpur via NPTEL.'
        },
        {
            title: 'AWS Cloud Quest: Cloud Practitioner',
            issuer: 'Amazon Web Services (AWS)',
            date: 'Apr 2023',
            image: `${base}certificates/cert4.png`,
            description: 'Hands-on cloud practitioner training covering AWS core services, cloud concepts, and deployment strategies.'
        },
        {
            title: 'Java (Basic)',
            issuer: 'HackerRank',
            date: 'Dec 2023',
            image: `${base}certificates/cert5.png`,
            description: 'Skill assessment certification demonstrating proficiency in Java programming fundamentals.'
        },
        {
            title: 'Play It Safe: Manage Security Risks',
            issuer: 'Google (Coursera)',
            date: 'Feb 2024',
            image: `${base}certificates/cert6.png`,
            description: 'Google Career Certificate course on identifying and managing security risks, threats, and vulnerabilities.'
        },
        {
            title: 'Foundations of Cybersecurity',
            issuer: 'Google (Coursera)',
            date: 'Jan 2024',
            image: `${base}certificates/cert7.png`,
            description: 'Google Career Certificate course covering core cybersecurity concepts, tools, and best practices.'
        },
    ]

    return (
        <div className="min-h-screen bg-gray-950/80 text-white selection:bg-emerald-500/30 overflow-y-auto">
            {/* Background elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,_rgba(120,60,255,0.15),_rgba(255,255,255,0))]"></div>
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,_rgba(0,255,255,0.1),_rgba(255,255,255,0))]"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12">
                <div className="mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-6 group">
                        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-white md:text-6xl mb-4">
                        <span className="text-cyan-400">Certificates</span> &amp; Achievements
                    </h1>
                    <p className="text-gray-400 max-w-2xl text-lg">
                        A collection of my professional certifications and accomplishments in software engineering, cloud computing, AI, and cybersecurity.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {certificates.map((cert, index) => (
                        <GlassCard key={index} className="group relative overflow-hidden flex flex-col gap-4 hover:border-cyan-500/30 transition-colors">
                            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-black/20">
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="flex flex-col gap-3 flex-grow">
                                <div className="flex items-start gap-4">
                                    <div className="rounded-full bg-cyan-500/20 p-3 text-cyan-400 shrink-0">
                                        <Award className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white leading-tight mb-1">{cert.title}</h3>
                                        <p className="text-sm font-medium text-cyan-300">{cert.issuer}</p>
                                        <p className="mt-1 text-xs text-gray-500">{cert.date}</p>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                                    {cert.description}
                                </p>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </div>
    )
}
