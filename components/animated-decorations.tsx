"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

export function FloatingIcon({
  children,
  delay = 0,
  duration = 3,
}: { children: ReactNode; delay?: number; duration?: number }) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, 0],
      }}
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        duration,
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

export function PulsingIcon({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        duration: 2,
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

export function SpinningIcon({
  children,
  delay = 0,
  duration = 10,
}: { children: ReactNode; delay?: number; duration?: number }) {
  return (
    <motion.div
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        duration,
        delay,
        ease: "linear",
      }}
    >
      {children}
    </motion.div>
  )
}

export function ChalkDoodle({ className = "" }: { className?: string }) {
  return (
    <svg className={`w-24 h-24 text-white opacity-10 ${className}`} viewBox="0 0 100 100">
      <motion.path
        d="M20,50 Q35,20 50,50 Q65,80 80,50"
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
        }}
      />
    </svg>
  )
}

export function ChalkCircle({ className = "" }: { className?: string }) {
  return (
    <svg className={`w-20 h-20 text-white opacity-10 ${className}`} viewBox="0 0 100 100">
      <motion.circle
        cx="50"
        cy="50"
        r="40"
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
        }}
      />
    </svg>
  )
}

export function ChalkStar({ className = "" }: { className?: string }) {
  return (
    <svg className={`w-24 h-24 text-white opacity-10 ${className}`} viewBox="0 0 100 100">
      <motion.path
        d="M50,10 L61,40 L94,40 L67,60 L78,90 L50,70 L22,90 L33,60 L6,40 L39,40 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </svg>
  )
}
