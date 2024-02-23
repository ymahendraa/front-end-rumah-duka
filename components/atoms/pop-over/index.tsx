import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'

type PopOverProps = {
    PopOverButton: React.ReactNode
    PopOverPanel: React.ReactNode,
    PopOverPanelClassName?: string
}

const PopOver: React.FC<PopOverProps> = ({
    PopOverButton,
    PopOverPanel,
    PopOverPanelClassName
}) => {
    const config = {
        PopOverStyle: PopOverPanelClassName ?? "absolute left-full z-50 mt-3 w-screen max-w-sm -translate-x-44 lg:-translate-x-full transform px-4 sm:px-0"
    }
    return (
        // <div className="fixed top-16 w-full max-w-sm px-4">
        <Popover className="relative">
            {({ open }) => (
                <>
                    <div
                        className={`ring-0 focus:ring-0 focus:outline-none
                ${open ? 'text-white' : 'text-white/90'}`}
                    >
                        {PopOverButton}
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className={config.PopOverStyle}>
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                                <div className="relative gap-8 bg-white p-3">
                                    {PopOverPanel}
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
        // </div>
    )
}

export default PopOver
