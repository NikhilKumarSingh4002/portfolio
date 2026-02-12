import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Award } from 'lucide-react'
import GlassCard from './GlassCard'

export default function Hero() {
    return (
        <section className="relative flex min-h-screen items-center justify-center px-6 py-20">
            <div className="absolute top-6 right-6 z-20">
                <Link
                    to="/certificates"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all text-white font-medium group"
                >
                    <Award className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span>Certificates</span>
                </Link>
            </div>
            <div className="max-w-4xl text-center">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-4 text-xl font-medium text-emerald-400"
                >
                    Hello World
                </motion.h2>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-8 text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl"
                >
                    I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Nikhil</span> Kumar Singh
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mx-auto mb-12 max-w-2xl text-lg text-gray-300 md:text-xl"
                >
                    Passionate developer creating immersive web experiences.
                    Specializing in scalable applications and interactive 3D interfaces.
                </motion.p>

                <div className="flex flex-wrap justify-center gap-4">
                    <GlassCard className="cursor-pointer hover:bg-white/20" delay={0.6}>
                        <span className="font-semibold text-white">Java Developer</span>
                    </GlassCard>
                    <GlassCard className="cursor-pointer hover:bg-white/20" delay={0.7}>
                        <span className="font-semibold text-white">Problem Solver</span>
                    </GlassCard>
                    <GlassCard className="cursor-pointer hover:bg-white/20" delay={0.8}>
                        <span className="font-semibold text-white">Creative Thinker</span>
                    </GlassCard>
                </div>
            </div>
        </section>
    )
}
