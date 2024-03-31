import Button from '@/components/atoms/button'
import Section from '@/components/atoms/section'
import React from 'react'

type DeleteProps = {
    name: string | undefined
    setOpen: (open: boolean) => void
    isLoading: boolean
    deleteHandler: (id: string | undefined) => void
}

const DeleteModalContent: React.FC<DeleteProps> = ({
    name,
    setOpen,
    isLoading,
    deleteHandler
}) => {
    return (
        <Section className="flex items-center flex-col gap-y-4">
            <p className="text-white text-sm">
                Apakah Anda Yakin Ingin Menghapus Data
                <b> {name}</b>?
            </p>
            <Section className="flex flex-row gap-x-4 text-sm">
                <Button
                    className=" bg-secondary text-white hover:bg-secondary-light border-none rounded-md md:rounded-xl px-2 md:w-32 md:h-12"
                    disabled={isLoading}
                    onClick={deleteHandler}
                >
                    {isLoading ? (
                        'Loading...'
                    ) : (
                        'Yes'
                    )}
                </Button>
                <Button
                    className=" bg-red-600 text-white hover:bg-red-700 border-none rounded-md md:rounded-xl px-2 md:w-32 md:h-12"
                    onClick={() => setOpen(false)}
                    disabled={isLoading}
                >
                    No
                </Button>
            </Section>
        </Section>
    )
}

export default DeleteModalContent