import Icon from '@/components/atoms/icon'
import { ICON } from '@/utils/icon'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

type Menu = {
    icon?: React.ReactNode
    path?: string
    label?: string
}

type MenuProps = {
    classNameLink?: string
    classNameIcon?: string
    classNameLabel?: string
    classNameDropdown?: string
    icon?: string
    path?: string
    label?: string
    onClick?: () => void
    menu?: Array<Menu>
    minimized?: boolean
}

const Menu: React.FC<MenuProps> = ({
    classNameLink,
    classNameIcon,
    classNameLabel,
    classNameDropdown,
    icon,
    path,
    label,
    menu,
    onClick,
    ...props
}) => {
    const handleClick = (event: React.MouseEvent) => {
        if (path === '#') {
            event.preventDefault();
        }

        if (onClick) {
            onClick();
        }
    };
    return (
        <Link href={path ?? '#'} className={classNameLink} onClick={handleClick}>
            <div className={`flex flex-row w-full gap-x-3 ${props.minimized && 'justify-center '}`}>
                {icon && (
                    <Icon
                        className={classNameIcon}
                        icon={ICON[icon as keyof typeof ICON]}
                    />
                )}
                {!props.minimized && (
                    <p
                        className={classNameLabel}
                    >
                        {label}
                    </p>
                )}
            </div>
            {menu && !props.minimized && (
                <ChevronDownIcon className={classNameDropdown} />
            )}
        </Link>
    )
}

export default Menu