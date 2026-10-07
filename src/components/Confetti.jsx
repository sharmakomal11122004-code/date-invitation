import { useEffect, useRef } from 'react'

const COLORS = [
  '#ff6b9d',
  '#ffb3c6',
  '#ffd6e8',
  '#c89fe8',
  '#fff5d6',
  '#ff9ec7',
  '#ffe3ee',
  '#d4b3f0',
]

const SHAPES = ['rect', 'circle', 'rect', 'circle', 'rect']

function makeParticles(count, w, h) {
  const arr = []
  for (let i = 0; i < count; i++) {
    arr.push({
      x: Math.random() * w,
      y: -20 - Math.random() * h * 0.6,
      vx: (Math.random() - 0.5) * 4,
      vy: 2 + Math.random() * 4,
      size: 5 + Math.random() * 7,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.25,
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      opacity: 0.85 + Math.random() * 0.15,
    })
  }
  return arr
}

export default function Confetti() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    let particles = []
    let animationId = null
    let frame = 0
    const maxFrames = prefersReducedMotion ? 1 : 540 // ~9 seconds at 60fps

    const setup = () => {
      const dpr = window.devicePixelRatio || 1
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      const count = prefersReducedMotion
        ? 30
        : Math.min(160, Math.floor(w / 6))
      particles = makeParticles(count, w, h)
    }

    setup()

    const draw = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.vx
          p.y += p.vy
          p.vy += 0.08 // gravity
          p.rotation += p.rotSpeed
          p.vx *= 0.995
        }

        if (p.y - p.size > h) {
          // Reset particle to top for continuous effect during the run.
          if (frame < maxFrames - 60) {
            p.y = -20
            p.x = Math.random() * w
            p.vy = 2 + Math.random() * 4
          }
        }

        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.fillStyle = p.color
        if (p.shape === 'circle') {
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.62)
        }
        ctx.restore()
      })

      frame += 1
      if (frame < maxFrames) {
        animationId = requestAnimationFrame(draw)
      } else {
        // Clear the canvas at the end so it doesn't leave debris.
        ctx.clearRect(0, 0, w, h)
      }
    }

    draw()

    const handleResize = () => {
      setup()
      frame = 0
      if (animationId) cancelAnimationFrame(animationId)
      draw()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="confetti-canvas" aria-hidden="true" />
}
