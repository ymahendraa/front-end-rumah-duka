import { Bars3Icon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React from 'react'

type ModalSidebarProps = {
  setter: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileSidebar: React.FC<ModalSidebarProps> = ({ setter }) => {
  return (
    <nav className="flex fixed z-20 lg:hidden h-14 bg-white w-screen justify-between items-center p-2">
      {/* BURGER BUTTON */}
      <Bars3Icon
        className="w-8 h-12 text-primary hover:text-primaryDark"
        onClick={() => setter((prev) => !prev)}
      />
      {/* APP NAME */}
      <section>
        <h1 className="text-lg text-primary font-bold text-center">Random</h1>
        <h3 className="text-sm text-slate-800 font-medium">
          Management System
        </h3>
      </section>
      {/* LOGO */}
      <Image src="/logo.png" alt="logo" width={20} height={40} />
    </nav>
  )
}

export default MobileSidebar
