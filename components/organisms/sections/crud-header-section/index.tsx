import Button from '@/components/atoms/button'
import InputText from '@/components/atoms/input/input-text'
import PopOver from '@/components/atoms/pop-over'
import Section from '@/components/atoms/section'
import { AdjustmentsHorizontalIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'

type CRUDHeaderSectionProps = {
    onClickCreate?: () => void
    value?: string
    PopOverComponent?: React.ReactNode
    advancedSearch?: boolean,
    disableCreate?: boolean,
} & React.InputHTMLAttributes<HTMLInputElement>

/**
 * @description
 * CRUDHeaderSection component is a component that is used to create a search and create section.
 * @param onClickCreate function to handle create button
 * @param value value for input text
 * @param PopOverComponent PopOverComponent for input text
 * @param advancedSearch advancedSearch for input text
 * @param disableCreate disableCreate for input text
 * @param props props for input text
 * @returns CRUDHeaderSection component
 * 
 * @example
 * <CRUDHeaderSection
 * onClickSearch={() => console.log('search')}
 * onClickCreate={() => console.log('create')}
 * value='search'
 * PopOverComponent={<div>PopOverComponent</div>}
 * />
 */

const CRUDHeaderSection: React.FC<CRUDHeaderSectionProps> = ({
    // onClickSearch,
    onClickCreate,
    value,
    PopOverComponent,
    advancedSearch = true,
    disableCreate = false,
    ...props
}) => {
    const config = {
        classNameInput: 'h-full rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-slate-700 text-sm px-2',
    }
    return (
        <Section className='flex justify-between h-[30px]'>
            <Section className='w-1/3 flex justify-between gap-2'>
                <InputText
                    classNameInput={config.classNameInput}
                    classNameWrapper='w-full flex flex-col gap-y-1'
                    placeholder='Search'
                    value={value}
                    {...props}
                />
                {
                    advancedSearch && PopOverComponent && (
                        <PopOver
                            PopOverButton={
                                <Section
                                    className='h-[30px] flex items-center bg-secondary rounded-lg text-sm p-2 hover:bg-secondary-dark'
                                    onClick={() => { }}
                                >
                                    <AdjustmentsHorizontalIcon className='w-5 h-5' />
                                </Section>
                            }
                            PopOverPanel={
                                PopOverComponent
                            }
                        />
                    )
                }
            </Section>
            {
                disableCreate ? null : (
                    <Button
                        className='flex items-center bg-secondary rounded-lg text-sm p-2 hover:bg-secondary-dark'
                        type='button'
                        icon={<PlusCircleIcon className='w-5 h-5' />}
                        onClick={onClickCreate}
                    />
                )
            }
        </Section>
    )
}

export default CRUDHeaderSection