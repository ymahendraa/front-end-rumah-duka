import React from 'react'
import Select from '@/components/atoms/select'
import PaginationButton from '@/components/molecules/pagination-button'

type PaginationProps = {
    classNamePaginationButton?: string
    labelNext: string | React.ReactNode
    labelPrev: string | React.ReactNode
    disabledPrev: boolean
    disabledNext: boolean
    limit: number
    options?: Array<any>
    page: number
    totalPages: number
    totalItems: number
    setLimit: React.Dispatch<React.SetStateAction<number>>
    handlePageChange: (val: any) => void
}

const Pagination: React.FC<PaginationProps> = ({
    classNamePaginationButton,
    labelNext,
    labelPrev,
    disabledPrev,
    disabledNext,
    limit,
    options,
    page,
    totalPages,
    totalItems,
    handlePageChange,
    setLimit
}) => {
    const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLimit = parseInt(e.target.value, 10)
        setLimit(newLimit)
        handlePageChange(1) // Reset the page to 1 when the limit changes
    }
    return (
        <div className="flex flex-row gap-2 justify-between">
            <div className="flex items-center gap-2">
                {/* select */}
                <Select
                    value={limit}
                    handleChange={handleLimitChange}
                    options={options}
                />
                <p className="text-white text-xs">
                    Page {totalItems === 0 ? 0 : page} of {totalPages}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <p className="text-white text-xs">Total data: {totalItems}</p>
                <div className="join">
                    {/* button */}
                    <PaginationButton
                        className={classNamePaginationButton}
                        labelNext={labelNext}
                        labelPrev={labelPrev}
                        disabledPrev={disabledPrev}
                        disabledNext={disabledNext}
                        onClickNext={() => handlePageChange(page + 1)}
                        onClickPrev={() => handlePageChange(page - 1)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Pagination