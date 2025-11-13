"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2 } from "lucide-react"

interface MusicPlayerProps {
  mood: string
}

export default function MusicPlayer({ mood }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(35)
  const [volume, setVolume] = useState(70)

  const songs = [
    { title: "Lunar Dreams", artist: "Luna Wave", duration: "3:45" },
    { title: "Neon Nights", artist: "Synthwave Echo", duration: "4:12" },
    { title: "Electric Vibes", artist: "Digital Soul", duration: "3:28" },
  ]

  const currentSong = songs[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Glassmorphism container */}
      <div className="rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-8 md:p-12 shadow-2xl">
        {/* Album Art */}
        <motion.div
          animate={{ rotateY: isPlaying ? 360 : 0 }}
          transition={{
            duration: 20,
            repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
            ease: "linear",
          }}
          className="w-full max-w-xs mx-auto mb-8"
        >
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary via-accent to-secondary shadow-2xl flex items-center justify-center overflow-hidden relative group">
            <motion.div
              className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <div className="text-6xl">🎵</div>

            {/* Animated waveform */}
            {isPlaying && (
              <div className="absolute inset-0 flex items-end justify-center gap-1 p-4">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-white/60 rounded-full"
                    animate={{
                      height: [Math.random() * 40 + 10, Math.random() * 60 + 20, Math.random() * 40 + 10],
                    }}
                    transition={{
                      duration: 0.6 + Math.random() * 0.4,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Song Info */}
        <div className="text-center mb-8">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-foreground mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {currentSong.title}
          </motion.h2>
          <p className="text-foreground/60">{currentSong.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <motion.div
            className="h-1.5 bg-white/20 rounded-full overflow-hidden mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              style={{ width: `${progress}%` }}
              animate={{ width: isPlaying ? "100%" : `${progress}%` }}
              transition={{
                duration: isPlaying ? 180 : 0,
                ease: "linear",
              }}
            />
          </motion.div>
          <div className="flex justify-between text-xs text-foreground/60">
            <span>1:18</span>
            <span>{currentSong.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <motion.button
            className="p-2 rounded-lg hover:bg-white/10 text-foreground/60 hover:text-foreground transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Shuffle size={20} />
          </motion.button>

          <motion.button
            className="p-2 rounded-lg hover:bg-white/10 text-foreground/60 hover:text-foreground transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <SkipBack size={20} />
          </motion.button>

          {/* Play/Pause */}
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="relative p-4 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-0.5" />}
            {isPlaying && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            )}
          </motion.button>

          <motion.button
            className="p-2 rounded-lg hover:bg-white/10 text-foreground/60 hover:text-foreground transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <SkipForward size={20} />
          </motion.button>

          <motion.button
            className="p-2 rounded-lg hover:bg-white/10 text-foreground/60 hover:text-foreground transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Repeat size={20} />
          </motion.button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3">
          <Volume2 size={18} className="text-foreground/60" />
          <motion.input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="flex-1 h-1 bg-white/20 rounded-full accent-primary"
          />
          <span className="text-sm text-foreground/60 w-8">{volume}</span>
        </div>
      </div>

      {/* Floating glow effect behind player */}
      <motion.div
        className="absolute -inset-8 rounded-3xl bg-gradient-to-r from-primary via-accent to-secondary opacity-20 blur-3xl -z-10"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  )
}
