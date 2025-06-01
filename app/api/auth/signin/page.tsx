'use client'

import { signIn } from 'next-auth/react'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-main-grad flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-spectral font-medium text-[#4D4C4E] py-6">
        Sign In to Whisper Journal
      </h1>
      <button
        onClick={() => signIn('google', { callbackUrl: '/' })}
        className="bg-[#448AC2] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#3571A5]transition"
      >
        Sign in with Google
      </button>
    </div>
  )
}
