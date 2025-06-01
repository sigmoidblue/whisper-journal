'use client'

import { useState } from 'react'
import axios from 'axios'
import { ReactMediaRecorder } from 'react-media-recorder'
import { useSession } from 'next-auth/react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

interface Entry {
  text: string
  emotions: string[]
  topics: string[]
}

interface Props {
  onSave: (entry: Entry) => void
}

const VoiceRecorder = ({ onSave }: Props) => {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [transcript, setTranscript] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data: session } = useSession()

  const handleUpload = async () => {
    if (!audioBlob || !session?.user?.id) return

    const formData = new FormData()
    formData.append('file', audioBlob, 'recording.webm')

    try {
      setIsSubmitting(true)

      // Step 1: Transcription
      const transcribeRes = await axios.post('http://localhost:8000/transcribe', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      const transcribedText = transcribeRes.data.transcript
      setTranscript(transcribedText)

      // Step 2: NLP Analyze + Save
      const analyzeRes = await axios.post('http://localhost:8000/analyze', {
        text: transcribedText,
        user_id: session.user.id,
      })

      const { emotions, topics } = analyzeRes.data

      // Step 3: Send entry to parent
      onSave({
        text: transcribedText,
        emotions,
        topics,
      })

    } catch (error) {
      console.error('Error during transcription or analysis:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <ReactMediaRecorder
        audio
        blobPropertyBag={{ type: 'audio/webm' }}
        onStop={(_, blob) => setAudioBlob(blob)}
        render={({ status, startRecording, stopRecording }) => (
          <>
            <div className="flex justify-center m-4">
              <button
                onClick={status === 'recording' ? stopRecording : startRecording}
                className={`px-6 py-2 rounded-md font-medium tracking-wide shadow-sm transition-colors duration-200 ${status === 'recording'
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-[#448AC2] text-white hover:bg-[#3571A5]'
                  }`}
              >
                {status === 'recording' ? 'Stop Recording' : 'Start Recording'}
              </button>
            </div>

            {audioBlob && (
              <div className="text-center mb-4">
                <AudioPlayer
                  src={URL.createObjectURL(audioBlob)}
                  autoPlay={false}
                  showJumpControls={false}
                  customAdditionalControls={[]}
                  // customVolumeControls={['volume']}
                />

                <button
                  onClick={handleUpload}
                  disabled={isSubmitting}
                  className="mt-4 bg-[#448AC2] text-white px-6 py-2 shadow-sm rounded-md hover:bg-[#3571A5] transition-colors"
                >
                  {isSubmitting ? 'Processing...' : 'Transcribe & Analyze'}
                </button>
              </div>
            )}

            {transcript && (
              <div className="bg-gray-100 p-4 rounded mt-4">
                <h2 className="font-bold text-black mb-2">Transcribed Entry:</h2>
                <p>{transcript}</p>
              </div>
            )}
          </>
        )}
      />
    </div>
  )
}

export default VoiceRecorder
