"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Trophy, Puzzle } from "lucide-react"
import { playSound } from "@/utils/sound-utils"
import Character from "./characters"
import { useEffect } from "react"

interface GameSectionProps {
  onBack: () => void
  score: number
  setScore: (score: number) => void
}

interface GameComponentProps {
  playerName: string
  playerGender: "boy" | "girl" | null
  setScore: (score: number) => void
}

export default function GameSection({ onBack, score, setScore }: GameSectionProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [playerName, setPlayerName] = useState("")
  const [playerGender, setPlayerGender] = useState<"boy" | "girl" | null>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [characterAnimation, setCharacterAnimation] = useState<"idle" | "talking" | "excited" | "thinking">("idle")

  // Add character animation effect
  useEffect(() => {
    if (selectedGame && !gameStarted) {
      setCharacterAnimation("talking")
      const timer = setTimeout(() => {
        setCharacterAnimation("idle")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [selectedGame, gameStarted])

  const games = [
    {
      id: "puzzle",
      title: "Puzzle Kelas Bersih",
      description: "Bantu merapikan kelas yang berantakan dengan menyusun puzzle!",
      icon: <Puzzle size={40} className="text-purple-500" />,
      color: "from-purple-400 to-purple-600",
    },
    {
      id: "adventure",
      title: "Petualangan Persatuan",
      description: "Selamatkan teman yang kesulitan dengan menjawab pertanyaan!",
      icon: <Trophy size={40} className="text-yellow-500" />,
      color: "from-yellow-400 to-orange-500",
    },
  ]

  const handleBack = () => {
    playSound("click")
    onBack()
  }

  const handleBackToGames = () => {
    playSound("click")
    setSelectedGame(null)
    setPlayerName("")
    setPlayerGender(null)
    setGameStarted(false)
    setCharacterAnimation("idle")
  }

  const handleSelectGame = (gameId: string) => {
    playSound("click")
    setSelectedGame(gameId)
    setCharacterAnimation("excited")
  }

  const handleStartGame = () => {
    if (playerName && playerGender) {
      playSound("start")
      setGameStarted(true)
      setCharacterAnimation("excited")
    }
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
        <button
          onClick={selectedGame ? handleBackToGames : handleBack}
          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-md"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl md:text-4xl font-bold text-white">Game Edukasi</h1>
        <div className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md">Skor: {score}</div>
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

      {!selectedGame ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleSelectGame(game.id)}
            >
              <div className={`h-40 bg-gradient-to-r ${game.color} flex items-center justify-center`}>
                <div className="bg-white p-4 rounded-full">{game.icon}</div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{game.title}</h3>
                <p className="text-sm text-gray-600">{game.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : !gameStarted ? (
        <motion.div
          className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-center text-purple-800 mb-6">Pilih Karaktermu!</h2>

          <div className="flex justify-center gap-6 mb-6">
            <motion.button
              className={`p-4 rounded-xl ${
                playerGender === "boy" ? "bg-blue-100 border-2 border-blue-500" : "bg-gray-100"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playSound("click")
                setPlayerGender("boy")
              }}
            >
              <Character type="boy" animation={playerGender === "boy" ? "excited" : "idle"} size="sm" />
              <p className="font-medium mt-2">Laki-laki</p>
            </motion.button>

            <motion.button
              className={`p-4 rounded-xl ${
                playerGender === "girl" ? "bg-pink-100 border-2 border-pink-500" : "bg-gray-100"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playSound("click")
                setPlayerGender("girl")
              }}
            >
              <Character type="girl" animation={playerGender === "girl" ? "excited" : "idle"} size="sm" />
              <p className="font-medium mt-2">Perempuan</p>
            </motion.button>
          </div>

          <div className="mb-6">
            <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Pemain:
            </label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Masukkan namamu..."
            />
          </div>

          <motion.button
            onClick={handleStartGame}
            disabled={!playerName || !playerGender}
            className={`w-full py-3 rounded-lg text-white font-bold text-lg ${
              playerName && playerGender ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
            }`}
            whileHover={playerName && playerGender ? { scale: 1.03 } : {}}
            whileTap={playerName && playerGender ? { scale: 0.97 } : {}}
          >
            Mulai Bermain!
          </motion.button>
        </motion.div>
      ) : selectedGame === "puzzle" ? (
        <PuzzleGame playerName={playerName} playerGender={playerGender} setScore={setScore} />
      ) : (
        <AdventureGame playerName={playerName} playerGender={playerGender} setScore={setScore} />
      )}

      {/* Student characters at the bottom */}
      {!selectedGame && !gameStarted && (
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

function PuzzleGame({ playerName, playerGender, setScore }: GameComponentProps) {
  const [items, setItems] = useState([
    { id: 1, name: "Meja", position: "random", fixed: false },
    { id: 2, name: "Kursi", position: "random", fixed: false },
    { id: 3, name: "Papan Tulis", position: "random", fixed: false },
    { id: 4, name: "Pigura", position: "random", fixed: false },
    { id: 5, name: "Buku", position: "random", fixed: false },
  ])

  const [gameCompleted, setGameCompleted] = useState(false)
  const [characterAnimation, setCharacterAnimation] = useState<"idle" | "talking" | "excited" | "thinking">("idle")

  // Add character animation effect
  useEffect(() => {
    setCharacterAnimation("talking")
    const timer = setTimeout(() => {
      setCharacterAnimation("idle")
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleDragItem = (id: number) => {
    playSound("click")

    // In a real implementation, this would handle the drag and drop functionality
    // For this example, we'll simulate fixing an item in place
    setItems(items.map((item) => (item.id === id ? { ...item, fixed: true, position: "fixed" } : item)))

    // Check if all items are fixed
    const allFixed = items.every((item) => (item.id === id ? true : item.fixed))

    if (allFixed) {
      setGameCompleted(true)
      setScore((prev) => prev + 50)
      playSound("complete")
      setCharacterAnimation("excited")
    } else {
      setCharacterAnimation("thinking")
      setTimeout(() => setCharacterAnimation("idle"), 1000)
    }
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-xl p-6 max-w-4xl w-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-center text-purple-800 mb-4">Puzzle Kelas Bersih</h2>

      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-r-lg mb-6">
        <p className="text-lg">
          Halo <span className="font-bold">{playerName}</span>! Kelas kita berantakan. Bagaimana sikap kita dalam
          mengamalkan persatuan di lingkungan sekolah? Ayo bantu merapikan kelas dengan menyusun barang-barang berikut
          ke tempatnya!
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {items.map((item) => (
            <motion.div
              key={item.id}
              className={`p-4 rounded-lg text-center cursor-pointer ${
                item.fixed ? "bg-green-100 border-2 border-green-500" : "bg-white border-2 border-gray-300"
              }`}
              whileHover={{ scale: item.fixed ? 1 : 1.05 }}
              whileTap={{ scale: item.fixed ? 1 : 0.95 }}
              onClick={() => !item.fixed && handleDragItem(item.id)}
            >
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">{item.fixed ? "Sudah rapi" : "Perlu dirapikan"}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {gameCompleted && (
        <motion.div
          className="bg-green-100 p-6 rounded-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-bold text-green-800 mb-2">Hebat! Kamu berhasil!</h3>
          <p className="text-lg mb-4">
            Dengan bekerja sama dan saling membantu, kita bisa menjaga kebersihan kelas. Ini adalah contoh persatuan di
            lingkungan sekolah!
          </p>
          <div className="flex justify-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.div key={star} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: star * 0.1 }}>
                  <Trophy className="text-yellow-500 w-8 h-8" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Player character */}
      <motion.div
        className="absolute bottom-10 right-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Character type={playerGender || "boy"} animation={characterAnimation} size="md" />
      </motion.div>
    </motion.div>
  )
}

function AdventureGame({ playerName, playerGender, setScore }: GameComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [characterAnimation, setCharacterAnimation] = useState<"idle" | "talking" | "excited" | "thinking">("talking")

  const questions = [
    {
      question: "Apa yang harus kamu lakukan jika melihat temanmu jatuh di halaman sekolah?",
      options: [
        "Menertawakan",
        "Pura-pura tidak melihat",
        "Membantu dan mengantarkan ke UKS",
        "Memanggil teman lain untuk menertawakan",
      ],
      correctAnswer: 2,
    },
    {
      question: "Bagaimana cara terbaik menyelesaikan perselisihan dengan teman?",
      options: ["Berkelahi", "Mengadu ke guru", "Membicarakan baik-baik dan berdamai", "Mendiamkan selamanya"],
      correctAnswer: 2,
    },
    {
      question: "Apa yang sebaiknya kamu lakukan jika temanmu lupa membawa bekal?",
      options: ["Membiarkannya kelaparan", "Berbagi bekal dengannya", "Mengejeknya", "Menyuruhnya pulang"],
      correctAnswer: 1,
    },
  ]

  // Add character animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setCharacterAnimation("idle")
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index)
    const correct = index === questions[currentQuestion].correctAnswer
    setIsCorrect(correct)

    if (correct) {
      playSound("correct")
      setScore((prev) => prev + 15)
      setCharacterAnimation("excited")

      if (currentQuestion < questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1)
          setSelectedAnswer(null)
          setIsCorrect(null)
          setTimeLeft(30)
          setCharacterAnimation("talking")
          setTimeout(() => setCharacterAnimation("idle"), 2000)
        }, 1500)
      } else {
        setGameWon(true)
        playSound("complete")
      }
    } else {
      playSound("wrong")
      setCharacterAnimation("thinking")
      setTimeout(() => {
        setGameOver(true)
      }, 1500)
    }
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-xl p-6 max-w-4xl w-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-center text-orange-800 mb-4">Petualangan Persatuan</h2>

      {!gameOver && !gameWon ? (
        <>
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-r-lg mb-6">
            <p className="text-lg">
              <span className="font-bold">{playerName}</span>, temanmu membutuhkan bantuan! Jawab pertanyaan dengan
              benar untuk menyelamatkannya. Kamu punya 30 detik untuk setiap pertanyaan!
            </p>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <span className="font-medium">
              Pertanyaan {currentQuestion + 1} dari {questions.length}
            </span>
            <span className={`font-bold ${timeLeft <= 10 ? "text-red-500" : "text-gray-700"}`}>
              Waktu: {timeLeft} detik
            </span>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="text-xl font-bold mb-4">{questions[currentQuestion].question}</h3>

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
                  whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                  whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                >
                  <span className="font-medium">{option}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </>
      ) : gameWon ? (
        <motion.div
          className="bg-green-100 p-6 rounded-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-2xl font-bold text-green-800 mb-4">Selamat! Kamu Berhasil!</h3>
          <p className="text-lg mb-6">
            Kamu telah menyelamatkan temanmu dengan menjawab semua pertanyaan dengan benar! Ini menunjukkan bahwa kamu
            memahami nilai persatuan di lingkungan sekolah.
          </p>
          <div className="flex justify-center">
            <Trophy className="text-yellow-500 w-16 h-16" />
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="bg-red-100 p-6 rounded-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-2xl font-bold text-red-800 mb-4">Game Over</h3>
          <p className="text-lg mb-6">
            Sayang sekali, jawabanmu kurang tepat. Jangan menyerah! Coba lagi dan tunjukkan pemahaman tentang persatuan
            di lingkungan sekolah.
          </p>
        </motion.div>
      )}

      {/* Player character */}
      <motion.div
        className="absolute bottom-10 right-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Character
          type={playerGender || "boy"}
          animation={
            gameWon
              ? "excited"
              : gameOver
                ? "thinking"
                : isCorrect === true
                  ? "excited"
                  : isCorrect === false
                    ? "thinking"
                    : characterAnimation
          }
          size="md"
        />
      </motion.div>

      {/* Friend character that needs help */}
      {!gameOver && !gameWon && (
        <motion.div
          className="absolute bottom-10 left-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Character type={playerGender === "boy" ? "girl" : "boy"} animation="thinking" size="md" />
        </motion.div>
      )}

      {/* Group celebrating when game is won */}
      {gameWon && (
        <motion.div
          className="absolute bottom-10 left-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Character type="group" animation="excited" size="md" />
        </motion.div>
      )}
    </motion.div>
  )
}
