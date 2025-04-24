"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { useEffect, useState, useRef } from "react"

interface ChalkboardBackgroundProps {
  children: ReactNode
}

export default function ChalkboardBackground({ children }: ChalkboardBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Track mouse position for interactive animations
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Chalk dust particles with client-side only positioning
  const dustParticles = useRef<Array<{ left: string; delay: number }>>([])

  // Initialize dust particles only on client side
  useEffect(() => {
    dustParticles.current = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
    }))
    // Force a re-render
    setMousePosition((prev) => ({ ...prev }))
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Chalkboard background */}
      <div className="absolute inset-0 bg-green-900 border-8 border-brown-600 rounded-lg m-4 shadow-2xl">
        <div className="absolute inset-0 bg-opacity-10 bg-white bg-[radial-gradient(white,_transparent_1px)] bg-[size:15px_15px]"></div>

        {/* Animated chalk drawings */}
        <motion.div
          className="absolute top-6 left-6 text-white text-opacity-20 text-6xl font-comic"
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.02, 1],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 5,
            ease: "easeInOut",
          }}
        >
          A B C
        </motion.div>

        <motion.div
          className="absolute bottom-6 right-6 text-white text-opacity-20 text-6xl font-comic"
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.02, 1],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 4,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          1 2 3
        </motion.div>

        {/* Interactive chalk circle that follows mouse */}
        <motion.div
          className="absolute w-40 h-40 rounded-full border-2 border-white border-opacity-5 pointer-events-none"
          animate={{
            x: mousePosition.x - 80,
            y: mousePosition.y - 80,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200,
            mass: 0.5,
          }}
        />

        {/* Chalk dust particles */}
        {dustParticles.current.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white bg-opacity-70"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0,
            }}
            animate={{
              y: [null, 500 + Math.random() * 300],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
            }}
            style={{
              left: particle.left,
              top: `-10px`,
            }}
          />
        ))}

        {/* Floating chalk elements */}
        <motion.div
          className="absolute w-16 h-3 bg-white bg-opacity-20 rounded-full"
          initial={{ x: "10%", y: "20%" }}
          animate={{
            x: ["10%", "15%", "10%"],
            y: ["20%", "25%", "20%"],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute w-12 h-12 border-2 border-white border-opacity-10 rounded-full"
          initial={{ x: "80%", y: "30%" }}
          animate={{
            x: ["80%", "75%", "80%"],
            y: ["30%", "35%", "30%"],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute w-20 h-2 bg-white bg-opacity-15 rounded-full"
          initial={{ x: "60%", y: "70%" }}
          animate={{
            x: ["60%", "65%", "60%"],
            y: ["70%", "75%", "70%"],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 9,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Animated doodles */}
        <svg className="absolute top-1/4 left-10 w-24 h-24 text-white opacity-10" viewBox="0 0 100 100">
          <motion.path
            d="M20,50 Q50,20 80,50 Q50,80 20,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </svg>

        <svg className="absolute bottom-1/4 right-10 w-24 h-24 text-white opacity-10" viewBox="0 0 100 100">
          <motion.path
            d="M30,30 L70,30 L70,70 L30,70 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
