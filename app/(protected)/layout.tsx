'use client'
import SidebarModule from '@/components/complex-organisms/sidebar'
// import Sidebar from '@/components/sidebar'
import '../globals.css'
// import MobileSidebar from '@/components/mobile-sidebar'
import { useState } from 'react'
import MobileSidebar from '@/components/complex-organisms/mobile-sidebar'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Mobile sidebar visibility state
    const [showSidebar, setShowSidebar] = useState(false)

    return (
        <>
            <MobileSidebar setter={setShowSidebar} />
            <div className="flex flex-row min-h-screen w-full max-w-screen-2xl">
                <SidebarModule show={showSidebar} setter={setShowSidebar} />
                <div className="w-full pb-8 pt-4 px-4 lg:p-8 mt-14">{children}</div>
            </div>
        </>
    )
}
