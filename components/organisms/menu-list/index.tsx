import Menu from '@/components/molecules/menu'
import type { MenuType } from '@/utils/menuArray'
import React from 'react'

type MenuListProps = {
    items: MenuType[],
    activeRoute?: string
    toggleActive?: (item: MenuType) => void
    isItemActive: (path: MenuType) => boolean
    setter: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * 
 * @description
 * MenuList: MenuList component for showing menu list 
 * @param items list of menu items
 * @param activeRoute current active route
 * @param toggleActive function for toggle active menu
 * @param isItemActive function for checking if menu is active
 * @param setter function for set sidebar state
 * @returns 
 * MenuList component
 */
const MenuList: React.FC<MenuListProps> = ({
    items,
    activeRoute,
    toggleActive,
    isItemActive,
    setter
}) => {
    return (
        <ul className='flex flex-col gap-1'>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <Menu
                        icon={item.icon}
                        label={item.name}
                        path={item.path}
                        menu={item.children}
                        classNameLink={`flex flex-row justify-between gap-x-2 p-2 rounded-md  transition-colors cursor-pointer ${item?.path === activeRoute
                            ? 'bg-primary '
                            : 'bg-white hover:bg-primaryLight'
                            }`}
                        classNameLabel={`text-sm font-medium ${item?.path === activeRoute
                            ? 'text-white'
                            : 'text-slate-800'
                            } `}
                        classNameIcon={`w-5 h-5  ${item?.path === activeRoute
                            ? 'text-white'
                            : 'text-slate-800'
                            } `}
                        classNameDropdown={`h-5 w-5 transition-transform text-slate-800  ${item?.path === activeRoute || isItemActive(item)
                            ? 'rotate-180'
                            : ''
                            } `}
                        onClick={() =>
                            item.children
                                ? toggleActive?.(item)
                                : setter?.(false)
                            // toggleActive?.(item)
                        }
                    />
                    <div
                        className={`transition-max-height overflow-hidden ${isItemActive(item) || item?.path === activeRoute
                            ? 'max-h-screen duration-500'
                            : 'max-h-0 duration-500'
                            }`}
                    >
                        {item.children && (
                            <MenuList
                                setter={setter}
                                items={item.children}
                                activeRoute={activeRoute}
                                toggleActive={toggleActive}
                                isItemActive={isItemActive}
                            />
                        )}
                    </div>
                </React.Fragment>

            ))}
        </ul>
    )
}

export default MenuList