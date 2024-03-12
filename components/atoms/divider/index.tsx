import React from 'react'

type DividerProps = {
    className?: string
} & React.HTMLAttributes<HTMLDivElement>

/**
 * @description Divider : Divider component for dividing components
 * @param className className for divider
 * @returns Divider component
 */

const Divider: React.FC<DividerProps> = ({
    className,
}) => {
    const config = {
        className: `h-px bg-white ${className}`
    }
    return (
        <div className={config.className} />
    )
}

export default Divider