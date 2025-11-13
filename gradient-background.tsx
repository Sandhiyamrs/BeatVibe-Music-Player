"use client"

import { motion } from "framer-motion"

interface GradientBackgroundProps {
  mood?: "chill" | "party" | "focus" | "romantic"
}

const moodGradients = {
  chill: "from-blue-900 via-purple-900 to-indigo-900",
  party: "from-pink-600 via-orange-500 to-red-600",
  focus: "from-green-700 via-cyan-600 to-teal-700",
  romantic: "from-red-700 via-pink-600 to-magenta-600",
}

export default function GradientBackground({ mood = "chill" }: GradientBackgroundProps) {
  const gradientClass = moodGradients[mood]

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Animated blob shapes */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full mix-blend-screen opacity-20"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-accent rounded-full mix-blend-screen opacity-20"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Overlay for depth */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  )
}
