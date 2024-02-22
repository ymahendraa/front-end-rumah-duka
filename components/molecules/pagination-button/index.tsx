import Button from '@/components/atoms/button'
import React from 'react'

type PaginationButtonProps = {
    className?: string
    labelNext: string | React.ReactNode
    labelPrev: string | React.ReactNode
    disabledPrev: boolean
    disabledNext: boolean
    onClickNext: (val?: any) => void
    onClickPrev: (val?: any) => void
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
    className,
    labelPrev,
    labelNext,
    disabledPrev,
    disabledNext,
    onClickNext,
    onClickPrev
}) => {
    // default className for button
    const config = {
        style: className ?? 'text-white rounded-md shadow-sm text-sm',
    }
    return (
        <div className='flex gap-x-1'>
            <Button className={`${config.style} ${disabledPrev ? 'bg-gray-300 hover:bg-gray-400 hover:text-gray-100' : "bg-secondary border-secondary hover:bg-secondaryLight hover:text-secondary hover:border-secondary"}`} onClick={onClickPrev} disabled={disabledPrev}>
                {labelPrev}
            </Button>
            <Button className={`${config.style} ${disabledNext ? 'bg-gray-300 hover:bg-gray-400 hover:text-gray-100' : "bg-secondary border-secondary hover:bg-secondaryLight hover:text-secondary hover:border-secondary"}`} onClick={onClickNext} disabled={disabledNext}>
                {labelNext}
            </Button>
        </div>
    )
}

export default PaginationButton