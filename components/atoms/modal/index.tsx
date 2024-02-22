import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

type ModalProps = {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    dialogTitle?: string
    dialogDescription?: string
    dialogContent?: string | React.ReactNode
    className?: string
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    setIsOpen,
    dialogTitle,
    dialogDescription,
    dialogContent,
    className
}) => {
    return (
        <Transition
            show={isOpen}
            appear
            as={Fragment}
        >
            <Dialog
                onClose={() => setIsOpen(false)}
                className="relative z-50"
                as='div'
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    {/* The backdrop, rendered as a fixed sibling to the panel container */}
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                {/* Full-screen scrollable container */}
                <div className="fixed inset-0 w-screen overflow-y-auto">
                    {/* Container to center the panel */}
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            {/* The actual dialog panel  */}
                            <Dialog.Panel className={`flex flex-col gap-2 mx-auto rounded-lg bg-white p-2 ${className}`}>
                                <Dialog.Title className="text-xl text-slate-700 font-semibold">{dialogTitle}
                                </Dialog.Title>
                                {dialogDescription && (
                                    <Dialog.Description>
                                        {dialogDescription}
                                    </Dialog.Description>)
                                }
                                <>
                                    {dialogContent}
                                </>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Modal