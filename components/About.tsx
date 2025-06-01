'use client'

import { motion } from 'framer-motion'

const aboutSections = [
  {
    title: 'What This Version Offers',
    items: [
      { heading: 'Voice-to-Text Journaling', text: 'Speak your thoughts, and see them come to life on the screen.' },
      { heading: 'Emotion & Topic Insights', text: 'Your words are gently analyzed to reflect your inner landscape.' },
      { heading: 'Time Capsules', text: 'Every entry is saved with the date and time for gentle reflection.' },
      { heading: 'Private by Design', text: 'Your entries are saved securely, accessible only to you.' }
    ]
  },
  {
    title: 'Why Voice Journaling?',
    items: [
      { heading: 'Easier than typing', text: 'Speak your thoughts naturally, without worrying about typing speed or spelling.' },
      { heading: 'Reflect on emotions faster', text: 'Let your feelings flow through your voice — and understand your emotions deeply with insights.' },
      { heading: 'Mindful Habit-Building', text: 'Simple voice journaling builds a daily reflection habit and fuels personal growth.' },
      { heading: 'More Natural Expression', text: 'Voice captures tone, pauses, and nuances that text often loses — making entries feel more authentic.' },
    ]
  },
  {
    title: 'What’s Coming Next?',
    items: [
      { heading: 'Mood Picker', text: 'Manually choose your mood to tag entries with your emotional state.' },
      { heading: 'Search & Filter', text: 'Quickly search entries by date, topic, or emotion.' },
      { heading: 'Export Journal', text: 'Download your entries as a personal archive or printable journal.' },
      { heading: 'Mobile App', text: 'A native app experience for smoother on-the-go journaling.' }
    ]
  }
]

export default function About() {
  return (
    <section id="about" className="py-20 px-4 text-[#4D4C4E] font-spectral scroll-mt-20">
      <div className="max-w-6xl mx-auto space-y-16">
        {aboutSections.map(section => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl text-center font-semibold">{section.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="backdrop-blur-sm bg-white/40 shadow-md p-6 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-[1.03] hover:shadow-xl"
                >
                  <h3 className="text-lg font-semibold mb-1">{item.heading}</h3>
                  <p className="text-sm text-[#4D4C4E]">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
