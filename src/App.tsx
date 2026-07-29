import { useState, useRef, useEffect } from 'react'
import photo1 from '@/imports/abel_gemini_quinces.png'
import photo2 from '@/imports/Gemini_Generated_Image_4kist04kist04kis.png'
import photo3 from '@/imports/Gemini_Generated_Image_ftwzb8ftwzb8ftwz.png'
import photo4 from '@/imports/Gemini_Generated_Image_ho6yucho6yucho6y.png'
import photo5 from '@/imports/Gemini_Generated_Image_multedmultedmult.png'
import photo6 from '@/imports/Gemini_Generated_Image_wvwns7wvwns7wvwn.png'

// ── Particle component ─────────────────────────────────────────────────────
function Particle({ style }: { style: React.CSSProperties }) {
  return <div className="absolute rounded-sm pointer-events-none" style={style} />
}

function ParticleField() {
  const particles = Array.from({ length: 24 }, (_, i) => {
    const symbols = ['◆', '▲', '●', '★', '⬡', '✦']
    const colors = ['#00d4ff', '#ff3c3c', '#ffd700', '#39ff14', '#a855f7']
    const size = 6 + Math.random() * 10
    const left = Math.random() * 100
    const delay = Math.random() * 8
    const duration = 6 + Math.random() * 10
    const drift = (Math.random() - 0.5) * 80

    return (
      <div
        key={i}
        className="absolute text-xs pointer-events-none select-none"
        style={{
          left: `${left}%`,
          bottom: '-20px',
          color: colors[i % colors.length],
          fontSize: `${size}px`,
          opacity: 0,
          animation: `particle-drift ${duration}s ${delay}s infinite ease-in`,
          ['--drift-x' as string]: `${drift}px`,
        }}
      >
        {symbols[i % symbols.length]}
      </div>
    )
  })

  return <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">{particles}</div>
}

// ── Scanline overlay ───────────────────────────────────────────────────────
function Scanline() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden opacity-[0.03]">
      <div
        className="absolute w-full h-1 bg-white"
        style={{ animation: 'scanline 8s linear infinite' }}
      />
    </div>
  )
}

// ── Corner decorations ─────────────────────────────────────────────────────
function CornerDeco({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const posClass = {
    tl: 'top-0 left-0',
    tr: 'top-0 right-0 rotate-90',
    bl: 'bottom-0 left-0 -rotate-90',
    br: 'bottom-0 right-0 rotate-180',
  }[position]

  return (
    <div className={`absolute ${posClass} w-12 h-12 pointer-events-none`}>
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0 L20 0 L20 2 L2 2 L2 20 L0 20 Z" fill="#00d4ff" opacity="0.8" />
        <path d="M0 0 L8 0 L8 1 L1 1 L1 8 L0 8 Z" fill="#ffd700" />
      </svg>
    </div>
  )
}

// ── Section divider ────────────────────────────────────────────────────────
function Divider() {
  return (
    <div className="flex items-center gap-4 my-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="flex gap-1.5 items-center">
        <span className="text-yellow-400 text-xs">◆</span>
        <span className="font-display text-cyan-400 text-xs tracking-widest">✦</span>
        <span className="text-yellow-400 text-xs">◆</span>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
    </div>
  )
}

// ── Location editor ────────────────────────────────────────────────────────
interface LocationEditorProps {
  address: string
  onChange: (v: string) => void
}

function LocationEditor({ address, onChange }: LocationEditorProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(address)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const save = () => {
    onChange(draft.trim() || address)
    setEditing(false)
  }

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

  return (
    <div className="space-y-3">
      {editing ? (
        <div className="flex gap-2 items-center">
          <input
            ref={inputRef}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && save()}
            className="flex-1 bg-[rgba(0,212,255,0.08)] border border-cyan-400/40 rounded-lg px-4 py-2 text-cyan-100 font-body text-sm focus:outline-none focus:border-cyan-400"
            placeholder="Ingresa la dirección de la fiesta..."
          />
          <button
            onClick={save}
            className="btn-primary px-4 py-2 rounded-lg text-xs"
          >
            Guardar
          </button>
          <button
            onClick={() => { setDraft(address); setEditing(false) }}
            className="px-4 py-2 rounded-lg text-xs text-slate-400 border border-slate-600 hover:border-slate-400 transition-colors"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <p className="font-body text-cyan-100/90 text-sm leading-relaxed">{address}</p>
          </div>
          <button
            onClick={() => { setDraft(address); setEditing(true) }}
            className="shrink-0 text-xs text-cyan-400/60 hover:text-cyan-400 transition-colors font-body border border-cyan-400/20 hover:border-cyan-400/50 rounded-md px-2 py-1"
          >
            ✏ Edit
          </button>
        </div>
      )}

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl text-sm w-full"
      >
        <span>📍</span>
        <span>Abrir en Google Maps</span>
        <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  )
}

