'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import emotionColors from './emotionColors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

type Entry = {
  id?: number
  text: string
  emotions: string[]
  topics: string[]
  created_at: string
}

interface Props {
  entries: Entry[]
}

const EntryList = ({ entries: initialEntries }: Props) => {
  const [entries, setEntries] = useState<Entry[]>(initialEntries)

  const handleDelete = async (entryId: number | undefined, index: number) => {
    if (!entryId) return

    try {
      await axios.delete(`http://localhost:8000/entries/${entryId}`)

      const updatedEntries = entries.filter((_, idx) => idx !== index)
      setEntries(updatedEntries)
      localStorage.setItem('journal_entries', JSON.stringify(updatedEntries))
    } catch (error) {
      console.error("Error deleting entry:", error)
    }
  }

  if (entries.length === 0) return null

  return (
    <div className="max-w-xl mx-auto p-6 mt-6 rounded-xl shadow">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl text-[#4D4C4E] text-center font-spectral font-medium mb-4"
      >
        Saved Entries
      </motion.h2>

      <ul className="space-y-4">
        <AnimatePresence>
          {entries.map((entry, idx) => {
            const primaryEmotion = entry.emotions?.[0]?.toLowerCase()
            const backgroundColor = emotionColors[primaryEmotion] || '#f3f4f6'

            return (
              <motion.li
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
                className="relative group text-gray font-spectral p-4 rounded-lg shadow transition-colors duration-300"
                style={{ backgroundColor }}
              >
                <button
                  onClick={() => handleDelete(entry.id, idx)}
                  className="absolute top-2 right-2 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-red-600"
                  aria-label="Delete Entry"
                >
                  <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                </button>
                <p className="text-sm text-gray-700 mb-1">
                  {new Date(entry.created_at).toLocaleString('en-US', {
                    dateStyle: 'long',
                    timeStyle: 'short',
                  })}
                </p>

                <p className="mb-2 text-[#4D4C4E]">{entry.text}</p>
                <div className="text-sm text-[#4D4C4E]">
                  <span className="font-medium">Emotions:</span> {entry.emotions.join(', ')}
                  <br />
                  <span className="font-medium">Topics:</span> {entry.topics.join(', ')}
                </div>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ul>
    </div>
  )
}

export default EntryList