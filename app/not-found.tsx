'use client'
import Image from 'next/image'
import React from 'react'

import Img from '../public/not-found.svg'
import { useRouter } from 'next/navigation'

const NotFound = () => {
  const router = useRouter()

  const handleGoBack = () => {
    router.back() // This will navigate to the previous page in the browser history
  }
  return (
    <section className="bg-white flex flex-col items-center justify-center w-full h-screen gap-10">
      <h1 className="text-black text-3xl font-bold">Page Not Found</h1>
      <Image
        src={Img}
        alt="not-found"
        width={300}
        height={300}
        className="w-[200px] lg:w-[400px]"
      />
      <button
        className="bg-green-600 hover:bg-green-700 text-white text-2xl py-3 px-10 rounded-full font-medium"
        onClick={handleGoBack}
      >
        Go Back
      </button>
    </section>
  )
}

export default NotFound
