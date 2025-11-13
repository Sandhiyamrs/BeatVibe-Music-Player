"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import GradientBackground from "@/components/gradient-background"
import { Sun, Moon, RotateCcw } from "lucide-react"

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true)
  const [defaultMood, setDefaultMood] = useState("chill")
  const [bgIntensity, setBgIntensity] = useState(70)

  useEffect(() => {
    // Load settings from localStorage
    const saved = localStorage.getItem("beatvibe-settings")
    if (saved) {
      const settings = JSON.parse(saved)
      setDarkMode(settings.darkMode ?? true)
      setDefaultMood(settings.defaultMood ?? "chill")
      setBgIntensity(settings.bgIntensity ?? 70)
    }
  }, [])

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all settings and data?")) {
      localStorage.clear()
      window.location.reload()
    }
  }

  return (
    <main className="min-h-screen w-full bg-background">
      <GradientBackground mood="chill" />
      <Navigation />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 pt-12 pb-24 md:ml-24 px-4"
      >
        <div className="max-w-2xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-foreground mb-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Settings
          </motion.h1>

          {/* Settings Cards */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Theme Toggle */}
            <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon size={24} /> : <Sun size={24} />}
                  <div>
                    <h3 className="font-semibold text-foreground">Theme</h3>
                    <p className="text-sm text-foreground/60">{darkMode ? "Dark Mode" : "Light Mode"}</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-12 h-7 rounded-full transition-all ${darkMode ? "bg-primary" : "bg-white/20"}`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-5 h-5 rounded-full bg-white"
                    animate={{ x: darkMode ? 20 : 2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </motion.button>
              </div>
            </div>

            {/* Default Mood */}
            <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6">
              <h3 className="font-semibold text-foreground mb-4">Default Mood</h3>
              <div className="grid grid-cols-4 gap-3">
                {["chill", "party", "focus", "romantic"].map((mood) => (
                  <motion.button
                    key={mood}
                    onClick={() => setDefaultMood(mood)}
                    className={`py-2 px-3 rounded-lg transition-all ${
                      defaultMood === mood
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/10 hover:bg-white/20 text-foreground"
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {mood.charAt(0).toUpperCase() + mood.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Background Intensity */}
            <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6">
              <h3 className="font-semibold text-foreground mb-4">Background Intensity</h3>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={bgIntensity}
                  onChange={(e) => setBgIntensity(Number(e.target.value))}
                  className="flex-1 h-2 bg-white/20 rounded-full accent-primary"
                />
                <span className="text-foreground w-12 text-right">{bgIntensity}%</span>
              </div>
            </div>

            {/* Reset */}
            <motion.button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 font-semibold transition-all border border-red-500/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RotateCcw size={20} />
              Reset My Vibe
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </main>
  )
}
