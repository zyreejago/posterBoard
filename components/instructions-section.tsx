"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { playSound } from "@/utils/sound-utils"
import Character from "./characters"
import { useState, useEffect } from "react"

interface InstructionsSectionProps {
  onBack: () => void
}

export default function InstructionsSection({ onBack }: InstructionsSectionProps) {
  const [characterAnimation, setCharacterAnimation] = useState<"idle" | "talking" | "excited" | "thinking">("talking")

  // Add character animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setCharacterAnimation("idle")
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  const handleBack = () => {
    playSound("click")
    onBack()
  }

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
        <h1 className="text-3xl md:text-4xl font-bold text-white">Poster Persatuan</h1>
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
        className="bg-white rounded-xl shadow-xl p-6 max-w-4xl w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">Persatuan di Lingkungan Sekolah</h2>

        <div className="flex justify-center mb-6">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-04-28%20at%2020.27.54%20%281%29-Af2CDT9oWRO5SpcXUUlkqKfFw5diJX.jpeg"
            alt="Poster Persatuan di Lingkungan Sekolah"
            className="rounded-lg shadow-md max-w-full h-auto"
          />
        </div>

        {/* <motion.div
          className="mt-8 p-4 rounded-lg bg-yellow-100 border-l-4 border-yellow-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-lg">
            <span className="font-bold">Pengertian Persatuan:</span> Persatuan adalah kebersamaan dalam bekerja sama,
            saling menghargai, dan hidup rukun meskipun berbeda. Di sekolah, persatuan tercermin dalam kerja sama untuk
            belajar, bermain, dan menjaga kebersihan bersama.
          </p>
        </motion.div> */}

        {/* <motion.div
          className="mt-4 p-4 rounded-lg bg-orange-100 border-l-4 border-orange-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <p className="text-lg">
            <span className="font-bold">Mengapa Persatuan itu Penting?</span> Persatuan di sekolah penting agar kita
            bisa merasa nyaman dan menyenangkan. Dengan hidup rukun, tugas jadi lebih mudah diselesaikan, dan semua
            teman merasa dihargai meskipun berbeda suku, agama, dan kebiasaan.
          </p>
        </motion.div> */}

        {/* <motion.div
          className="mt-4 p-4 rounded-lg bg-green-100 border-l-4 border-green-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <p className="text-lg font-bold mb-2">Contoh Persatuan di Sekolah:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Bekerja sama dalam menjaga kebersihan kelas</li>
            <li>Saling membantu teman yang kesulitan belajar</li>
            <li>Mengikuti upacara bendera dengan tertib dan penuh semangat</li>
            <li>Bermain bersama dengan teman-teman tanpa membedakan siapa pun</li>
          </ul>
        </motion.div> */}

        {/* <motion.div
          className="mt-4 p-4 rounded-lg bg-red-100 border-l-4 border-red-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <p className="text-lg font-bold mb-2">Tindakan yang Tidak Mencerminkan Persatuan:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Mengolok-olok teman karena perbedaan fisik atau kebiasaan</li>
            <li>Tidak mau bekerja sama dengan teman dalam tugas kelompok</li>
            <li>Bertindak egois atau hanya memikirkan kepentingan diri sendiri</li>
          </ul>
        </motion.div> */}
      </motion.div>

      {/* Student characters */}
      <motion.div
        className="absolute bottom-10 left-10 md:bottom-20 md:left-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <Character type="group" animation="excited" size="md" />
      </motion.div>
    </div>
  )
}
