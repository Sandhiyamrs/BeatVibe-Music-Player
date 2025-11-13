"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import PlaylistCard from "@/components/playlist-card"
import GradientBackground from "@/components/gradient-background"
import { Plus } from "lucide-react"

interface Playlist {
  id: string
  name: string
  mood: "chill" | "party" | "focus" | "romantic"
  songCount: number
  createdAt: string
}

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [showModal, setShowModal] = useState(false)
  const [newPlaylistName, setNewPlaylistName] = useState("")

  useEffect(() => {
    // Load playlists from localStorage
    const saved = localStorage.getItem("beatvibe-playlists")
    if (saved) {
      setPlaylists(JSON.parse(saved))
    } else {
      // Default playlists
      const defaults: Playlist[] = [
        {
          id: "1",
          name: "Midnight Chill",
          mood: "chill",
          songCount: 24,
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Party Energy",
          mood: "party",
          songCount: 18,
          createdAt: new Date().toISOString(),
        },
        {
          id: "3",
          name: "Focus Flow",
          mood: "focus",
          songCount: 32,
          createdAt: new Date().toISOString(),
        },
        {
          id: "4",
          name: "Romantic Nights",
          mood: "romantic",
          songCount: 20,
          createdAt: new Date().toISOString(),
        },
      ]
      setPlaylists(defaults)
      localStorage.setItem("beatvibe-playlists", JSON.stringify(defaults))
    }
  }, [])

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      const newPlaylist: Playlist = {
        id: Date.now().toString(),
        name: newPlaylistName,
        mood: "chill",
        songCount: 0,
        createdAt: new Date().toISOString(),
      }
      const updated = [...playlists, newPlaylist]
      setPlaylists(updated)
      localStorage.setItem("beatvibe-playlists", JSON.stringify(updated))
      setNewPlaylistName("")
      setShowModal(false)
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
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-foreground"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Your Playlists
            </motion.h1>

            <motion.button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={20} />
              New Playlist
            </motion.button>
          </div>

          {/* Playlists Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Create Playlist Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Create New Playlist</h2>

            <input
              type="text"
              placeholder="Playlist name"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreatePlaylist()}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary mb-6"
              autoFocus
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-foreground transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePlaylist}
                className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-lg transition-all"
              >
                Create
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  )
}
