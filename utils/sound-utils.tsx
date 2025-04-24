"use client"

// This is a placeholder until real sound files are available
export const playSound = (soundType: string) => {
  // When sound files are available, uncomment this code
  // const audio = new Audio(`/sounds/${soundType}.mp3`);
  // audio.play();

  console.log(`Playing sound: ${soundType}`)

  // For now, we'll use the Web Audio API to generate simple sounds
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

  switch (soundType) {
    case "click":
      generateClickSound(audioContext)
      break
    case "correct":
      generateCorrectSound(audioContext)
      break
    case "wrong":
      generateWrongSound(audioContext)
      break
    case "complete":
      generateCompleteSound(audioContext)
      break
    case "start":
      generateStartSound(audioContext)
      break
    default:
      generateClickSound(audioContext)
  }
}

// Simple click sound
const generateClickSound = (audioContext: AudioContext) => {
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.type = "sine"
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(500, audioContext.currentTime + 0.1)

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.start()
  oscillator.stop(audioContext.currentTime + 0.1)
}

// Correct answer sound
const generateCorrectSound = (audioContext: AudioContext) => {
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.type = "sine"
  oscillator.frequency.setValueAtTime(500, audioContext.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.15)

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.start()
  oscillator.stop(audioContext.currentTime + 0.3)
}

// Wrong answer sound
const generateWrongSound = (audioContext: AudioContext) => {
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.type = "sawtooth"
  oscillator.frequency.setValueAtTime(300, audioContext.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.2)

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.start()
  oscillator.stop(audioContext.currentTime + 0.2)
}

// Game complete sound
const generateCompleteSound = (audioContext: AudioContext) => {
  const notes = [500, 600, 700, 800, 1000]

  notes.forEach((note, index) => {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.type = "sine"
    oscillator.frequency.value = note

    gainNode.gain.setValueAtTime(0, audioContext.currentTime + index * 0.1)
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + index * 0.1 + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.1 + 0.15)

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.start(audioContext.currentTime + index * 0.1)
    oscillator.stop(audioContext.currentTime + index * 0.1 + 0.15)
  })
}

// Start game sound
const generateStartSound = (audioContext: AudioContext) => {
  const notes = [400, 500, 600, 700]

  notes.forEach((note, index) => {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.type = "sine"
    oscillator.frequency.value = note

    gainNode.gain.setValueAtTime(0, audioContext.currentTime + index * 0.08)
    gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + index * 0.08 + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.08 + 0.1)

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.start(audioContext.currentTime + index * 0.08)
    oscillator.stop(audioContext.currentTime + index * 0.08 + 0.1)
  })
}
