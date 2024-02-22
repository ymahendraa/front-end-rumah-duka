import React, { useContext, useState } from 'react'
// components import
import Image from 'next/image'
import ModalOverlay from '@/components/atoms/modal-overlay'
import MenuList from '@/components/organisms/menu-list'

// hooks import
import { usePathname } from 'next/navigation'

// utils import
import { signOut, useSession } from 'next-auth/react'
import { MenuType } from '@/utils/menu-array'
import { AuthorizationContext } from '@/context/AuthorizationContext/context'
import LoadingKalla from '@/components/atoms/loading'
import Section from '@/components/atoms/section'
import useSWR from 'swr'
import useFetcher from '@/hooks/useFetcher'


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

    // define menu list from context
    // const { data } = useContext(AuthorizationContext)

    // define menu from session data
    const { data: session, status } = useSession()
    // const menu = session?.user.authorization.menu

    const fetcher = useFetcher(session)
    const { data, isLoading } = useSWR(session ? 'http://localhost:3000/api/authorization' : null,
        fetcher)

    const menu = data?.menu

    // get menu from data
    const MENU_ARRAY = menu ?? []

    /**
     * @description toggleActiveItem : function to toggle active item
     * @param item 
     */
    const toggleActiveItem = (item: MenuType) => {
        if (activeItems === item) {
            setActiveItems(null)
        } else {
            setActiveItems(item)
        }
    }
    // get active item
    const isItemActive = (item: MenuType) => activeItems === item

    // Define our base class
    const className =
        'flex flex-col bg-white w-[300px] lg:w-[400px] transition-[margin-left] ease-in-out duration-500 fixed lg:sticky top-0 bottom-0 left-0 z-40 gap-y-6 shadow-lg px-4 py-4 justify-between h-screen'

    // Append class based on state of sidebar visiblity
    const appendClass = show ? ' ml-0' : 'ml-[-300px] lg:ml-0'

    return (
        <>
            <aside className={`${className} ${appendClass}`}>
                <div className="flex flex-col gap-y-6">
                    {/* HEADER */}
                    <div className={`flex flex-row gap-4 items-center`}>
                        {/* LOGO */}
                        <Image src="/logo.png" alt="logo" width={30} height={60} />
                        {/* APP NAME */}
                        <section>
                            <h1 className="text-lg text-primary font-bold">Random</h1>
                            <h3 className="text-xs text-slate-800 font-medium">
                                Management System
                            </h3>
                        </section>
                    </div>

                    {/* MENU */}
                    {status === 'loading' || isLoading ? (
                        <Section className='w-full h-96 flex items-center justify-center'>
                            <LoadingKalla width={20} height={20} />
                        </Section>
                    ) : (
                        <div className="h-[500px] overflow-y-auto scrollbar-hide">
                            <MenuList
                                setter={setter}
                                items={MENU_ARRAY}
                                activeRoute={activeroute}
                                toggleActive={toggleActiveItem}
                                isItemActive={isItemActive}
                            />
                        </div>
                    )}
                </div>

                <button onClick={() => signOut()} className='bg-primary hover:bg-primaryDark rounded-md text-sm p-1 w-1/3 self-center text-white'>
                    Sign out
                </button>
                {/* USER INFO */}
                {/* <div>
          <Pill
          name={session?.firstName}
          role={session?.role}
          menuList={menuList}
          />
        </div> */}
            </aside>
            {/* Overlay to prevent clicks in background, also serves as our close button */}
            {show ? <ModalOverlay setter={setter} /> : <></>}
        </>

    )
}

export default SidebarModule