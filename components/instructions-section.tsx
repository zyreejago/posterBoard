"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Info, MousePointer, Gamepad2, HelpCircle, FileText } from "lucide-react"
import { playSound } from "@/utils/sound-utils"
import Character from "./characters"
import { useState, useEffect } from "react"

interface InstructionsSectionProps {
  onBack: () => void
}

export default function InstructionsSection({ onBack }: InstructionsSectionProps) {
  const [activeInstruction, setActiveInstruction] = useState(0)
  const [characterAnimation, setCharacterAnimation] = useState<"idle" | "talking" | "excited" | "thinking">("talking")

  // Add character animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setCharacterAnimation("idle")
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  // Change character animation when instruction changes
  useEffect(() => {
    setCharacterAnimation("talking")
    const timer = setTimeout(() => {
      setCharacterAnimation("idle")
    }, 3000)
    return () => clearTimeout(timer)
  }, [activeInstruction])

  const handleBack = () => {
    playSound("click")
    onBack()
  }

  const instructions = [
    {
      title: "Mulai Aplikasi",
      icon: <Info size={24} className="text-blue-500" />,
      content: "Klik tombol 'Mulai Petualangan' pada layar awal untuk memulai aplikasi Poster Board.",
    },
    {
      title: "Menu Utama",
      icon: <MousePointer size={24} className="text-green-500" />,
      content:
        "Pada menu utama, kamu dapat memilih salah satu dari empat pilihan: Poster Materi, Quiz Seru, Game Edukasi, atau Petunjuk.",
    },
    {
      title: "Poster Materi",
      icon: <FileText size={24} className="text-purple-500" />,
      content:
        "Klik pada kartu untuk melihat materi tentang persatuan di lingkungan sekolah. Ada tiga sub-topik yang bisa kamu pelajari.",
    },
    {
      title: "Quiz Seru",
      icon: <HelpCircle size={24} className="text-red-500" />,
      content:
        "Jawab pertanyaan dengan benar untuk mendapatkan poin. Kamu akan mendapat umpan balik langsung untuk setiap jawaban.",
    },
    {
      title: "Game Edukasi",
      icon: <Gamepad2 size={24} className="text-orange-500" />,
      content:
        "Pilih karakter dan mainkan game puzzle atau petualangan untuk belajar tentang persatuan sambil bersenang-senang!",
    },
  ]

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6">
      {/* Header with back button */}
      <motion.div
        className="w-full flex justify-between items-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button onClick={handleBack} className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-md">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl md:text-4xl font-bold text-white">Petunjuk Penggunaan</h1>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </motion.div>

      {/* Teacher character */}
      <motion.div
        className="absolute top-20 right-10 md:right-20"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <Character type="teacher" animation={characterAnimation} size="md" />
      </motion.div>

      <motion.div
        className="bg-white rounded-xl shadow-xl p-6 max-w-3xl w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-6">
          {instructions.map((instruction, index) => (
            <motion.div
              key={index}
              className={`flex gap-4 p-4 rounded-lg ${activeInstruction === index ? "bg-blue-100 border-l-4 border-blue-500" : "bg-blue-50"}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => {
                setActiveInstruction(index)
                playSound("click")
              }}
            >
              <div className="bg-white p-2 rounded-full h-fit">{instruction.icon}</div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{instruction.title}</h3>
                <p className="text-gray-600">{instruction.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 p-4 rounded-lg bg-yellow-100 border-l-4 border-yellow-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-lg">
            <span className="font-bold">Tip:</span> Kamu bisa kembali ke menu utama kapan saja dengan menekan tombol
            panah kembali di pojok kiri atas.
          </p>
        </motion.div>
      </motion.div>

      {/* Student characters */}
      <motion.div
        className="absolute bottom-10 left-10 md:bottom-20 md:left-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <Character
          type={
            activeInstruction === 0
              ? "boy"
              : activeInstruction === 1
                ? "girl"
                : activeInstruction === 2
                  ? "boy"
                  : activeInstruction === 3
                    ? "girl"
                    : "group"
          }
          animation={activeInstruction === 4 ? "excited" : "idle"}
          size="md"
        />
      </motion.div>
    </div>
  )
}
