import { Github, ExternalLink, Code2 } from 'lucide-react'
import GlassCard from './GlassCard'
import { motion } from 'framer-motion'

export default function Projects() {
    const projects = [
        {
            title: 'LeetCode Extension',
            description: 'A browser extension to enhance the LeetCode experience with video solutions and better navigation.',
            tags: ['JavaScript', 'Browser Extension', 'DOM Manipulation'],
            github: 'https://github.com/NikhilKumarSingh4002/LeetCode-Solutions-Extension', // Guessed URL structure or generic profile
            demo: null,
            featured: true,
        },
        {
            title: 'Portfolio Website',
            description: 'The 3D animated portfolio website you are currently viewing.',
            tags: ['React', 'Three.js', 'TailwindCSS'],
            github: 'https://github.com/NikhilKumarSingh4002',
            demo: '#',
            featured: false,
        },
        // Add more projects here
    ]

    return (
        <section className="container mx-auto px-6 py-20">
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-12 text-3xl font-bold text-white md:text-5xl"
            >
                Featured <span className="text-emerald-400">Projects</span>
            </motion.h2>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                    <GlassCard key={index} delay={index * 0.2} className="flex flex-col justify-between h-full">
                        <div>
                            <div className="mb-4 flex items-center justify-between">
                                <Code2 className="h-8 w-8 text-emerald-400" />
                                <div className="flex gap-4">
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-white hover:text-emerald-400 transition-colors">
                                            <Github className="h-6 w-6" />
                                            <span className="text-sm font-medium">Code</span>
                                        </a>
                                    )}
                                    {project.demo && (
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-white hover:text-cyan-400 transition-colors">
                                            <ExternalLink className="h-6 w-6" />
                                            <span className="text-sm font-medium">Demo</span>
                                        </a>
                                    )}
                                </div>
                            </div>

                            <h3 className="mb-2 text-xl font-bold text-white">{project.title}</h3>
                            <p className="mb-4 text-gray-300">{project.description}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {project.tags.map((tag) => (
                                <span key={tag} className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400 border border-emerald-500/20">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </GlassCard>
                ))}
            </div>

            <div className="mt-12 text-center">
                <a href="https://github.com/NikhilKumarSingh4002" target="_blank" rel="noopener noreferrer">
                    <GlassCard className="inline-block hover:bg-white/20 px-8 py-3">
                        <span className="text-white font-semibold">View All Projects on GitHub</span>
                    </GlassCard>
                </a>
            </div>
        </section>
    )
}
