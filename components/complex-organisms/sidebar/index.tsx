import React, { useContext, useEffect, useState } from 'react'
// components import
import Image from 'next/image'
import ModalOverlay from '@/components/atoms/modal-overlay'
import Section from '@/components/atoms/section'
import MenuList from '@/components/organisms/menu-list'
import { ArrowLeftCircleIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline'

// hooks import
import { usePathname } from 'next/navigation'

// utils import
import { signOut } from 'next-auth/react'
import { MenuType } from '@/utils/menuArray'
import { AuthorizationContext } from '@/context/AuthorizationContext/context'
import Button from '@/components/atoms/button'
import UserPill from '@/components/molecules/user-pill'
import Divider from '@/components/atoms/divider'


type SidebarProps = {
    show: boolean
    setter: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * @description SidebarModule : SidebarModule component for showing sidebar
 * @param show show state for sidebar
 * @param setter setter function for show state
 * @returns SidebarModule component
 */
const SidebarModule: React.FC<SidebarProps> = ({ show, setter }) => {
    const [activeItems, setActiveItems] = useState<MenuType | null>(null)
    const activeroute = usePathname()

    // declare state for minimizing sidebar
    // initialize state to true if screen is medium
    // const isMediumScreen = () => window.matchMedia('(max-width: 768px)').matches;
    const [minimized, setMinimized] = useState(false);

    // define effect for media query
    useEffect(() => {
        const mediaQueryList = window.matchMedia('(max-width: 768px)');
        const listener = (event: MediaQueryListEvent) => {
            setMinimized(event.matches);
        };

        mediaQueryList.addEventListener('change', listener);
        return () => mediaQueryList.removeEventListener('change', listener);
    }, []);

    // handle minimize state
    const handleMinimized = () => {
        setMinimized(!minimized)
    }

    // const data: TODO = usePermissions()
    const permissions: any = useContext(AuthorizationContext);

    const menu = permissions?.menu ?? []

    // get menu from data
    const MENU_ARRAY = menu ?? []

    /**
     * @description signOutHandler : function to sign out
     * @returns signOutHandler function
     */
    const signOutHandler = async (id: string) => {
        // delete redis value
        // ACTIVATE THIS CODE IF YOU HAVE REDIS
        // await fetch(`/api/redis/${id}`, {
        //     method: 'DELETE'
        // })
        signOut()
    }

    /**
     * @description toggleActiveItem : function to toggle active item
     * @param item 
     */
    const toggleActiveItem = (item: MenuType) => {
        if (minimized) {
            setMinimized(false)
        }
        if (activeItems === item) {
            setActiveItems(null)
        } else {
            setActiveItems(item)
        }
    }
    // get active item
    const isItemActive = (item: MenuType) => activeItems === item

    // define minimized class
    const minimizedClass = minimized ? 'lg:w-[80px]' : 'lg:w-[300px]'

    // Define our base class
    const className =
        `flex flex-col bg-primary ${minimizedClass} ease-in-out duration-500 fixed lg:sticky top-0 bottom-0 left-0 z-40 gap-y-6 shadow-lg px-4 py-4 justify-between h-screen transition-all overflow-hidden scrollbar-hide`

    // Append class based on state of sidebar visiblity
    const appendClass = show ? ' ml-0' : 'ml-[-300px] lg:ml-0'

    // logo size
    const logoSize = minimized ? 20 : 30

    // sign out button class
    const signOutButtonClass = {
        normal: 'flex items-center justify-center bg-primary hover:bg-secondary rounded-md text-xs md:text-sm p-1 w-2/3 self-center text-white gap-x-2 transition-all ease-in-out duration-300 cursor-pointer',
        mini: 'bg-primary hover:bg-secondary rounded-md p-1 w-[30px] self-center text-white transition-all ease-in-out duration-300'
    }

    return (
        <Section className='absolute lg:relative'>
            {/* MINIMIZED BUTTON */}
            <button onClick={handleMinimized} className='flex items-center justify-center md:absolute lg:z-50 lg:-right-5 lg:top-3 w-[30px] h-[30px] shadow-xl rounded-md text-secondary bg-primary-dark'>{minimized ? <ChevronDoubleRightIcon className='w-5 h-5' /> : <ChevronDoubleLeftIcon className='w-5 h-5' />}</button>
            <aside className={`${className} ${appendClass}`}>
                <Section className="flex flex-col gap-y-6">
                    {/* HEADER */}
                    <Section className={`flex flex-row gap-4 items-center ${minimized && 'self-center justify-center'}`}>
                        {/* USER PILL */}
                        <UserPill minimized={minimized} />
                    </Section>

                    <Divider className='w-full self-center' />
                    {/* MENU */}
                    {/* {status === 'loading' ? (
                        <Section className='w-full h-96 flex items-center justify-center'>
                            <LoadingKalla width={20} height={20} />
                        </Section>
                    ) : ( */}
                    <Section className="h-[500px] overflow-y-auto scrollbar-hide">
                        <MenuList
                            minimized={minimized}
                            setter={setter}
                            items={MENU_ARRAY}
                            activeRoute={activeroute}
                            toggleActive={toggleActiveItem}
                            isItemActive={isItemActive}
                        />
                    </Section>
                    {/* )} */}
                </Section>

                <Button onClick={() => signOutHandler(permissions?.id ?? '')} className={minimized ? signOutButtonClass.mini : signOutButtonClass.normal}>
                    {minimized ? <ArrowLeftCircleIcon /> :
                        <>
                            <ArrowLeftCircleIcon className='w-5 h-5 text-white' />
                            <span>Sign Out</span>
                        </>
                    }
                </Button>
            </aside >
            {/* Overlay to prevent clicks in background, also serves as our close button */}
            {show ? <ModalOverlay setter={setter} /> : <></>}
        </Section>

    )
}

export default SidebarModule