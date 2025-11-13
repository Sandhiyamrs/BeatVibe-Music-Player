"use client"

import { motion } from "framer-motion"

interface PlaylistCardProps {
  playlist: {
    id: string
    name: string
    mood: "chill" | "party" | "focus" | "romantic"
    songCount: number
  }
}

const moodEmojis = {
  chill: "🌊",
  party: "🔥",
  focus: "🌿",
  romantic: "💞",
}

const moodGradients = {
  chill: "from-blue-500 to-purple-500",
  party: "from-pink-500 to-orange-500",
  focus: "from-green-500 to-cyan-500",
  romantic: "from-red-500 to-pink-500",
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className={`rounded-2xl bg-gradient-to-br ${moodGradients[playlist.mood]} p-6 cursor-pointer group relative overflow-hidden`}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/20"
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        <div className="text-5xl mb-4">{moodEmojis[playlist.mood]}</div>

        <h3 className="text-xl font-bold text-white mb-2">{playlist.name}</h3>

        <p className="text-white/80 text-sm mb-4">{playlist.songCount} songs</p>

        <motion.button
          className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white text-sm font-semibold transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Play
        </motion.button>
      </div>
    </motion.div>
  )
}
