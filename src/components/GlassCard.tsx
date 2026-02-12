import clsx from 'clsx'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlassCardProps {
    children: ReactNode
    className?: string
    delay?: number
}

export default function GlassCard({ children, className, delay = 0 }: GlassCardProps) {
    return (
        <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: 'easeOut' }}
            viewport={{ once: true }}
            className={clsx(
                'relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-2xl',
                'hover:border-white/20 hover:bg-white/10 transition-all duration-300',
                className
            )}
        >
            <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-white/5 blur-3xl" />
            <div className="relative z-10">{children}</div>
        </motion.div>
    )
}
