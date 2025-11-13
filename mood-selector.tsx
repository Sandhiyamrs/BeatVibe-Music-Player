"use client"

import { motion } from "framer-motion"

type Mood = "chill" | "party" | "focus" | "romantic"

interface MoodSelectorProps {
  currentMood: Mood
  onMoodChange: (mood: Mood) => void
}

const moods: { type: Mood; icon: string; label: string; color: string }[] = [
  { type: "chill", icon: "🌊", label: "Chill", color: "from-blue-500 to-purple-500" },
  { type: "party", icon: "🔥", label: "Party", color: "from-pink-500 to-orange-500" },
  { type: "focus", icon: "🌿", label: "Focus", color: "from-green-500 to-cyan-500" },
  { type: "romantic", icon: "💞", label: "Romantic", color: "from-red-500 to-pink-500" },
]

export default function MoodSelector({ currentMood, onMoodChange }: MoodSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-12"
    >
      <h3 className="text-center text-foreground/80 text-sm uppercase tracking-widest mb-6">Select Your Vibe</h3>

      <div className="grid grid-cols-4 gap-4">
        {moods.map((mood) => (
          <motion.button
            key={mood.type}
            onClick={() => onMoodChange(mood.type)}
            className={`relative p-4 rounded-2xl transition-all ${
              currentMood === mood.type
                ? `bg-gradient-to-r ${mood.color} text-white shadow-lg`
                : "bg-white/10 hover:bg-white/20 text-foreground"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-3xl mb-2">{mood.icon}</div>
            <div className="text-xs font-semibold">{mood.label}</div>

            {currentMood === mood.type && (
              <motion.div
                layoutId="mood-active"
                className="absolute inset-0 rounded-2xl border-2 border-white/50"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
