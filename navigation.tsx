"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Music, ListMusic, Settings, Home } from "lucide-react"

export default function Navigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Music, label: "Player", href: "/player" },
    { icon: ListMusic, label: "Playlists", href: "/playlists" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed left-0 top-0 h-screen w-24 bg-black/40 backdrop-blur-md border-r border-white/10 flex-col items-center justify-center gap-8 z-20">
        {navItems.map((item) => (
          <motion.button
            key={item.href}
            onClick={() => router.push(item.href)}
            className={`relative p-3 rounded-lg transition-all ${
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-foreground/60 hover:text-foreground hover:bg-white/10"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={item.label}
          >
            <item.icon size={24} />
            {pathname === item.href && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 border-2 border-primary rounded-lg"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-white/10 z-20">
        <div className="flex justify-around items-center py-4">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`flex flex-col items-center gap-1 p-2 transition-all ${
                pathname === item.href ? "text-primary" : "text-foreground/60"
              }`}
            >
              <item.icon size={20} />
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
