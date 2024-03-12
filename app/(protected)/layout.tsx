'use client'

// components import
import SidebarModule from '@/components/complex-organisms/sidebar'
import MobileSidebar from '@/components/complex-organisms/mobile-sidebar'
import Section from '@/components/atoms/section'
import Breadcrumbs from '@/components/molecules/breadcrumbs'

// hooks import
import { useState } from 'react'

// styles import
import '../globals.css'

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
            <Section className="flex flex-row min-h-screen w-full max-w-screen-2xl">
                <SidebarModule show={showSidebar} setter={setShowSidebar} />
                {/* <Section className="flex-1"> */}
                <Section className="w-full flex flex-col pb-8 pt-2 px-4 lg:p-8 gap-8">
                    <Breadcrumbs />
                    {children}
                </Section>
                {/* </Section> */}
            </Section>
        </>
    )
}
