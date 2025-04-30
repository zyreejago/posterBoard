"use client"

import { motion } from "framer-motion"
import { FileText, HelpCircle, Gamepad2, BookOpen } from "lucide-react"
import { playSound } from "@/utils/sound-utils"
import { ChalkCircle, ChalkStar } from "./animated-decorations"
import Character from "./characters"
import { useState } from "react"

interface MainMenuProps {
  onNavigate: (screen: string) => void
}

export default function MainMenu({ onNavigate }: MainMenuProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const menuItems = [
    {
      title: "Materi",
      icon: <FileText size={40} />,
      color: "bg-blue-500 hover:bg-blue-600",
      screen: "poster",
      character: "teacher",
    },
    {
      title: "Quiz Seru",
      icon: <HelpCircle size={40} />,
      color: "bg-green-500 hover:bg-green-600",
      screen: "quiz",
      character: "boy",
    },
    {
      title: "Game Edukasi",
      icon: <Gamepad2 size={40} />,
      color: "bg-purple-500 hover:bg-purple-600",
      screen: "game",
      character: "girl",
    },
    {
      title: "Poster",
      icon: <BookOpen size={40} />,
      color: "bg-yellow-500 hover:bg-yellow-600",
      screen: "instructions",
      character: "group",
    },
  ]

  const handleNavigate = (screen: string) => {
    playSound("click")
    onNavigate(screen)
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            className="relative"
            onMouseEnter={() => setHoveredItem(item.screen)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <motion.button
              className={`${item.color} text-white rounded-xl p-6 flex flex-col items-center justify-center w-64 h-48 shadow-lg transform transition-all duration-300 relative overflow-hidden`}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleNavigate(item.screen)}
            >
              {/* Animated highlight effect */}
              <motion.div
                className="absolute inset-0 bg-white opacity-10"
                initial={{ x: "-100%", y: "-100%" }}
                whileHover={{ x: "100%", y: "100%" }}
                transition={{ duration: 0.5 }}
              />

              <motion.div className="mb-4" whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
                {item.icon}
              </motion.div>

              <span className="text-xl font-bold">{item.title}</span>
            </motion.button>

            {/* Character that appears on hover */}
            <AnimatedCharacter
              type={item.character as "teacher" | "boy" | "girl" | "group"}
              isVisible={hoveredItem === item.screen}
              position={index % 2 === 0 ? "left" : "right"}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

interface AnimatedCharacterProps {
  type: "teacher" | "boy" | "girl" | "group"
  isVisible: boolean
  position: "left" | "right"
}

function AnimatedCharacter({ type, isVisible, position }: AnimatedCharacterProps) {
  return (
    <motion.div
      className={`absolute top-1/2 ${position === "left" ? "-left-24" : "-right-24"} transform -translate-y-1/2`}
      initial={{ opacity: 0, x: position === "left" ? -20 : 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : position === "left" ? -20 : 20,
      }}
      transition={{ duration: 0.3 }}
    >
      <Character type={type} animation={isVisible ? "excited" : "idle"} size="md" />
    </motion.div>
  )
}
