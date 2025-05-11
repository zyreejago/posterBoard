"use client"

import type React from "react"

import { motion } from "framer-motion"
import { FileText, HelpCircle, BookOpen, ExternalLink } from 'lucide-react'
import { playSound } from "@/utils/sound-utils"
import { ChalkCircle, ChalkStar } from "./animated-decorations"
import Character from "./characters"
import { useState } from "react"

interface MainMenuProps {
  onNavigate: (screen: string) => void
}

export default function MainMenu({ onNavigate }: MainMenuProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const handleNavigate = (screen: string) => {
    playSound("click")
    if (screen === "quiz") {
      // Open external quiz link in a new tab
      window.open("https://quiz.zep.us/id/play/Qa9RKP", "_blank")
    } else {
      onNavigate(screen)
    }
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      {/* Decorative elements */}
      <ChalkCircle className="absolute top-20 left-20" />
      <ChalkStar className="absolute bottom-20 right-20" />

      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-12 text-white"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          animate={{
            textShadow: [
              "0 0 8px rgba(255,255,255,0.1)",
              "0 0 16px rgba(255,255,255,0.2)",
              "0 0 8px rgba(255,255,255,0.1)",
            ],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          Menu Utama
        </motion.span>
      </motion.h1>

      {/* 2x2 Grid Layout with square cards */}
      <div className="grid grid-cols-2 gap-6 max-w-2xl">
        {/* Top Row */}
        <MenuButton
          title="Materi"
          icon={<FileText size={40} />}
          color="bg-blue-500 hover:bg-blue-600"
          onClick={() => handleNavigate("poster")}
          onHover={(isHovered) => setHoveredItem(isHovered ? "materi" : null)}
          isHovered={hoveredItem === "materi"}
          position="left"
          characterType="teacher"
        />

        <MenuButton
          title="Poster"
          icon={<BookOpen size={40} />}
          color="bg-purple-500 hover:bg-purple-600"
          onClick={() => handleNavigate("instructions")}
          onHover={(isHovered) => setHoveredItem(isHovered ? "poster" : null)}
          isHovered={hoveredItem === "poster"}
          position="right"
          characterType="group"
        />

        {/* Bottom Row */}
        <MenuButton
          title="Quiz"
          icon={<ExternalLink size={40} />}
          color="bg-green-500 hover:bg-green-600"
          onClick={() => handleNavigate("quiz")}
          onHover={(isHovered) => setHoveredItem(isHovered ? "quiz" : null)}
          isHovered={hoveredItem === "quiz"}
          position="left"
          characterType="boy"
        />

        <MenuButton
          title="Petunjuk"
          icon={<HelpCircle size={40} />}
          color="bg-yellow-500 hover:bg-yellow-600"
          onClick={() => handleNavigate("petunjuk")}
          onHover={(isHovered) => setHoveredItem(isHovered ? "petunjuk" : null)}
          isHovered={hoveredItem === "petunjuk"}
          position="right"
          characterType="girl"
        />
      </div>
    </div>
  )
}

interface MenuButtonProps {
  title: string
  icon: React.ReactNode
  color: string
  onClick: () => void
  onHover: (isHovered: boolean) => void
  isHovered: boolean
  position: "left" | "right"
  characterType: "teacher" | "boy" | "girl" | "group"
}

function MenuButton({ title, icon, color, onClick, onHover, isHovered, position, characterType }: MenuButtonProps) {
  return (
    <motion.div className="relative" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}>
      <motion.button
        className={`${color} text-white rounded-xl p-6 flex flex-col items-center justify-center w-40 h-40 md:w-48 md:h-48 shadow-lg transform transition-all duration-300 relative overflow-hidden mx-auto`}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onClick={onClick}
      >
        {/* Animated highlight effect */}
        <motion.div
          className="absolute inset-0 bg-white opacity-10"
          initial={{ x: "-100%", y: "-100%" }}
          whileHover={{ x: "100%", y: "100%" }}
          transition={{ duration: 0.5 }}
        />

        <motion.div className="mb-4" whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
          {icon}
        </motion.div>

        <span className="text-xl font-bold">{title}</span>
      </motion.button>

      {/* Character that appears on hover */}
      <motion.div
        className={`absolute top-1/2 ${position === "left" ? "-left-24" : "-right-24"} transform -translate-y-1/2`}
        initial={{ opacity: 0, x: position === "left" ? -20 : 20 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          x: isHovered ? 0 : position === "left" ? -20 : 20,
        }}
        transition={{ duration: 0.3 }}
      >
        <Character type={characterType} animation={isHovered ? "excited" : "idle"} size="md" />
      </motion.div>
    </motion.div>
  )
}
