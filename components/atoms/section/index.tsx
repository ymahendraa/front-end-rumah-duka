import React from 'react'

type SectionProps = {
    children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const Section: React.FC<SectionProps> = ({
    children,
    ...props
}) => {
    const config = {
        clasName: props.className ?? 'flex flex-col gap-4'
    }
    return (
        <section
            className={config.clasName}
            {...props}
        >
            {children}
        </section>
    )
}

export default Section