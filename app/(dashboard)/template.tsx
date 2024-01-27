"use client"

import React from 'react'
import { motion } from 'framer-motion'

export default function Template({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
    initial={{ x: "20%", opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: "-20%", opacity: 0, transition: { duration: 0.2 } }}
    transition={{ duration: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
