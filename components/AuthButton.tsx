'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

const AuthButton = () => {
  const { data: session, status } = useSession()
  const isLoggedIn = status === 'authenticated'

  if (!isLoggedIn) {
    return (
      <button
      onClick={() => signIn(undefined, { callbackUrl: '/' })}
        className="px-4 py-1 bg-[#448AC2] text-white rounded hover:bg-[#3571A5]"
      >
        Sign in
      </button>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      <span
        onClick={() => signOut()}
        className=" text-gray-400 hover:underline cursor-pointer"
      >
        Sign out
      </span>
    </div>
  )
  
}

export default AuthButton
