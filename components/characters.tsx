"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface CharacterProps {
  type: "teacher" | "boy" | "girl" | "group"
  className?: string
  animation?: "idle" | "talking" | "excited" | "thinking"
  size?: "sm" | "md" | "lg"
}

export default function Character({ type, className = "", animation = "idle", size = "md" }: CharacterProps) {
  const [animationState, setAnimationState] = useState(animation)

  // Update animation when prop changes
  useEffect(() => {
    setAnimationState(animation)
  }, [animation])

  const sizeClass = {
    sm: "w-20 h-20",
    md: "w-32 h-32",
    lg: "w-48 h-48",
  }[size]

  return (
    <motion.div
      className={`${sizeClass} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {type === "teacher" && <TeacherCharacter animation={animationState} />}
      {type === "boy" && <BoyCharacter animation={animationState} />}
      {type === "girl" && <GirlCharacter animation={animationState} />}
      {type === "group" && <GroupCharacter animation={animationState} />}
    </motion.div>
  )
}

function TeacherCharacter({ animation }: { animation: string }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Head */}
      <motion.circle
        cx="50"
        cy="30"
        r="20"
        fill="#FFD8B4"
        stroke="#000"
        strokeWidth="1.5"
        animate={
          animation === "talking"
            ? { scale: [1, 1.02, 1], y: [0, -1, 0] }
            : animation === "excited"
              ? { rotate: [-2, 2, -2] }
              : {}
        }
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: animation === "talking" ? 0.5 : 1 }}
      />

      {/* Hair */}
      <path
        d="M30,25 Q40,10 50,15 Q60,10 70,25 Q70,10 50,5 Q30,10 30,25 Z"
        fill="#663300"
        stroke="#000"
        strokeWidth="1"
      />

      {/* Eyes */}
      <motion.g
        animate={animation === "thinking" ? { y: [0, -2, 0] } : animation === "excited" ? { scale: [1, 1.2, 1] } : {}}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      >
        <circle cx="40" cy="25" r="3" fill="#000" />
        <circle cx="60" cy="25" r="3" fill="#000" />
      </motion.g>

      {/* Glasses */}
      <circle cx="40" cy="25" r="6" fill="none" stroke="#000" strokeWidth="1.5" />
      <circle cx="60" cy="25" r="6" fill="none" stroke="#000" strokeWidth="1.5" />
      <line x1="46" y1="25" x2="54" y2="25" stroke="#000" strokeWidth="1.5" />

      {/* Mouth */}
      <motion.path
        d="M40,40 Q50,45 60,40"
        fill="none"
        stroke="#000"
        strokeWidth="1.5"
        animate={
          animation === "talking"
            ? { d: ["M40,40 Q50,45 60,40", "M40,42 Q50,48 60,42", "M40,40 Q50,45 60,40"] }
            : animation === "excited"
              ? { d: ["M40,40 Q50,48 60,40", "M40,42 Q50,50 60,42", "M40,40 Q50,48 60,40"] }
              : {}
        }
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5 }}
      />

      {/* Body */}
      <motion.path
        d="M30,50 L30,90 L70,90 L70,50 Q60,55 50,50 Q40,55 30,50 Z"
        fill="#4A90E2"
        stroke="#000"
        strokeWidth="1.5"
        animate={
          animation === "talking" || animation === "excited"
            ? { y: [0, -1, 0] }
            : animation === "thinking"
              ? { rotate: [-1, 1, -1], transformOrigin: "center center" }
              : {}
        }
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      />

      {/* Arms */}
      <motion.g
        animate={
          animation === "excited"
            ? { rotate: [-5, 5, -5], transformOrigin: "center center" }
            : animation === "thinking"
              ? { rotate: [0, 5, 0], transformOrigin: "right center" }
              : {}
        }
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
      >
        <path d="M30,55 L15,70" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        <path d="M70,55 L85,70" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      </motion.g>
    </svg>
  )
}

function BoyCharacter({ animation }: { animation: string }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Head */}
      <motion.circle
        cx="50"
        cy="30"
        r="20"
        fill="#FFD8B4"
        stroke="#000"
        strokeWidth="1.5"
        animate={
          animation === "talking"
            ? { scale: [1, 1.02, 1], y: [0, -1, 0] }
            : animation === "excited"
              ? { rotate: [-2, 2, -2] }
              : {}
        }
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: animation === "talking" ? 0.5 : 1 }}
      />

      {/* Hair */}
      <path d="M30,20 Q40,10 50,15 Q60,10 70,20 L70,30 L30,30 Z" fill="#000000" stroke="#000" strokeWidth="1" />

      {/* Eyes */}
      <motion.g
        animate={animation === "thinking" ? { y: [0, -2, 0] } : animation === "excited" ? { scale: [1, 1.2, 1] } : {}}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      >
        <circle cx="40" cy="25" r="3" fill="#000" />
        <circle cx="60" cy="25" r="3" fill="#000" />
      </motion.g>

      {/* Mouth */}
      <motion.path
        d="M40,40 Q50,45 60,40"
        fill="none"
        stroke="#000"
        strokeWidth="1.5"
        animate={
          animation === "talking"
            ? { d: ["M40,40 Q50,45 60,40", "M40,42 Q50,48 60,42", "M40,40 Q50,45 60,40"] }
            : animation === "excited"
              ? { d: ["M40,40 Q50,48 60,40", "M40,42 Q50,50 60,42", "M40,40 Q50,48 60,40"] }
              : {}
        }
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5 }}
      />

      {/* Body */}
      <motion.path
        d="M30,50 L30,90 L70,90 L70,50 Q60,55 50,50 Q40,55 30,50 Z"
        fill="#FF5252"
        stroke="#000"
        strokeWidth="1.5"
        animate={
          animation === "talking" || animation === "excited"
            ? { y: [0, -1, 0] }
            : animation === "thinking"
              ? { rotate: [-1, 1, -1], transformOrigin: "center center" }
              : {}
        }
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      />

      {/* Arms */}
      <motion.g
        animate={
          animation === "excited"
            ? { rotate: [-10, 10, -10], transformOrigin: "center center" }
            : animation === "thinking"
              ? { rotate: [0, 10, 0], transformOrigin: "right center" }
              : {}
        }
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
      >
        <path d="M30,55 L15,70" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        <path d="M70,55 L85,70" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      </motion.g>
    </svg>
  )
}

function GirlCharacter({ animation }: { animation: string }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Head */}
      <motion.circle
        cx="50"
        cy="30"
        r="20"
        fill="#FFD8B4"
        stroke="#000"
        strokeWidth="1.5"
        animate={
          animation === "talking"
            ? { scale: [1, 1.02, 1], y: [0, -1, 0] }
            : animation === "excited"
              ? { rotate: [-2, 2, -2] }
              : {}
        }
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: animation === "talking" ? 0.5 : 1 }}
      />

      {/* Hair */}
      <path
        d="M30,30 Q30,10 50,10 Q70,10 70,30 Q70,40 50,45 Q30,40 30,30 Z"
        fill="#8B4513"
        stroke="#000"
        strokeWidth="1"
      />

      {/* Hair Ties */}
      <circle cx="30" cy="25" r="5" fill="#FF69B4" stroke="#000" strokeWidth="1" />
      <circle cx="70" cy="25" r="5" fill="#FF69B4" stroke="#000" strokeWidth="1" />

      {/* Eyes */}
      <motion.g
        animate={animation === "thinking" ? { y: [0, -2, 0] } : animation === "excited" ? { scale: [1, 1.2, 1] } : {}}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      >
        <circle cx="40" cy="25" r="3" fill="#000" />
        <circle cx="60" cy="25" r="3" fill="#000" />
      </motion.g>

      {/* Mouth */}
      <motion.path
        d="M40,40 Q50,45 60,40"
        fill="none"
        stroke="#000"
        strokeWidth="1.5"
        animate={
          animation === "talking"
            ? { d: ["M40,40 Q50,45 60,40", "M40,42 Q50,48 60,42", "M40,40 Q50,45 60,40"] }
            : animation === "excited"
              ? { d: ["M40,40 Q50,48 60,40", "M40,42 Q50,50 60,42", "M40,40 Q50,48 60,40"] }
              : {}
        }
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5 }}
      />

      {/* Body */}
      <motion.path
        d="M30,50 L30,90 L70,90 L70,50 Q60,55 50,50 Q40,55 30,50 Z"
        fill="#9C27B0"
        stroke="#000"
        strokeWidth="1.5"
        animate={
          animation === "talking" || animation === "excited"
            ? { y: [0, -1, 0] }
            : animation === "thinking"
              ? { rotate: [-1, 1, -1], transformOrigin: "center center" }
              : {}
        }
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      />

      {/* Arms */}
      <motion.g
        animate={
          animation === "excited"
            ? { rotate: [-10, 10, -10], transformOrigin: "center center" }
            : animation === "thinking"
              ? { rotate: [0, 10, 0], transformOrigin: "right center" }
              : {}
        }
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
      >
        <path d="M30,55 L15,70" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        <path d="M70,55 L85,70" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      </motion.g>
    </svg>
  )
}

function GroupCharacter({ animation }: { animation: string }) {
  return (
    <svg viewBox="0 0 150 100" className="w-full h-full">
      {/* First Child (Boy) - Positioned left */}
      <motion.g
        animate={
          animation === "excited" ? { x: [-2, 2, -2], y: [0, -2, 0] } : animation === "talking" ? { y: [0, -1, 0] } : {}
        }
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
      >
        {/* Head */}
        <circle cx="30" cy="30" r="15" fill="#FFD8B4" stroke="#000" strokeWidth="1.5" />

        {/* Hair */}
        <path d="M15,25 Q25,15 30,18 Q35,15 45,25 L45,30 L15,30 Z" fill="#000000" />

        {/* Eyes */}
        <circle cx="25" cy="25" r="2" fill="#000" />
        <circle cx="35" cy="25" r="2" fill="#000" />

        {/* Mouth */}
        <motion.path
          d="M25,35 Q30,38 35,35"
          fill="none"
          stroke="#000"
          strokeWidth="1"
          animate={
            animation === "talking" ? { d: ["M25,35 Q30,38 35,35", "M25,36 Q30,40 35,36", "M25,35 Q30,38 35,35"] } : {}
          }
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5 }}
        />

        {/* Body */}
        <path d="M20,45 L20,75 L40,75 L40,45 Z" fill="#4CAF50" stroke="#000" strokeWidth="1.5" />
      </motion.g>

      {/* Second Child (Girl) - Positioned center */}
      <motion.g
        animate={
          animation === "excited" ? { x: [0, 2, 0], y: [0, -3, 0] } : animation === "talking" ? { y: [0, -1.5, 0] } : {}
        }
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.2, delay: 0.1 }}
      >
        {/* Head */}
        <circle cx="75" cy="25" r="15" fill="#FFD8B4" stroke="#000" strokeWidth="1.5" />

        {/* Hair */}
        <path d="M60,25 Q60,10 75,10 Q90,10 90,25 Q90,35 75,38 Q60,35 60,25 Z" fill="#8B4513" />

        {/* Hair Ties */}
        <circle cx="60" cy="20" r="4" fill="#FF69B4" />
        <circle cx="90" cy="20" r="4" fill="#FF69B4" />

        {/* Eyes */}
        <circle cx="70" cy="22" r="2" fill="#000" />
        <circle cx="80" cy="22" r="2" fill="#000" />

        {/* Mouth */}
        <motion.path
          d="M70,32 Q75,35 80,32"
          fill="none"
          stroke="#000"
          strokeWidth="1"
          animate={
            animation === "talking" ? { d: ["M70,32 Q75,35 80,32", "M70,33 Q75,37 80,33", "M70,32 Q75,35 80,32"] } : {}
          }
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5 }}
        />

        {/* Body */}
        <path d="M65,40 L65,70 L85,70 L85,40 Z" fill="#9C27B0" stroke="#000" strokeWidth="1.5" />
      </motion.g>

      {/* Third Child (Boy) - Positioned right */}
      <motion.g
        animate={
          animation === "excited" ? { x: [2, -2, 2], y: [0, -2, 0] } : animation === "talking" ? { y: [0, -1, 0] } : {}
        }
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.9, delay: 0.2 }}
      >
        {/* Head */}
        <circle cx="120" cy="30" r="15" fill="#FFD8B4" stroke="#000" strokeWidth="1.5" />

        {/* Hair */}
        <path d="M105,25 Q115,15 120,18 Q125,15 135,25 L135,30 L105,30 Z" fill="#663300" />

        {/* Eyes */}
        <circle cx="115" cy="25" r="2" fill="#000" />
        <circle cx="125" cy="25" r="2" fill="#000" />

        {/* Mouth */}
        <motion.path
          d="M115,35 Q120,38 125,35"
          fill="none"
          stroke="#000"
          strokeWidth="1"
          animate={
            animation === "talking"
              ? { d: ["M115,35 Q120,38 125,35", "M115,36 Q120,40 125,36", "M115,35 Q120,38 125,35"] }
              : {}
          }
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5 }}
        />

        {/* Body */}
        <path d="M110,45 L110,75 L130,75 L130,45 Z" fill="#FF5722" stroke="#000" strokeWidth="1.5" />
      </motion.g>
    </svg>
  )
}
