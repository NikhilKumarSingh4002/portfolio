import { Github, Linkedin, Mail } from 'lucide-react'
import GlassCard from './GlassCard'

export default function SocialLinks() {
    const links = [
        {
            name: 'GitHub',
            icon: Github,
            url: 'https://github.com/NikhilKumarSingh4002',
            color: 'hover:text-white',
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: 'https://www.linkedin.com/in/nikhil-kumar-singh-15165924b/',
            color: 'hover:text-blue-400',
        },
        {
            name: 'Email',
            icon: Mail,
            url: 'mailto:nkumarsingh625@gmail.com',
            color: 'hover:text-emerald-400',
        },
    ]

    return (
        <div className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 gap-4">
            {links.map((link, index) => (
                <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <GlassCard className="flex h-12 w-12 items-center justify-center !p-0 rounded-full hover:scale-110" delay={1 + index * 0.1}>
                        <link.icon className={`h-5 w-5 text-gray-400 transition-colors ${link.color}`} />
                    </GlassCard>
                </a>
            ))}
        </div>
    )
}
