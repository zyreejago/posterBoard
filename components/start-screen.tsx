"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Pencil, BookOpen, Users, School, Stars, Sparkles, Lightbulb } from "lucide-react"
import { playSound } from "@/utils/sound-utils"
import { FloatingIcon, PulsingIcon, SpinningIcon, ChalkStar, ChalkCircle } from "./animated-decorations"
import Character from "./characters"

interface StartScreenProps {
  onStart: () => void
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [characterAnimation, setCharacterAnimation] = useState<"idle" | "talking" | "excited">("idle")

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Start character animation sequence
      setCharacterAnimation("talking")

      const excitedTimer = setTimeout(() => {
        setCharacterAnimation("excited")

        const idleTimer = setTimeout(() => {
          setCharacterAnimation("idle")
        }, 3000)

        return () => clearTimeout(idleTimer)
      }, 3000)

      return () => clearTimeout(excitedTimer)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleStart = () => {
    playSound("start")
    setCharacterAnimation("excited")
    onStart()
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      {/* Animated decorative elements */}
      <ChalkStar className="absolute top-20 left-20" />
      <ChalkCircle className="absolute bottom-20 right-20" />
      <ChalkStar className="absolute top-20 right-40" />
      <ChalkCircle className="absolute bottom-40 left-20" />

      {/* Floating school items animations */}
      <FloatingIcon delay={0} duration={3} className="absolute top-10 left-10">
        <Pencil size={40} className="text-yellow-300" />
      </FloatingIcon>

      <FloatingIcon delay={0.5} duration={4} className="absolute top-20 right-20">
        <BookOpen size={40} className="text-red-400" />
      </FloatingIcon>

      <FloatingIcon delay={1} duration={5} className="absolute bottom-20 left-20">
        <Users size={40} className="text-blue-400" />
      </FloatingIcon>

      <FloatingIcon delay={1.5} duration={4.5} className="absolute bottom-40 right-40">
        <School size={40} className="text-purple-400" />
      </FloatingIcon>

      <PulsingIcon delay={0.2} className="absolute top-32 left-1/3">
        <Sparkles size={30} className="text-yellow-200" />
      </PulsingIcon>

      <PulsingIcon delay={0.7} className="absolute bottom-32 right-1/3">
        <Stars size={30} className="text-blue-200" />
      </PulsingIcon>

      <SpinningIcon delay={1} duration={15} className="absolute top-1/2 left-1/4">
        <Lightbulb size={25} className="text-yellow-100" />
      </SpinningIcon>

      {/* Teacher character */}
      <motion.div
        className="absolute bottom-10 left-10 md:bottom-20 md:left-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <Character type="teacher" animation={characterAnimation} size="lg" />
      </motion.div>

      {/* Title and start button */}
      <motion.div
        className="text-center relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 text-white font-comic"
          animate={{
            textShadow: [
              "0 0 8px rgba(255,255,255,0.1)",
              "0 0 16px rgba(255,255,255,0.2)",
              "0 0 8px rgba(255,255,255,0.1)",
            ],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          Poster Board
        </motion.h1>

        <motion.h2
          className="text-xl md:text-2xl mb-8 text-yellow-300 font-comic"
          animate={{
            y: [0, -5, 0],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        >
          Pendidikan Pancasila - Persatuan di Lingkungan Sekolah
        </motion.h2>

        <motion.button
          onClick={handleStart}
          className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-4 px-8 rounded-full text-xl md:text-2xl shadow-lg transform transition-all duration-300 hover:scale-110 relative overflow-hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="absolute inset-0 bg-white opacity-20"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "linear",
            }}
          />
          Mulai Petualangan!
        </motion.button>
      </motion.div>

      {/* Student characters */}
      <motion.div
        className="absolute bottom-10 right-10 md:bottom-20 md:right-20"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <Character type="group" animation={characterAnimation} size="lg" />
      </motion.div>
    </div>
  )
}
