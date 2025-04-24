"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { ReactNode } from "react"

interface ScreenTransitionProps {
  children: ReactNode
  isVisible: boolean
  direction?: "left" | "right" | "up" | "down"
}

export default function ScreenTransition({ children, isVisible, direction = "right" }: ScreenTransitionProps) {
  const variants = {
    initial: {
      opacity: 0,
      x: direction === "right" ? 300 : direction === "left" ? -300 : 0,
      y: direction === "down" ? 300 : direction === "up" ? -300 : 0,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      x: direction === "right" ? -300 : direction === "left" ? 300 : 0,
      y: direction === "down" ? -300 : direction === "up" ? 300 : 0,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  }

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div initial="initial" animate="animate" exit="exit" variants={variants} className="absolute inset-0">
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
