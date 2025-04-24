"use client"

import { useState, useEffect } from "react"
import StartScreen from "@/components/start-screen"
import MainMenu from "@/components/main-menu"
import PosterSection from "@/components/poster-section"
import QuizSection from "@/components/quiz-section"
import GameSection from "@/components/game-section"
import InstructionsSection from "@/components/instructions-section"
import ScreenTransition from "@/components/screen-transition"

export default function PosterBoard() {
  const [currentScreen, setCurrentScreen] = useState("start")
  const [score, setScore] = useState(0)
  const [previousScreen, setPreviousScreen] = useState("")
  const [transitionDirection, setTransitionDirection] = useState<"left" | "right">("right")

  // Initialize sound system
  useEffect(() => {
    // This is a workaround for browsers that require user interaction before playing audio
    const enableAudio = () => {
      // Create and play a silent audio context
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      gainNode.gain.value = 0 // Set the volume to 0
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.001)

      // Remove the event listeners
      document.removeEventListener("click", enableAudio)
      document.removeEventListener("touchstart", enableAudio)
    }

    document.addEventListener("click", enableAudio)
    document.addEventListener("touchstart", enableAudio)

    return () => {
      document.removeEventListener("click", enableAudio)
      document.removeEventListener("touchstart", enableAudio)
    }
  }, [])

  const navigateTo = (screen: string) => {
    // Determine transition direction
    if (screen === "menu" && currentScreen !== "start") {
      setTransitionDirection("left") // Going back to menu
    } else {
      setTransitionDirection("right") // Going forward to a section
    }

    setPreviousScreen(currentScreen)
    setCurrentScreen(screen)
  }

  return (
    <div className="min-h-screen overflow-hidden relative">
      <ScreenTransition isVisible={currentScreen === "start"} direction={transitionDirection}>
        <StartScreen onStart={() => navigateTo("menu")} />
      </ScreenTransition>

      <ScreenTransition isVisible={currentScreen === "menu"} direction={transitionDirection}>
        <MainMenu onNavigate={navigateTo} />
      </ScreenTransition>

      <ScreenTransition isVisible={currentScreen === "poster"} direction={transitionDirection}>
        <PosterSection onBack={() => navigateTo("menu")} />
      </ScreenTransition>

      <ScreenTransition isVisible={currentScreen === "quiz"} direction={transitionDirection}>
        <QuizSection onBack={() => navigateTo("menu")} score={score} setScore={setScore} />
      </ScreenTransition>

      <ScreenTransition isVisible={currentScreen === "game"} direction={transitionDirection}>
        <GameSection onBack={() => navigateTo("menu")} score={score} setScore={setScore} />
      </ScreenTransition>

      <ScreenTransition isVisible={currentScreen === "instructions"} direction={transitionDirection}>
        <InstructionsSection onBack={() => navigateTo("menu")} />
      </ScreenTransition>
    </div>
  )
}
