'use client'
import React from 'react'

import Section from '@/components/atoms/section'
import formatCurrentPath from '@/utils/formatCurrentPath'
import { usePathname } from 'next/navigation'

const Breadcrumbs = () => {
    const path = usePathname() // get the current route path
    const formattedPath = formatCurrentPath(path) // format the current path

    return (
        <Section className="flex bg-primary rounded-xl items-center gap-x-2 h-14 p-4">
            <p className="text-white text-md">{formattedPath}</p>
        </Section>
    )
}

export default Breadcrumbs