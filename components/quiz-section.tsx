"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, CheckCircle, XCircle, Award } from "lucide-react"
import { playSound } from "@/utils/sound-utils"
import confetti from "canvas-confetti"
import { ChalkCircle, ChalkStar } from "./animated-decorations"
import Character from "./characters"
import { useEffect } from "react"

interface QuizSectionProps {
  onBack: () => void
  score: number
  setScore: (score: number) => void
}

export default function QuizSection({ onBack, score, setScore }: QuizSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [characterAnimation, setCharacterAnimation] = useState<"idle" | "talking" | "excited" | "thinking">("idle")

  // Add character animation effect
  useEffect(() => {
    setCharacterAnimation("talking")
    const timer = setTimeout(() => {
      setCharacterAnimation("idle")
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const questions = [
    {
      question: "Apa yang harus kita lakukan untuk menjaga keindahan sekolah?",
      options: [
        "Membuang sampah sembarangan",
        "Mencoret-coret dinding sekolah",
        "Membuang sampah pada tempatnya",
        "Membiarkan tanaman layu",
      ],
      correctAnswer: 2,
    },
    {
      question: "Contoh kegiatan yang menunjukkan persatuan di sekolah adalah...",
      options: [
        "Bermain sendiri saat istirahat",
        "Kerja bakti membersihkan kelas",
        "Tidak membantu teman yang kesulitan",
        "Berebut mainan dengan teman",
      ],
      correctAnswer: 1,
    },
    {
      question: "Mengapa kita perlu peduli dengan lingkungan sekolah?",
      options: [
        "Agar sekolah menjadi nyaman untuk belajar",
        "Agar mendapat hadiah dari guru",
        "Agar tidak dihukum",
        "Agar bisa pulang cepat",
      ],
      correctAnswer: 0,
    },
    {
      question: "Nilai Pancasila yang diterapkan saat kita bekerja sama menjaga kebersihan sekolah adalah...",
      options: ["Keadilan sosial", "Gotong royong", "Musyawarah mufakat", "Semua jawaban benar"],
      correctAnswer: 3,
    },
    {
      question: "Apa yang sebaiknya kita lakukan jika melihat sampah di halaman sekolah?",
      options: [
        "Membiarkannya saja",
        "Menunggu petugas kebersihan",
        "Memungut dan membuangnya ke tempat sampah",
        "Menyuruh teman untuk membuangnya",
      ],
      correctAnswer: 2,
    },
  ]

  const handleBack = () => {
    playSound("click")
    onBack()
  }

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index)
    const correct = index === questions[currentQuestion].correctAnswer
    setIsCorrect(correct)

    if (correct) {
      setCharacterAnimation("excited")
      playSound("correct")
      setScore(score + 10)
      // Trigger confetti for correct answer
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    } else {
      setCharacterAnimation("thinking")
      playSound("wrong")
    }

    setTimeout(() => {
      setShowResult(true)

      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1)
          setSelectedAnswer(null)
          setIsCorrect(null)
          setShowResult(false)
          setCharacterAnimation("idle")
        } else {
          setQuizCompleted(true)
          setCharacterAnimation("excited")
          playSound("complete")
          // More celebratory confetti
          confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: ["#FFD700", "#FFA500", "#FF4500"],
          })
        }
      }, 2000)
    }, 500)
  }

  const resetQuiz = () => {
    playSound("click")
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setIsCorrect(null)
    setShowResult(false)
    setQuizCompleted(false)
    setCharacterAnimation("idle")
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6">
      {/* Decorative elements */}
      <ChalkCircle className="absolute top-20 left-20" />
      <ChalkStar className="absolute bottom-20 right-20" />

      {/* Teacher character */}
      <motion.div
        className="absolute top-20 right-10 md:right-20"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <Character type="teacher" animation={characterAnimation} size="md" />
      </motion.div>

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
        <h1 className="text-3xl md:text-4xl font-bold text-white">Quiz Seru</h1>
        <div className="bg-yellow-500 text-white px-4 py-2 rounded-full shadow-md">Skor: {score}</div>
      </motion.div>

      {quizCompleted ? (
        <motion.div
          className="bg-white rounded-xl shadow-xl p-8 max-w-2xl w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            <Award size={80} className="mx-auto text-yellow-500 mb-4" />
          </motion.div>
          <h2 className="text-3xl font-bold text-purple-800 mb-4">Selamat!</h2>
          <p className="text-xl text-gray-700 mb-6">Kamu telah menyelesaikan quiz dengan skor: {score}</p>

          {/* Group character celebrating */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Character type="group" animation="excited" size="md" />
          </motion.div>

          <motion.button
            onClick={resetQuiz}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            Main Lagi
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          className="bg-white rounded-xl shadow-xl p-6 max-w-3xl w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-500">
                Pertanyaan {currentQuestion + 1} dari {questions.length}
              </span>
              <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5 ml-4">
                <motion.div
                  className="bg-green-600 h-2.5 rounded-full"
                  initial={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                  animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">{questions[currentQuestion].question}</h2>
          </div>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                  selectedAnswer === index
                    ? isCorrect
                      ? "border-green-500 bg-green-100"
                      : "border-red-500 bg-red-100"
                    : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                }`}
                disabled={selectedAnswer !== null}
                onClick={() => handleAnswerSelect(index)}
                whileHover={{
                  scale: selectedAnswer === null ? 1.02 : 1,
                  boxShadow: selectedAnswer === null ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
                }}
                whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <span className="font-medium">{option}</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {showResult && (
              <motion.div
                className={`mt-6 p-4 rounded-lg ${
                  isCorrect ? "bg-green-100 border-l-4 border-green-500" : "bg-red-100 border-l-4 border-red-500"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex items-center">
                  {isCorrect ? (
                    <>
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, 0],
                        }}
                        transition={{ duration: 0.5, repeat: 2 }}
                      >
                        <CheckCircle className="text-green-500 mr-2" size={24} />
                      </motion.div>
                      <span className="font-medium text-green-800">Bagus sekali! Jawaban kamu benar!</span>
                    </>
                  ) : (
                    <>
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, -10, 0],
                        }}
                        transition={{ duration: 0.5, repeat: 2 }}
                      >
                        <XCircle className="text-red-500 mr-2" size={24} />
                      </motion.div>
                      <span className="font-medium text-red-800">
                        Jawaban yang benar adalah:{" "}
                        {questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}
                      </span>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Student character */}
      <motion.div
        className="absolute bottom-20 left-10 md:left-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <Character
          type={isCorrect === true ? "excited" : isCorrect === false ? "thinking" : "idle"}
          animation={characterAnimation}
          size="md"
        />
      </motion.div>
    </div>
  )
}
