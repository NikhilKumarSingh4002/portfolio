import { Award, ExternalLink } from 'lucide-react'
import GlassCard from './GlassCard'
import { motion } from 'framer-motion'

export default function Certificates() {
    // Placeholder data - User should replace with actual certificates from LinkedIn
    const certificates = [
        {
            title: 'Certificate 1',
            issuer: 'Issuer Name',
            date: '2024',
            image: '/certificates/cert1.png',
            link: '#',
        },
        {
            title: 'Certificate 2',
            issuer: 'Issuer Name',
            date: '2024',
            image: '/certificates/cert2.png',
            link: '#',
        },
        {
            title: 'Certificate 3',
            issuer: 'Issuer Name',
            date: '2024',
            image: '/certificates/cert3.png',
            link: '#',
        },
        {
            title: 'Certificate 4',
            issuer: 'Issuer Name',
            date: '2024',
            image: '/certificates/cert4.png',
            link: '#',
        },
        {
            title: 'Certificate 5',
            issuer: 'Issuer Name',
            date: '2024',
            image: '/certificates/cert5.png',
            link: '#',
        },
        {
            title: 'Certificate 6',
            issuer: 'Issuer Name',
            date: '2024',
            image: '/certificates/cert6.png',
            link: '#',
        },
        {
            title: 'Certificate 7',
            issuer: 'Issuer Name',
            date: '2024',
            image: '/certificates/cert7.png',
            link: '#',
        },
    ]

    return (
        <section className="container mx-auto px-6 py-20">
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-12 text-3xl font-bold text-white md:text-5xl"
            >
                <span className="text-cyan-400">Certificates</span> & Achievements
            </motion.h2>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {certificates.map((cert, index) => (
                    <GlassCard key={index} delay={index * 0.15} className="group relative overflow-hidden flex flex-col gap-4 hover:scale-[1.02] transition-transform">
                        <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-black/20">
                            <img
                                src={cert.image}
                                alt={cert.title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-cyan-500/20 p-3 text-cyan-400 shrink-0">
                                    <Award className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white leading-tight mb-1">{cert.title}</h3>
                                    <p className="text-sm text-gray-400">{cert.issuer}</p>
                                    <p className="mt-1 text-xs text-gray-500">{cert.date}</p>
                                </div>
                            </div>

                            <a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-white/5 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-cyan-400"
                            >
                                <ExternalLink className="h-4 w-4" />
                                View Certificate
                            </a>
                        </div>
                    </GlassCard>
                ))}
            </div>

            <div className="mt-8 text-center text-gray-500 text-sm">
                More details available on <a href="https://www.linkedin.com/in/nikhil-kumar-singh-15165924b/" target="_blank" className="text-cyan-400 hover:underline">LinkedIn</a>
            </div>
        </section>
    )
}