// ── Photo gallery (static) ─────────────────────────────────────────────────
const GALLERY_PHOTOS = [
  { id: '1', url: photo1, alt: 'Abel — foto 1' },
  { id: '2', url: photo2, alt: 'Abel — foto 2' },
  { id: '3', url: photo3, alt: 'Abel — foto 3' },
  { id: '4', url: photo4, alt: 'Abel — foto 4' },
  { id: '5', url: photo5, alt: 'Abel — foto 5' },
  { id: '6', url: photo6, alt: 'Abel — foto 6' },
]

function PhotoGallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  const open = (idx: number) => setActiveIdx(idx)
  const close = () => setActiveIdx(null)
  const prev = () => setActiveIdx(i => (i === null ? 0 : (i - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length))
  const next = () => setActiveIdx(i => (i === null ? 0 : (i + 1) % GALLERY_PHOTOS.length))

  useEffect(() => {
    if (activeIdx === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activeIdx])

  const active = activeIdx !== null ? GALLERY_PHOTOS[activeIdx] : null

  return (
    <div>
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {GALLERY_PHOTOS.map((photo, idx) => (
          <div
            key={photo.id}
            className="relative group rounded-xl overflow-hidden aspect-square cursor-zoom-in bg-slate-900"
            style={{ border: '1px solid rgba(0,212,255,0.2)' }}
            onClick={() => open(idx)}
          >
            <img
              src={photo.url}
              alt={photo.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-2xl drop-shadow-lg">🔍</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.94)' }}
          onClick={close}
        >
          {/* Prev */}
          <button
            className="absolute left-3 sm:left-6 w-11 h-11 rounded-full flex items-center justify-center text-white text-xl transition-colors z-10"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
            onClick={e => { e.stopPropagation(); prev() }}
            aria-label="Foto anterior"
          >
            ‹
          </button>

          {/* Image */}
          <div
            className="relative max-w-3xl w-full rounded-2xl overflow-hidden bg-slate-900 cursor-zoom-out"
            onClick={e => e.stopPropagation()}
            style={{ border: '1px solid rgba(0,212,255,0.35)', boxShadow: '0 0 60px rgba(0,212,255,0.25)' }}
          >
            <img
              src={active.url}
              alt={active.alt}
              className="w-full object-contain max-h-[80vh]"
              onClick={close}
              style={{ cursor: 'zoom-out' }}
            />

            {/* Counter */}
            <div
              className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full font-display text-xs text-cyan-300"
              style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(0,212,255,0.2)' }}
            >
              {(activeIdx ?? 0) + 1} / {GALLERY_PHOTOS.length}
            </div>

            {/* Close */}
            <button
              className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-white text-sm transition-colors"
              style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)' }}
              onClick={close}
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>

          {/* Next */}
          <button
            className="absolute right-3 sm:right-6 w-11 h-11 rounded-full flex items-center justify-center text-white text-xl transition-colors z-10"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
            onClick={e => { e.stopPropagation(); next() }}
            aria-label="Foto siguiente"
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}

// ── Detail card ────────────────────────────────────────────────────────────
interface DetailCardProps {
  icon: string
  label: string
  children: React.ReactNode
  accentColor?: string
}

function DetailCard({ icon, label, children, accentColor = '#00d4ff' }: DetailCardProps) {
  return (
    <div className="card-glow rounded-2xl p-5 relative overflow-hidden">
      <CornerDeco position="tl" />
      <CornerDeco position="br" />
      <div className="flex items-start gap-4">
        <div
          className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{
            background: `${accentColor}18`,
            border: `1px solid ${accentColor}40`,
            boxShadow: `0 0 20px ${accentColor}20`,
          }}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="font-display text-xs tracking-widest uppercase mb-2"
            style={{ color: accentColor }}
          >
            {label}
          </p>
          {children}
        </div>
      </div>
    </div>
  )
}

// ── RSVP section ───────────────────────────────────────────────────────────
const RSVP_PHONE = '+52 1 999 265 9544'
const RSVP_PHONE_DIGITS = '5219992659544'
const RSVP_WHATSAPP_MESSAGE = '¡Hola! Confirmo mi asistencia a la fiesta de cumpleaños de Abel.'
const RSVP_WHATSAPP_URL = `https://wa.me/${RSVP_PHONE_DIGITS}?text=${encodeURIComponent(RSVP_WHATSAPP_MESSAGE)}`
const RSVP_TEL_URL = `tel:${RSVP_PHONE_DIGITS}`

function AttendanceSection() {
  return (
    <div className="card-glow rounded-2xl p-6 sm:p-8 relative overflow-hidden text-center">
      <CornerDeco position="tl" />
      <CornerDeco position="tr" />
      <CornerDeco position="bl" />
      <CornerDeco position="br" />

      <h2
        className="font-display text-xs sm:text-sm tracking-[0.35em] uppercase"
        style={{ color: '#00d4ff80' }}
      >
        — Confirma tu asistencia —
      </h2>

      <p className="font-body text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
        ¿Vas a unirte al juego? ¡Avísanos antes del evento!
      </p>

      <Divider />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
        <a
          href={RSVP_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 rounded-xl py-3.5 px-4 font-display text-xs sm:text-sm font-bold tracking-wide transition-transform hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(135deg, #39ff14, #22c55e)',
            color: '#07071a',
            boxShadow: '0 0 25px rgba(57, 255, 20, 0.45)',
          }}
        >
          <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Confirmar por WhatsApp
        </a>

        <a
          href={RSVP_TEL_URL}
          className="flex items-center justify-center gap-2.5 rounded-xl py-3.5 px-4 font-display text-xs sm:text-sm font-bold tracking-wide text-cyan-100 transition-all hover:-translate-y-0.5"
          style={{
            background: 'rgba(0, 212, 255, 0.06)',
            border: '1px solid rgba(0, 212, 255, 0.35)',
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.08)',
          }}
        >
          <svg className="h-5 w-5 shrink-0 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Llamar
        </a>
      </div>

      <p className="font-body text-slate-600 text-xs mt-4 tracking-wide">{RSVP_PHONE}</p>
    </div>
  )
}

// ── YouTube music button ───────────────────────────────────────────────────
const PARTY_MUSIC_VIDEO_ID = 'yURRmWtbTbo'

function loadYouTubeIframeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve()

  return new Promise(resolve => {
    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      window.clearInterval(poll)
      resolve()
    }

    const previousReady = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.()
      finish()
    }

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(script)
    }

    const poll = window.setInterval(() => {
      if (window.YT?.Player) finish()
    }, 100)
  })
}

