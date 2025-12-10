'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import {
  Ghost,
  Film,
  Coins,
  Gamepad2,
  ChevronDown,
  Skull,
  Zap,
  Users,
  TrendingUp,
  Heart,
  Play,
  ExternalLink,
  Twitter,
  MessageCircle,
} from 'lucide-react'

// =============================================================================
// PARTICLE SYSTEM - Creates floating blood-red particles
// =============================================================================
const ParticleBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let width = window.innerWidth
    let height = window.innerHeight

    const setCanvasSize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    setCanvasSize()

    // Create particles with varied properties
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 0.5,
      speedY: Math.random() * 0.8 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.6 + 0.1,
      hue: Math.random() > 0.7 ? 280 : 0, // Purple or Red
    }))

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        // Update position
        p.y -= p.speedY
        p.x += p.speedX

        // Reset particle when it goes off screen
        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
        }
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
        if (p.hue === 0) {
          gradient.addColorStop(0, `rgba(180, 0, 0, ${p.opacity})`)
          gradient.addColorStop(1, 'rgba(100, 0, 0, 0)')
        } else {
          gradient.addColorStop(0, `rgba(157, 78, 221, ${p.opacity})`)
          gradient.addColorStop(1, 'rgba(100, 0, 100, 0)')
        }

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fill()

        // Draw core
        ctx.fillStyle = p.hue === 0 ? `rgba(255, 50, 50, ${p.opacity})` : `rgba(200, 150, 255, ${p.opacity})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener('resize', setCanvasSize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-60" />
}

// =============================================================================
// ANIMATED SKULL COMPONENT
// =============================================================================
const CrystalSkull = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0, y: 100 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      style={{
        rotateX: mousePos.y * 0.5,
        rotateY: mousePos.x * 0.5,
      }}
      className="relative z-10 mb-8"
    >
      <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative flex items-center justify-center">
        {/* Outer glow rings */}
        <div className="absolute inset-0 bg-purple-600 rounded-full blur-[100px] opacity-30 animate-pulse" />
        <div className="absolute inset-[-20%] bg-red-900 rounded-full blur-[80px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Inner glow */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-[10%] bg-gradient-to-b from-purple-500/40 to-red-900/40 rounded-full blur-[40px]"
        />

        {/* The Skull */}
        <Skull
          size={180}
          className="text-gray-100 skull-glow relative z-10 md:w-[220px] md:h-[220px] lg:w-[260px] lg:h-[260px]"
          strokeWidth={0.5}
        />

        {/* Eye glows */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-[38%] left-[32%] w-4 h-4 md:w-5 md:h-5 bg-red-500 rounded-full blur-sm"
        />
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          className="absolute top-[38%] right-[32%] w-4 h-4 md:w-5 md:h-5 bg-red-500 rounded-full blur-sm"
        />
      </div>
    </motion.div>
  )
}

// =============================================================================
// SECTION WRAPPER WITH ANIMATIONS
// =============================================================================
const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// =============================================================================
// STAT CARD COMPONENT
// =============================================================================
const StatCard = ({ icon: Icon, value, label, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay }}
      className="horror-card p-6 md:p-8 border border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl backdrop-blur-sm text-center"
    >
      <Icon className="w-8 h-8 md:w-10 md:h-10 text-red-500 mx-auto mb-4" />
      <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-horror">{value}</div>
      <div className="text-gray-400 text-sm md:text-base">{label}</div>
    </motion.div>
  )
}

// =============================================================================
// FEATURE CARD COMPONENT
// =============================================================================
const FeatureCard = ({ icon: Icon, title, desc, delay = 0, accentColor = 'purple' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const colorClasses = {
    purple: 'text-purple-500 group-hover:text-purple-400',
    red: 'text-red-500 group-hover:text-red-400',
    blue: 'text-blue-500 group-hover:text-blue-400',
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      className="group horror-card p-8 border border-gray-800/50 bg-gradient-to-br from-gray-900/60 to-black/60 hover:from-red-950/30 hover:to-black/60 transition-all duration-300 rounded-2xl backdrop-blur-sm"
    >
      <Icon className={`w-12 h-12 ${colorClasses[accentColor]} mb-6 transition-colors`} />
      <h3 className="text-2xl font-bold mb-3 group-hover:text-red-400 transition-colors">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
  )
}

// =============================================================================
// PHONE MOCKUP COMPONENT
// =============================================================================
const PhoneMockup = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100, rotateY: -30 }}
      whileInView={{ opacity: 1, x: 0, rotateY: -10 }}
      whileHover={{ rotateY: 0, rotateX: 0, scale: 1.02 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative perspective-1000"
    >
      {/* Phone Frame */}
      <div className="w-64 md:w-72 h-[520px] md:h-[580px] border-[6px] border-gray-800 rounded-[3rem] bg-black overflow-hidden relative shadow-[0_0_60px_rgba(138,0,0,0.4)] mx-auto">
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />

        {/* Screen Content */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black flex flex-col">
          {/* Video Area */}
          <div className="flex-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-black to-purple-900/20" />

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 rounded-full bg-red-600/80 flex items-center justify-center backdrop-blur-sm"
              >
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </motion.div>
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="font-horror text-2xl text-white mb-1 horror-shadow">THE WATCHER</div>
              <div className="text-gray-400 text-sm">Episode 3 • 2:34</div>
            </div>

            {/* Engagement indicators */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 space-y-6">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="flex flex-col items-center">
                <Heart className="w-7 h-7 text-red-500" fill="currentColor" />
                <span className="text-xs text-white mt-1">666</span>
              </motion.div>
              <div className="flex flex-col items-center">
                <MessageCircle className="w-7 h-7 text-white" />
                <span className="text-xs text-white mt-1">42</span>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="p-4 bg-black/90 space-y-3">
            <div className="flex justify-between text-gray-400 text-xs">
              <span className="flex items-center gap-1">
                <Coins className="w-4 h-4 text-yellow-500" />
                Earn $HORROR
              </span>
              <span>Share</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-red-900/30"
            >
              🔓 UNLOCK LORE (5 $HORROR)
            </motion.button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-600/20 rounded-full blur-[60px]" />
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-red-600/20 rounded-full blur-[50px]" />
    </motion.div>
  )
}

// =============================================================================
// ROADMAP PHASE COMPONENT
// =============================================================================
const RoadmapPhase = ({ phase, budget, items, isActive, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative pl-8 md:pl-0 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-start group"
    >
      {/* Left side (odd items) */}
      <div className={`hidden md:block ${index % 2 === 0 ? 'text-right pr-8' : ''}`}>
        {index % 2 === 0 && (
          <>
            <h3 className="text-2xl font-bold text-red-500 group-hover:text-red-400 transition-colors mb-2">{phase}</h3>
            <p className="text-purple-400 text-sm font-mono mb-3">{budget}</p>
            <ul className="text-gray-400 text-sm space-y-1">
              {items.map((item, k) => (
                <li key={k}>{item}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Center timeline */}
      <div className="absolute left-0 md:relative md:left-auto flex flex-col items-center">
        <motion.div
          animate={isActive ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className={`w-5 h-5 rounded-full border-4 ${
            isActive ? 'bg-red-600 border-red-400 shadow-[0_0_20px_rgba(220,38,38,0.5)]' : 'bg-black border-gray-600'
          } z-10`}
        />
        <div className="w-0.5 h-full bg-gradient-to-b from-red-800 to-gray-800 absolute top-5" />
      </div>

      {/* Right side (even items) or mobile content */}
      <div className={`${index % 2 === 1 ? 'md:pl-8' : 'md:hidden'}`}>
        <h3 className="text-xl md:text-2xl font-bold text-red-500 group-hover:text-red-400 transition-colors mb-2">{phase}</h3>
        <p className="text-purple-400 text-sm font-mono mb-3">{budget}</p>
        <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside md:list-none">
          {items.map((item, k) => (
            <li key={k}>{item}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

// =============================================================================
// TOKENOMICS COMPONENT
// =============================================================================
const TokenomicsSection = () => {
  const utilities = [
    { icon: Film, title: 'Film Access', desc: 'Exclusive screenings and behind-the-scenes content' },
    { icon: Gamepad2, title: 'Gaming Rewards', desc: 'In-game purchases and NFT unlocks' },
    { icon: Users, title: 'Governance', desc: 'Vote on new IP development and studio decisions' },
    { icon: Zap, title: 'Staking', desc: 'Earn rewards by staking $HORROR tokens' },
  ]

  return (
    <AnimatedSection className="relative py-24 md:py-32 z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-6"
          >
            <Coins className="w-5 h-5 text-yellow-500" />
            <span className="text-yellow-500 font-medium">Token Economy</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-horror text-white mb-6">
            <span className="text-red-500">$HORROR</span> Powers Everything
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            One token unifying film, gaming, and community across the entire Horrorverse ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {utilities.map((util, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="horror-card p-6 border border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-black rounded-xl text-center group"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-red-900/50 to-purple-900/50 flex items-center justify-center group-hover:from-red-800/50 group-hover:to-purple-800/50 transition-all">
                <util.icon className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-2">{util.title}</h4>
              <p className="text-gray-500 text-sm">{util.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================
export default function Horrorville() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const roadmapPhases = [
    {
      phase: 'Phase 1: Development',
      budget: 'Pre-Production',
      items: ['Script Development & IP Creation', 'Casting & Pre-visualization', 'Creature & World Design', 'Token Architecture'],
      isActive: true,
    },
    {
      phase: 'Phase 2: Film Activation',
      budget: '$1.4M+ Production Threshold',
      items: ['Full Film Production', 'Proof-of-concept Game', 'On-chain Integration', '$HORROR Token Launch'],
      isActive: false,
    },
    {
      phase: 'Phase 3: Expansion',
      budget: 'Oversubscription Goals',
      items: ['Film #2 Greenlight', 'Gaming Platform Expansion', 'IP Licensing Platform', 'Horror Creator Fund'],
      isActive: false,
    },
  ]

  return (
    <main className="relative w-full overflow-hidden bg-black">
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700 via-red-600 to-purple-600 z-[100] origin-left" style={{ scaleX }} />

      {/* Background Effects */}
      <ParticleBackground />
      <div className="vignette" />
      <div className="noise-overlay" />

      {/* Fog Layers */}
      <div className="fog-layer" />
      <div className="fog-layer fog-layer-2" />

      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center z-10 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black z-0" />

        <CrystalSkull />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-horror text-white text-center z-10 tracking-wider horror-shadow"
        >
          HORRORVILLE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-6 text-lg sm:text-xl md:text-2xl font-sans text-gray-300 text-center max-w-2xl px-4 z-10"
        >
          The First On-Chain Cinematic Horror Universe
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 mt-10 z-10"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-horror px-8 py-4 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold rounded-xl text-lg transition-all shadow-[0_0_30px_rgba(220,38,38,0.4)]"
          >
            Enter the Horrorverse
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-purple-500/50 hover:border-purple-400 hover:bg-purple-900/20 text-white font-bold rounded-xl text-lg transition-all backdrop-blur-sm"
          >
            Read Whitepaper
          </motion.button>
        </motion.div>

        <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10 z-10">
          <ChevronDown className="text-red-600 w-10 h-10 opacity-60" />
        </motion.div>
      </section>

      {/* ========== THE BIG IDEA ========== */}
      <AnimatedSection className="relative py-24 md:py-32 px-6 bg-gradient-to-b from-black via-gray-950 to-black z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-red-500 font-mono text-sm tracking-widest uppercase mb-4 block">The Vision</span>
            <h2 className="text-4xl md:text-6xl font-horror text-white horror-shadow">The Big Idea</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard
              icon={Film}
              title="Film + Streaming"
              desc="High-quality horror for theatrical & streaming distribution. Real budgets, real productions, real scares."
              delay={0}
              accentColor="red"
            />
            <FeatureCard
              icon={Gamepad2}
              title="Gaming + Apps"
              desc="On-chain games, collectibles, and interactive experiences that extend the horror universe."
              delay={0.1}
              accentColor="purple"
            />
            <FeatureCard
              icon={Coins}
              title="Token Economy"
              desc="$HORROR unifies the universe across all titles and platforms. One token to rule the dark."
              delay={0.2}
              accentColor="blue"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 md:mt-20 text-center"
          >
            <blockquote className="text-xl md:text-2xl font-horror text-gray-300 italic max-w-3xl mx-auto">
              "We're building a living horror multiverse where every new IP feeds back into the brand."
            </blockquote>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ========== WHY HORROR? ========== */}
      <AnimatedSection className="relative py-24 md:py-32 bg-gradient-to-b from-black via-red-950/20 to-black z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <span className="text-purple-500 font-mono text-sm tracking-widest uppercase mb-4 block">The Market</span>
              <h2 className="text-4xl md:text-6xl font-horror text-white horror-shadow">Why Horror?</h2>
            </div>
            <p className="text-gray-400 max-w-md mt-6 md:mt-0 md:text-right">
              Horror is the most profitable genre in film history. Low budgets, massive returns, global appeal.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <StatCard icon={TrendingUp} value="10x+" label="Average ROI" delay={0} />
            <StatCard icon={Film} value="$1-5M" label="Production Costs" delay={0.1} />
            <StatCard icon={Users} value="Global" label="Audience Appeal" delay={0.2} />
            <StatCard icon={Heart} value="Tribal" label="Fan Loyalty" delay={0.3} />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 p-8 border border-red-900/30 bg-gradient-to-r from-red-950/20 to-transparent rounded-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-red-500 mb-2">$12B+</div>
                <div className="text-gray-400">Annual Horror Box Office</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-purple-500 mb-2">300M+</div>
                <div className="text-gray-400">Horror Fans Worldwide</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">∞</div>
                <div className="text-gray-400">Franchise Potential</div>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ========== THE APP / HORROR ENGINE ========== */}
      <AnimatedSection className="relative py-24 md:py-32 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Text Content */}
            <div className="lg:w-1/2 space-y-8">
              <div>
                <span className="text-red-500 font-mono text-sm tracking-widest uppercase mb-4 block">The Engine</span>
                <h2 className="text-4xl md:text-5xl font-horror text-purple-400 mb-4">Horror Engine</h2>
                <h3 className="text-2xl md:text-3xl font-bold text-white">Vertical Horror Shorts</h3>
              </div>

              <p className="text-gray-400 text-lg">
                A TikTok-style platform built for horror. Short-form terror that hooks viewers and converts them into
                $HORROR holders.
              </p>

              <ul className="space-y-4">
                {[
                  'Serialized micro-stories that evolve weekly',
                  'Algorithmic playlists: demons, gore, psychological',
                  'Creator tools for AI-enhanced VFX',
                  'Token-powered engagement & rewards',
                  'Unlock exclusive lore with $HORROR',
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <span className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Phone Mockup */}
            <div className="lg:w-1/2 flex justify-center">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ========== TOKENOMICS ========== */}
      <TokenomicsSection />

      {/* ========== ROADMAP ========== */}
      <AnimatedSection className="relative py-24 md:py-32 bg-gradient-to-b from-black via-zinc-950 to-black z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-20">
            <span className="text-red-500 font-mono text-sm tracking-widest uppercase mb-4 block">The Journey</span>
            <h2 className="text-4xl md:text-6xl font-horror text-white horror-shadow">Roadmap</h2>
          </div>

          <div className="space-y-12 md:space-y-16">
            {roadmapPhases.map((phase, idx) => (
              <RoadmapPhase key={idx} {...phase} index={idx} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ========== CTA / JOIN ========== */}
      <section className="relative py-32 md:py-40 flex flex-col items-center justify-center text-center z-10 px-6">
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/30 via-black to-black" />

        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className="relative z-10">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 blur-[100px] bg-gradient-to-r from-red-600/30 to-purple-600/30 -z-10"
          />

          <Ghost className="w-16 h-16 md:w-20 md:h-20 text-red-500 mx-auto mb-8 opacity-60" />

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-horror mb-6 horror-shadow">Join The Horrorverse</h2>

          <p className="max-w-2xl text-lg md:text-xl text-gray-300 mb-10 mx-auto">
            We are creating an IP factory powered by $HORROR.
            <br />
            <span className="text-red-400">Built for Fear. Powered by Crypto.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-horror px-10 py-5 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold rounded-xl text-lg transition-all shadow-[0_0_40px_rgba(220,38,38,0.5)] flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              Read Whitepaper
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border-2 border-purple-500/50 hover:border-purple-400 hover:bg-purple-900/20 text-white font-bold rounded-xl text-lg transition-all backdrop-blur-sm flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Join Discord
            </motion.button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <motion.a whileHover={{ scale: 1.1, y: -2 }} href="#" className="text-gray-500 hover:text-white transition-colors">
              <Twitter className="w-6 h-6" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.1, y: -2 }} href="#" className="text-gray-500 hover:text-white transition-colors">
              <MessageCircle className="w-6 h-6" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.1, y: -2 }} href="#" className="text-gray-500 hover:text-white transition-colors">
              <Ghost className="w-6 h-6" />
            </motion.a>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-gray-600 text-sm">© 2025 GK-LABS. All Rights Reserved.</p>
          <p className="text-gray-700 text-xs mt-2">Built for Fear. Powered by Crypto.</p>
        </footer>
      </section>
    </main>
  )
}
