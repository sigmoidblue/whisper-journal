'use client'

import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { useSession } from 'next-auth/react'
import EntryList from '@/components/EntryList'
import { motion } from 'framer-motion'

type Entry = {
  id: number
  text: string
  emotions: string[]
  topics: string[]
  created_at: string
}

export default function EntriesPage() {
  const [entries, setEntries] = useState<Entry[]>([])
  const { data: session, status } = useSession()
  const router = useRouter()

  const goHome = () => {
    router.push("/")
  }

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`http://localhost:8000/entries/${session.user.id}`)
        .then(res => res.json())
        .then(data => setEntries(data))
        .catch(err => console.error('Failed to fetch entries:', err))
    }
  }, [session])

  if (status === 'loading') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-main-grad">
        <p className="text-[#4D4C4E] font-spectral text-xl">Checking session...</p>
      </main>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-main-grad">
        <p className="text-[#4D4C4E] font-spectral text-xl">Please sign in to view your entries.</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-main-grad flex flex-col items-center p-6 space-y-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl font-spectral text-[#4D4C4E] m-6 pt-16">
        Your Journal Entries
      </motion.h1>

      {entries.length === 0 ? (
        <p className="text-[#4D4C4E]">No entries saved yet. Start recording your thoughts!</p>
      ) : (
        <EntryList entries={entries} />
      )}

      <button
        type='button'
        onClick={goHome}
        className="mt-6 px-4 py-2 bg-[#4D4C4E] text-white rounded hover:bg-gray-800"
      >
        Back to Home
      </button>
    </main>
  )
}
