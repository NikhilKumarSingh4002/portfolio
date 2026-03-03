import { useEffect, useRef } from 'react'

type TrailPoint = {
    x: number
    y: number
    life: number
}

const MAX_DPR = 2
const MAX_POINTS = 26
const IDLE_MS = 120

export default function LiquidCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        if (!window.matchMedia('(pointer: fine)').matches) {
            return
        }

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let frameId: number | null = null
        let lastFrameAt = 0
        let lastMovedAt = 0
        let width = 0
        let height = 0
        let dpr = 1

        const pointer = {
            x: window.innerWidth * 0.5,
            y: window.innerHeight * 0.5,
            active: false,
        }

        const comet = {
            x: pointer.x,
            y: pointer.y,
            vx: 0,
            vy: 0,
        }

        const trail: TrailPoint[] = []

        const resize = () => {
            dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
            width = window.innerWidth
            height = window.innerHeight

            canvas.width = Math.floor(width * dpr)
            canvas.height = Math.floor(height * dpr)
            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height)

            if (trail.length > 1) {
                for (let i = 1; i < trail.length; i += 1) {
                    const a = trail[i - 1]
                    const b = trail[i]
                    const alpha = Math.max(a.life, b.life)
                    const widthScale = 1 - i / trail.length

                    ctx.strokeStyle = `rgba(34, 211, 238, ${alpha * 0.8})`
                    ctx.lineWidth = 1.3 + widthScale * 8
                    ctx.lineCap = 'round'
                    ctx.beginPath()
                    ctx.moveTo(a.x, a.y)
                    ctx.lineTo(b.x, b.y)
                    ctx.stroke()
                }
            }

            if (trail.length > 0) {
                const head = trail[0]
                const glow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 22)
                glow.addColorStop(0, 'rgba(34, 211, 238, 0.95)')
                glow.addColorStop(1, 'rgba(34, 211, 238, 0)')
                ctx.fillStyle = glow
                ctx.beginPath()
                ctx.arc(head.x, head.y, 22, 0, Math.PI * 2)
                ctx.fill()

                ctx.fillStyle = 'rgba(236, 254, 255, 0.95)'
                ctx.beginPath()
                ctx.arc(head.x, head.y, 4.5, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        const tick = (now: number) => {
            const dtMs = lastFrameAt > 0 ? Math.min(now - lastFrameAt, 32) : 16
            lastFrameAt = now
            const dt = dtMs / 16.67

            const dx = pointer.x - comet.x
            const dy = pointer.y - comet.y

            comet.vx += dx * 0.2 * dt
            comet.vy += dy * 0.2 * dt

            const recentlyMoved = now - lastMovedAt < IDLE_MS
            const damping = recentlyMoved ? 0.62 : 0.5
            comet.vx *= damping
            comet.vy *= damping

            comet.x += comet.vx
            comet.y += comet.vy

            const speed = Math.abs(comet.vx) + Math.abs(comet.vy)
            const shouldEmit = pointer.active && (recentlyMoved || speed > 0.1)

            if (shouldEmit) {
                trail.unshift({ x: comet.x, y: comet.y, life: 1 })
                if (trail.length > MAX_POINTS) {
                    trail.length = MAX_POINTS
                }
            }

            for (let i = trail.length - 1; i >= 0; i -= 1) {
                trail[i].life -= 0.06 * dt
                if (trail[i].life <= 0) {
                    trail.splice(i, 1)
                }
            }

            draw()

            const isIdle = now - lastMovedAt >= IDLE_MS
            const shouldStop = isIdle && speed < 0.02 && trail.length === 0
            if (shouldStop) {
                frameId = null
                return
            }

            frameId = window.requestAnimationFrame(tick)
        }

        const ensureLoop = () => {
            if (frameId !== null) return
            lastFrameAt = 0
            frameId = window.requestAnimationFrame(tick)
        }

        const handlePointerMove = (e: PointerEvent) => {
            pointer.x = e.clientX
            pointer.y = e.clientY
            pointer.active = true
            lastMovedAt = performance.now()
            ensureLoop()
        }

        const handlePointerLeave = () => {
            pointer.active = false
            lastMovedAt = performance.now()
            ensureLoop()
        }

        resize()
        window.addEventListener('resize', resize, { passive: true })
        window.addEventListener('pointermove', handlePointerMove, { passive: true })
        window.addEventListener('pointerleave', handlePointerLeave)

        return () => {
            if (frameId !== null) {
                window.cancelAnimationFrame(frameId)
            }
            window.removeEventListener('resize', resize)
            window.removeEventListener('pointermove', handlePointerMove)
            window.removeEventListener('pointerleave', handlePointerLeave)
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
