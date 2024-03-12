import Section from '@/components/atoms/section'
import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React from 'react'

type ModalSidebarProps = {
  setter: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileSidebar: React.FC<ModalSidebarProps> = ({ setter }) => {
  return (
    <nav className="flex fixed z-20 lg:hidden h-14 bg-primary w-screen justify-between items-center p-2">
      {/* BURGER BUTTON */}
      <Bars3Icon
        className="w-8 h-12 text-white hover:text-primaryDark"
        onClick={() => setter((prev) => !prev)}
      />
      {/* APP NAME */}
      <Section className='flex flex-col'>
        <h1 className="text-lg text-white font-bold text-center">Random</h1>
        <h3 className="text-sm text-white font-medium">
          Management System
        </h3>
      </Section>
      {/* LOGO */}
      {/* <Image src="/logo.png" alt="logo" width={20} height={40} /> */}
      <UserCircleIcon className="w-8 h-12 text-white hover:text-primaryDark" />
    </nav>
  )
}

export default MobileSidebar
