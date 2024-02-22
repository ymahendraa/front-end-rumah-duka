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
        <Section className="flex flex-col gap-y-4">
            <p className="text-slate-700">
                Are you sure want to delete
                <b> {name}</b>?
            </p>
            <Section className="flex flex-row gap-x-4 self-end text-sm">
                <Button
                    className="btn btn-sm bg-green-600 text-white hover:bg-green-700 border-none rounded-md px-2"
                    disabled={isLoading}
                    onClick={deleteHandler}
                >
                    {isLoading ? (
                        <span data-testid='loading-spinner' className="loading loading-infinity loading-md"></span>
                    ) : (
                        'Yes'
                    )}
                </Button>
                <Button
                    className="btn btn-sm bg-red-600 text-white hover:bg-red-700 border-none rounded-md px-2"
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