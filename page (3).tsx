"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import GradientBackground from "@/components/gradient-background"

export default function Home() {
  const [isEntering, setIsEntering] = useState(false)
  const router = useRouter()

  const handleEnterVibe = () => {
    setIsEntering(true)
    setTimeout(() => {
      router.push("/player")
    }, 600)
  }

  return (
    <main className="min-h-screen w-full bg-background overflow-hidden flex items-center justify-center">
      <GradientBackground mood="chill" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-4"
      >
        {/* Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 text-balance"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            BeatVibe
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-foreground/80 mb-8 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Feel the Rhythm of Your Mood
        </motion.p>

        {/* Subtext */}
        <motion.p
          className="text-base md:text-lg text-foreground/60 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Your music. Your energy. Your vibe.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={handleEnterVibe}
          disabled={isEntering}
          className="relative px-8 py-4 text-lg font-semibold rounded-full bg-primary text-primary-foreground overflow-hidden group"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-accent to-secondary opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />
          <span className="relative z-10">Enter the Vibe</span>

          {/* Pulsing glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary opacity-0"
            animate={{
              scale: [1, 1.2, 1.3],
              opacity: [0.5, 0.3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
            }}
          />
        </motion.button>

        {/* Floating music notes */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl opacity-30"
              initial={{
                x: Math.random() * 400 - 200,
                y: Math.random() * 300 - 150,
              }}
              animate={{
                x: Math.random() * 800 - 400,
                y: Math.random() * 600 - 300,
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              🎵
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  )
}
