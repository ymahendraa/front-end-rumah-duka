'use client'
import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

const Home: React.FC = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center bg-white">
            <main className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center py-12">
                    <Image src="/logo.png" alt="Logo" width={72} height={72} />
                </div>
                <h1 className="text-xl md:text-3xl font-bold text-center text-gray-900">
                    Welcome to Random Management System
                </h1>
                <p className="mt-4 text-sm md:text-lg text-center text-gray-600">
                    This is a base application build with NextJS for Random Management System
                </p>
            </main>
        </div>
    )
}

export default Home
