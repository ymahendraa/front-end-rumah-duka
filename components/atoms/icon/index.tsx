import React from 'react'

type IconProps = {
    className?: string
    icon: React.ReactNode
}

const Icon: React.FC<IconProps> = ({
    className,
    icon
}) => {
    return (
        <div
            className={className}
        >
            {icon}
        </div>
    )
}

export default Icon