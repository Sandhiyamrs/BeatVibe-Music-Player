"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import MusicPlayer from "@/components/music-player"
import MoodSelector from "@/components/mood-selector"
import GradientBackground from "@/components/gradient-background"

type Mood = "chill" | "party" | "focus" | "romantic"

export default function PlayerPage() {
  const [mood, setMood] = useState<Mood>("chill")

  return (
    <main className={`min-h-screen w-full bg-background transition-colors duration-500`}>
      <GradientBackground mood={mood} />

      <Navigation />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8"
      >
        <div className="w-full max-w-2xl">
          <MusicPlayer mood={mood} />
          <MoodSelector currentMood={mood} onMoodChange={setMood} />
        </div>
      </motion.div>
    </main>
  )
}
