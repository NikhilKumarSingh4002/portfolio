import { useEffect, useRef } from 'react'

interface LiquidBlob {
    x: number
    y: number
    radius: number
    maxRadius: number
    opacity: number
    vx: number
    vy: number
    born: number
    life: number
    hue: number
}

export default function LiquidCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animId: number
        let blobs: LiquidBlob[] = []
        let lastX = 0
        let lastY = 0
        let lastTime = 0

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        // Very low threshold — triggers with nearly any movement
        const SPEED_THRESHOLD = 0.5
        // Dense spawning so blobs overlap & merge into liquid
        const SPAWN_INTERVAL = 5
        let distAccum = 0

        const handleMouseMove = (e: MouseEvent) => {
            const now = performance.now()
            const dx = e.clientX - lastX
            const dy = e.clientY - lastY
            const dist = Math.sqrt(dx * dx + dy * dy)
            const dt = now - lastTime || 16

            const speed = dist / (dt / 16)

            if (speed > SPEED_THRESHOLD) {
                distAccum += dist

                while (distAccum >= SPAWN_INTERVAL) {
                    distAccum -= SPAWN_INTERVAL

                    const t = distAccum / (dist || 1)
                    const bx = e.clientX - dx * t
                    const by = e.clientY - dy * t

                    // Large, soft blobs that merge together
                    const sizeScale = Math.min(speed / 8, 2.5)
                    const maxR = 35 + sizeScale * 25 + Math.random() * 15

                    blobs.push({
                        x: bx + (Math.random() - 0.5) * 4,
                        y: by + (Math.random() - 0.5) * 4,
                        radius: 0,
                        maxRadius: maxR,
                        opacity: 0.12 + Math.random() * 0.08, // very subtle glow
                        // Very slow drift — liquid doesn't fly away
                        vx: dx * 0.005 + (Math.random() - 0.5) * 0.3,
                        vy: dy * 0.005 + (Math.random() - 0.5) * 0.3,
                        born: now,
                        life: 900 + Math.random() * 500,
                        hue: 200 + Math.random() * 40, // deep blue-cyan range
                    })
                }
            } else {
                distAccum = 0
            }

            lastX = e.clientX
            lastY = e.clientY
            lastTime = now
        }

        window.addEventListener('mousemove', handleMouseMove)

        const draw = () => {
            const now = performance.now()
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Lighter blend so blobs merge with each other softly
            ctx.globalCompositeOperation = 'lighter'

            blobs = blobs.filter((b) => {
                const age = now - b.born
                if (age > b.life) return false

                const progress = age / b.life

                // Slow expansion, then very gradual shrink — like liquid settling
                if (progress < 0.35) {
                    // Ease-out expansion
                    const t = progress / 0.35
                    b.radius = b.maxRadius * (1 - (1 - t) * (1 - t))
                } else {
                    // Slow shrink
                    const t = (progress - 0.35) / 0.65
                    b.radius = b.maxRadius * (1 - t * t)
                }

                // Gentle fade throughout
                const fadeOpacity =
                    progress < 0.3
                        ? b.opacity * (progress / 0.3) // fade in
                        : b.opacity * (1 - (progress - 0.3) / 0.7) // fade out

                // Very slow drift — liquid pools in place
                b.x += b.vx
                b.y += b.vy
                b.vx *= 0.985
                b.vy *= 0.985

                if (b.radius <= 1) return false

                // Large, soft radial gradient — looks like liquid
                const grad = ctx.createRadialGradient(
                    b.x, b.y, 0,
                    b.x, b.y, b.radius
                )
                grad.addColorStop(0, `hsla(${b.hue}, 60%, 45%, ${fadeOpacity})`)
                grad.addColorStop(0.3, `hsla(${b.hue}, 55%, 35%, ${fadeOpacity * 0.7})`)
                grad.addColorStop(0.6, `hsla(${b.hue}, 50%, 25%, ${fadeOpacity * 0.35})`)
                grad.addColorStop(1, `hsla(${b.hue}, 45%, 20%, 0)`)

                ctx.beginPath()
                ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2)
                ctx.fillStyle = grad
                ctx.fill()

                return true
            })

            ctx.globalCompositeOperation = 'source-over'
            animId = requestAnimationFrame(draw)
        }

        animId = requestAnimationFrame(draw)

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                pointerEvents: 'none',
            }}
        />
    )
}