function MusicButton() {
  const [playing, setPlaying] = useState(false)
  const [needsSoundUnlock, setNeedsSoundUnlock] = useState(false)
  const playerRef = useRef<YouTubePlayerInstance | null>(null)
  const playerHostRef = useRef<HTMLDivElement>(null)
  const playingRef = useRef(false)
  const soundUnlockedRef = useRef(false)

  const syncPlaying = (isPlaying: boolean) => {
    playingRef.current = isPlaying
    setPlaying(isPlaying)
  }

  const startWithSound = (player: YouTubePlayerInstance) => {
    player.unMute()
    player.playVideo()
    soundUnlockedRef.current = true
    setNeedsSoundUnlock(false)
  }

  const tryAutoplay = (player: YouTubePlayerInstance) => {
    player.mute()
    player.playVideo()

    window.setTimeout(() => {
      if (soundUnlockedRef.current) return

      player.unMute()
      player.playVideo()

      window.setTimeout(() => {
        if (soundUnlockedRef.current) return
        const stillMuted = player.isMuted?.() ?? true
        if (stillMuted || !playingRef.current) setNeedsSoundUnlock(true)
      }, 800)
    }, 400)
  }

  useEffect(() => {
    let cancelled = false
    let unlockListener: (() => void) | null = null

    const attachUnlockListeners = () => {
      if (unlockListener || soundUnlockedRef.current) return

      unlockListener = () => {
        if (playerRef.current) startWithSound(playerRef.current)
      }
      document.addEventListener('pointerdown', unlockListener, { once: true })
      document.addEventListener('keydown', unlockListener, { once: true })
    }

    loadYouTubeIframeApi().then(() => {
      if (cancelled || !playerHostRef.current || !window.YT?.Player) return

      playerRef.current = new window.YT.Player(playerHostRef.current, {
        height: '1',
        width: '1',
        videoId: PARTY_MUSIC_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          enablejsapi: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: event => {
            tryAutoplay(event.target)
            attachUnlockListeners()
          },
          onStateChange: event => {
            const { PLAYING, PAUSED, ENDED } = window.YT!.PlayerState
            if (event.data === PLAYING) syncPlaying(true)
            if (event.data === PAUSED || event.data === ENDED) syncPlaying(false)
          },
        },
      })
    })

    return () => {
      cancelled = true
      if (unlockListener) {
        document.removeEventListener('pointerdown', unlockListener)
        document.removeEventListener('keydown', unlockListener)
      }
      playerRef.current?.destroy()
      playerRef.current = null
    }
  }, [])

  const toggleMusic = () => {
    const player = playerRef.current
    if (!player) return

    if (playing) {
      player.pauseVideo()
      return
    }

    startWithSound(player)
  }

  return (
    <>
      <div ref={playerHostRef} className="fixed -left-[9999px] top-0 h-px w-px overflow-hidden opacity-0 pointer-events-none" aria-hidden />

      {needsSoundUnlock && (
        <button
          type="button"
          onClick={() => playerRef.current && startWithSound(playerRef.current)}
          className="fixed bottom-24 right-6 z-50 max-w-[220px] rounded-2xl px-4 py-3 text-left font-body text-sm text-cyan-100 transition-transform hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, rgba(16, 20, 60, 0.95), rgba(7, 7, 26, 0.98))',
            border: '1px solid rgba(0, 212, 255, 0.45)',
            boxShadow: '0 0 30px rgba(0, 212, 255, 0.25)',
          }}
        >
          <span className="font-display text-xs tracking-widest uppercase text-yellow-400">Mision extra</span>
          <span className="mt-1 block">Toca para activar la musica 🎵</span>
        </button>
      )}

      <button
        type="button"
        onClick={toggleMusic}
        aria-label={playing ? 'Pausar música' : "Reproducir Don't Stop 'Til You Get Enough"}
        title={playing ? 'Pausar música' : "Reproducir Don't Stop 'Til You Get Enough"}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #00d4ff, #0099cc)',
          boxShadow: playing
            ? '0 0 30px rgba(0,212,255,0.7), 0 0 60px rgba(0,212,255,0.35)'
            : '0 0 20px rgba(0,212,255,0.5)',
          animation: playing ? 'pulse-glow 2s ease-in-out infinite' : undefined,
        }}
      >
        {playing ? (
          <svg className="h-6 w-6 text-[#07071a]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg className="h-7 w-7 text-[#07071a]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
          </svg>
        )}
      </button>
    </>
  )
}

