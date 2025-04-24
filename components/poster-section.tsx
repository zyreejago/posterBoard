"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Flower2, Users, School } from "lucide-react"
import { playSound } from "@/utils/sound-utils"
import Character from "./characters"

interface PosterSectionProps {
  onBack: () => void
}

export default function PosterSection({ onBack }: PosterSectionProps) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [characterAnimation, setCharacterAnimation] = useState<"idle" | "talking" | "excited" | "thinking">("idle")

  // Add character animation effect
  useEffect(() => {
    if (selectedTopic) {
      setCharacterAnimation("talking")
      const timer = setTimeout(() => {
        setCharacterAnimation("idle")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [selectedTopic])

  const topics = [
    {
      id: "keindahan",
      title: "Keindahan Sekolahku",
      icon: <Flower2 size={40} className="text-pink-500" />,
      content:
        "Sekolah yang indah adalah sekolah yang bersih, rapi, dan nyaman. Kita semua bertanggung jawab menjaga keindahan sekolah dengan tidak membuang sampah sembarangan, merapikan meja dan kursi setelah digunakan, dan merawat tanaman di sekitar sekolah. Dengan sekolah yang indah, kita akan merasa senang belajar dan bermain bersama teman-teman.",
      image: "/images/poster-keindahan-sekolahku.png",
    },
    {
      id: "peduli",
      title: "Peduli Lingkungan Sekolah",
      icon: <School size={40} className="text-green-500" />,
      content:
        "Peduli lingkungan sekolah berarti kita ikut menjaga kebersihan dan kenyamanan sekolah. Kita bisa melakukan kegiatan seperti kerja bakti membersihkan kelas, menyiram tanaman, dan membuang sampah pada tempatnya. Dengan peduli pada lingkungan sekolah, kita telah menerapkan nilai Pancasila yaitu gotong royong dan kebersamaan.",
      image: "/images/poster-peduli-lingkungan-sekolah.png",
    },
    {
      id: "bersatu",
      title: "Bersatu Menjaga Sekolah",
      icon: <Users size={40} className="text-blue-500" />,
      content:
        "Bersatu dalam menjaga sekolah artinya kita bekerja sama dengan teman-teman untuk merawat sekolah kita. Kita bisa membuat jadwal piket kelas, saling mengingatkan untuk menjaga kebersihan, dan bersama-sama memperbaiki fasilitas sekolah yang rusak. Dengan bersatu, pekerjaan menjadi lebih ringan dan sekolah kita akan selalu terjaga dengan baik.",
      image: "/images/poster-bersatu-menjaga-sekolah.png",
    },
  ]

  const handleBack = () => {
    playSound("click")
    onBack()
  }

  const handleSelectTopic = (topicId: string) => {
    playSound("click")
    setSelectedTopic(topicId)
    setCharacterAnimation("excited")
  }

  const handleBackToTopics = () => {
    playSound("click")
    setSelectedTopic(null)
    setCharacterAnimation("idle")
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
        <h1 className="text-3xl md:text-4xl font-bold text-white">Poster Materi</h1>
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

      {selectedTopic ? (
        <TopicDetail topic={topics.find((t) => t.id === selectedTopic)!} onBack={handleBackToTopics} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleSelectTopic(topic.id)}
            >
              <div className="h-40 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                <div className="bg-white p-4 rounded-full">{topic.icon}</div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{topic.title}</h3>
                <p className="text-sm text-gray-600">Klik untuk mempelajari lebih lanjut</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Student characters */}
      {!selectedTopic && (
        <motion.div
          className="absolute bottom-10 left-10 md:bottom-20 md:left-20"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Character type="group" animation="idle" size="md" />
        </motion.div>
      )}
    </div>
  )
}

interface TopicDetailProps {
  topic: {
    id: string
    title: string
    icon: React.ReactNode
    content: string
    image: string
  }
  onBack: () => void
}

function TopicDetail({ topic, onBack }: TopicDetailProps) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-xl p-6 max-w-4xl w-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl md:text-3xl font-bold text-purple-800">{topic.title}</h2>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="w-full md:w-2/3">
          <img
            src={topic.image || "/placeholder.svg"}
            alt={topic.title}
            className="rounded-lg shadow-md w-full h-auto"
          />
        </div>
        <div className="w-full md:w-1/3">
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-800">{topic.content}</p>
          </div>
          <div className="mt-6 flex justify-center">
            <div className="bg-purple-100 p-4 rounded-full">{topic.icon}</div>
          </div>
        </div>
      </div>

      {/* Add student character to topic detail */}
      <motion.div
        className="absolute bottom-10 right-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Character
          type={topic.id === "bersatu" ? "group" : topic.id === "peduli" ? "girl" : "boy"}
          animation="excited"
          size="sm"
        />
      </motion.div>
    </motion.div>
  )
}
