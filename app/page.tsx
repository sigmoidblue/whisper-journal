'use client'

import dynamic from 'next/dynamic'
import About from '../components/About'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import { motion } from 'framer-motion'

const VoiceRecorder = dynamic(() => import('../components/VoiceRecorder'), {
  ssr: false,
})

type Entry = {
  text: string
  emotions: string[]
  topics: string[]
}

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([])
  const router = useRouter()
  const { data: session, status } = useSession()
  const isLoggedIn = status === 'authenticated'

  if (status === 'loading') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">Checking your session...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 items-center p-6 space-y-12 bg-main-grad scroll-smooth">

      {/* Hero Section */}
      <section className="text-center space-y-4">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl font-spectral font-medium text-[#4D4C4E] p-[75px] mt-[75px]">
          Your words. Your voice. Your space.
        </motion.p>

        {session?.user?.name && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-3xl font-spectral font-medium text-[#4D4C4E] tracking-wide p-10">
            Welcome, {session.user.name}!
          </motion.p>
        )}

        <VoiceRecorder onSave={handleSaveEntry} />

        {entries.length > 0 && (
          <section className="max-w-xl mx-auto mt-8 space-y-4">
            <h2 className="text-2xl text-black font-semibold mb-2 text-center">Latest Entries</h2>
            {entries.map((entry, idx) => (
              <div className="bg-white/30 backdrop-blur-sm rounded-lg px-6 py-4 shadow-sm border border-white/20">
                <p className="text-gray-800 italic font-serif mb-2">"{entry.text}"</p>
                <div className="text-sm text-gray-600">
                  <span className="block"><strong>Emotions:</strong> {entry.emotions.join(', ')}</span>
                  <span className="block"><strong>Topics:</strong> {entry.topics.join(', ')}</span>
                </div>
              </div>
            ))}
          </section>
        )}
      </section>

      <div className="text-center">
        {isLoggedIn ? (
          <button
            onClick={() => router.push('/entries')}
            className="px-5 py-2 bg-[#4D4C4E]  text-white rounded-md hover:bg-gray-900 transition duration-200">
            View My Entries
          </button>
        ) : (
          <button
            onClick={() => signIn()}
            className="px-4 py-2 bg-black text-white items-center rounded hover:bg-gray-800"
          >
            Sign In to View My Entries
          </button>
        )}
      </div>

      <About />

      <footer className="mt-10 text-lg font-spectral text-[#4D4C4E] text-center">
        Made with love for your quiet moments :)
      </footer>
    </main>
  )

  function handleSaveEntry(newEntry: Entry) {
    setEntries(prev => [newEntry, ...prev])
  }
}