// ── Main app ───────────────────────────────────────────────────────────────
export default function App() {
  const [address, setAddress] = useState('Calle 86 entre 175A y 177, Villa Ana Cecilia')

  return (
    <div className="min-h-screen relative grid-bg overflow-x-hidden" style={{ backgroundColor: '#07071a' }}>
      <ParticleField />
      <Scanline />
      <MusicButton />

      {/* Radial ambient glows */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.07) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />
      <div
        className="fixed bottom-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom right, rgba(255,60,60,0.06) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-10 sm:py-16 space-y-6">

        {/* ── HERO ────────────────────────────────────────────────────── */}
        <div
          className="card-glow rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden"
          style={{ animation: 'pulse-glow 4s ease-in-out infinite' }}
        >
          <CornerDeco position="tl" />
          <CornerDeco position="tr" />
          <CornerDeco position="bl" />
          <CornerDeco position="br" />

          {/* Game logo row */}
          <div className="flex items-center justify-center gap-6 mb-6">
            {/* Roblox-ish badge */}
            <div
              className="rounded-xl px-3 py-1.5 font-display text-xs tracking-widest"
              style={{
                background: 'rgba(255,60,60,0.15)',
                border: '1px solid rgba(255,60,60,0.4)',
                color: '#ff3c3c',
                boxShadow: '0 0 15px rgba(255,60,60,0.2)',
              }}
            >
              ROBLOX
            </div>
            <span className="text-yellow-400 text-xl">⚡</span>
            {/* Fortnite-ish badge */}
            <div
              className="rounded-xl px-3 py-1.5 font-display text-xs tracking-widest"
              style={{
                background: 'rgba(0,212,255,0.15)',
                border: '1px solid rgba(0,212,255,0.4)',
                color: '#00d4ff',
                boxShadow: '0 0 15px rgba(0,212,255,0.2)',
              }}
            >
              FORTNITE
            </div>
          </div>

          {/* "YOU'RE INVITED" */}
          <div className="mb-2">
            <span
              className="font-display text-xs sm:text-sm tracking-[0.3em] uppercase"
              style={{ color: '#ffd700', textShadow: '0 0 15px rgba(255,215,0,0.5)' }}
            >
              ★ Jugador Uno — ¡Estás Invitado! ★
            </span>
          </div>

          {/* Main heading */}
          <h1
            className="font-display font-black leading-tight mt-4 mb-3"
            style={{ fontSize: 'clamp(2rem, 7vw, 3.5rem)' }}
          >
            <span className="shimmer-text">NIVEL 15</span>
          </h1>

          <p
            className="font-display text-xl sm:text-2xl font-bold tracking-wide"
            style={{ color: '#00d4ff', textShadow: '0 0 20px rgba(0,212,255,0.6)' }}
          >
            FIESTA DE CUMPLEAÑOS
          </p>

          <Divider />

          {/* Name */}
          <div className="my-4">
            <p className="font-sub text-slate-400 text-sm tracking-widest uppercase mb-1">Celebrando a</p>
            <p
              className="font-display font-bold"
              style={{
                fontSize: 'clamp(1.6rem, 5vw, 2.5rem)',
                color: '#ffffff',
                textShadow: '0 0 25px rgba(255,255,255,0.3)',
              }}
            >
              ABEL
            </p>
          </div>

          {/* Level badge */}
          <div className="flex justify-center mt-5">
            <div
              className="flex items-center gap-3 px-6 py-3 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,60,60,0.1))',
                border: '1px solid rgba(255,215,0,0.4)',
                boxShadow: '0 0 30px rgba(255,215,0,0.15)',
              }}
            >
              <span className="text-3xl" style={{ animation: 'float 3s ease-in-out infinite' }}>🎮</span>
              <div className="text-left">
                <p className="font-display text-yellow-400 text-xs tracking-widest">LOGRO DESBLOQUEADO</p>
                <p className="font-sub font-bold text-white text-base">15 Años de Victorias Épicas</p>
              </div>
              <span className="text-3xl" style={{ animation: 'float 3s ease-in-out infinite 1.5s' }}>🏆</span>
            </div>
          </div>
        </div>

        {/* ── EVENT DETAILS ────────────────────────────────────────────── */}
        <div className="space-y-3">
          <h2
            className="font-display text-xs tracking-[0.4em] uppercase text-center"
            style={{ color: '#00d4ff80' }}
          >
            — Información de la Misión —
          </h2>

          {/* Date */}
          <DetailCard icon="📅" label="Fecha" accentColor="#ffd700">
            <p className="font-sub font-bold text-white text-xl tracking-wide">Domingo</p>
            <p className="font-display text-yellow-400 text-2xl font-bold leading-none">30 AGO 2026</p>
          </DetailCard>

          {/* Time */}
          <DetailCard icon="⏰" label="Hora" accentColor="#39ff14">
            <p
              className="font-display font-bold text-3xl"
              style={{ color: '#39ff14', textShadow: '0 0 15px rgba(57,255,20,0.5)' }}
            >
              1:30 PM
            </p>
            <p className="font-body text-slate-400 text-sm mt-1">¡Llega temprano — el juego empieza a tiempo!</p>
          </DetailCard>

          {/* Location */}
          <DetailCard icon="📍" label="Lugar" accentColor="#ff3c3c">
            <LocationEditor address={address} onChange={setAddress} />
            <div className="flex items-center gap-2 mt-3 px-3 py-2 rounded-xl" style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.15)' }}>
              <span className="text-lg">🏊</span>
              <p className="font-body text-cyan-200/80 text-sm">¡El local cuenta con piscina — trae tu traje de baño!</p>
            </div>
          </DetailCard>
        </div>

        {/* ── GAME STATS ────────────────────────────────────────────────── */}
        <div className="card-glow rounded-2xl p-6 relative overflow-hidden">
          <CornerDeco position="tl" />
          <CornerDeco position="br" />
          <h2 className="font-display text-xs tracking-[0.4em] uppercase text-center text-cyan-400/60 mb-5">
            — Estadísticas de la Fiesta —
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: '🎯', value: '∞', label: 'Nivel de Diversión' },
              { icon: '🍕', value: '100%', label: 'Comida HP' },
              { icon: '🎂', value: '15', label: 'XP de Cumpleaños' },
            ].map(stat => (
              <div
                key={stat.label}
                className="rounded-xl p-4 text-center"
                style={{
                  background: 'rgba(0,212,255,0.06)',
                  border: '1px solid rgba(0,212,255,0.15)',
                }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="font-display font-bold text-cyan-400 text-lg leading-none">{stat.value}</p>
                <p className="font-body text-slate-500 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── PHOTO GALLERY ─────────────────────────────────────────────── */}
        <div className="card-glow rounded-2xl p-6 relative overflow-hidden">
          <CornerDeco position="tl" />
          <CornerDeco position="br" />
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🖼️</span>
            <div>
              <h2 className="font-display text-sm tracking-[0.2em] uppercase text-cyan-400">
                Galería de Abel
              </h2>
              <p className="font-body text-slate-500 text-xs mt-0.5">Fotos del cumpleañero</p>
            </div>
          </div>
          <PhotoGallery />
        </div>

        {/* ── RSVP ──────────────────────────────────────────────────────── */}
        <AttendanceSection />

        {/* Footer glow line */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
        <p className="font-display text-xs text-center text-slate-700 tracking-widest pb-4">
          © 2026 LEVEL UP EVENTS · TODOS LOS DERECHOS RESERVADOS
        </p>
      </div>
    </div>
  )
}
