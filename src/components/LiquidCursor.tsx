import { useEffect, useRef } from 'react'

type TrailPoint = {
    x: number
    y: number
    life: number
}

const MAX_DPR = 1.5
const MAX_POINTS = 20
const IDLE_MS = 90
const MIN_EMIT_DISTANCE = 1.5

export default function LiquidCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        if (!window.matchMedia('(pointer: fine)').matches) {
            return
        }
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
        let lastEmitX = 0
        let lastEmitY = 0

        const pointer = {
            x: window.innerWidth * 0.5,
            y: window.innerHeight * 0.5,
            active: false,
        }

        const comet = {
            x: pointer.x,
            y: pointer.y,
            dx: 1,
            dy: 0,
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
                    const t = i / (trail.length - 1)
                    const fade = (1 - t) * (1 - t)
                    const alpha = Math.max(a.life, b.life) * fade * 0.9
                    const widthScale = 1 - t

                    ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`
                    ctx.lineWidth = 0.8 + widthScale * widthScale * 4.4
                    ctx.lineCap = 'round'
                    ctx.beginPath()
                    ctx.moveTo(a.x, a.y)
                    ctx.lineTo(b.x, b.y)
                    ctx.stroke()
                }
            }

            if (trail.length > 0) {
                const head = trail[0]
                const angle = Math.atan2(comet.dy, comet.dx)
                const tailLength = 14 + Math.min(34, trail.length * 1.4)

                // Directional glow behind the head so it reads as a comet.
                ctx.save()
                ctx.translate(head.x, head.y)
                ctx.rotate(angle)
                const streak = ctx.createLinearGradient(0, 0, -tailLength, 0)
                streak.addColorStop(0, 'rgba(125, 211, 252, 0.58)')
                streak.addColorStop(0.45, 'rgba(56, 189, 248, 0.28)')
                streak.addColorStop(1, 'rgba(56, 189, 248, 0)')
                ctx.fillStyle = streak
                ctx.beginPath()
                ctx.ellipse(-tailLength * 0.45, 0, tailLength * 0.65, 4.6, 0, 0, Math.PI * 2)
                ctx.fill()
                ctx.restore()

                const glow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 9)
                glow.addColorStop(0, 'rgba(236, 254, 255, 0.95)')
                glow.addColorStop(0.55, 'rgba(125, 211, 252, 0.45)')
                glow.addColorStop(1, 'rgba(56, 189, 248, 0)')
                ctx.fillStyle = glow
                ctx.beginPath()
                ctx.arc(head.x, head.y, 9, 0, Math.PI * 2)
                ctx.fill()

                ctx.fillStyle = 'rgba(236, 254, 255, 0.95)'
                ctx.beginPath()
                ctx.arc(head.x, head.y, 2.2, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        const tick = (now: number) => {
            const dtMs = lastFrameAt > 0 ? Math.min(now - lastFrameAt, 32) : 16
            lastFrameAt = now
            const dt = dtMs / 16.67

            const toTargetX = pointer.x - comet.x
            const toTargetY = pointer.y - comet.y
            const recentlyMoved = now - lastMovedAt < IDLE_MS
            const follow = recentlyMoved ? Math.min(0.44 * dt, 0.62) : Math.min(0.3 * dt, 0.48)

            const prevX = comet.x
            const prevY = comet.y
            comet.x += toTargetX * follow
            comet.y += toTargetY * follow

            const movedX = comet.x - prevX
            const movedY = comet.y - prevY
            const speed = Math.hypot(movedX, movedY)

            if (speed > 0.001) {
                comet.dx = movedX / speed
                comet.dy = movedY / speed
            }

            const emitDistance = Math.hypot(comet.x - lastEmitX, comet.y - lastEmitY)
            const shouldEmit = pointer.active && emitDistance >= MIN_EMIT_DISTANCE && (recentlyMoved || speed > 0.05)

            if (shouldEmit) {
                trail.unshift({ x: comet.x, y: comet.y, life: 1 })
                lastEmitX = comet.x
                lastEmitY = comet.y
                if (trail.length > MAX_POINTS) {
                    trail.length = MAX_POINTS
                }
            }

            for (let i = trail.length - 1; i >= 0; i -= 1) {
                trail[i].life -= 0.1 * dt
                if (trail[i].life <= 0) {
                    trail.splice(i, 1)
                }
            }

            draw()

            const isIdle = now - lastMovedAt >= IDLE_MS
            const shouldStop = isIdle && speed < 0.015 && trail.length === 0
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
