import InputIconWrapper from '@/components/atoms/input-icon-wrapper'
import Label from '@/components/atoms/label'
import Section from '@/components/atoms/section'
import { TODO } from '@/types/todo'
import React from 'react'
import { Control, Controller, FieldError, FieldErrorsImpl, FieldValues, Merge } from 'react-hook-form'

type InputTextProps = {
    classNameInput?: string
    classNameWrapper?: string
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
    label?: string
    rule?: any
    name?: string
    icons?: TODO
    control?: Control<FieldValues, any>
} & React.InputHTMLAttributes<HTMLInputElement>

const InputIcon: React.FC<InputTextProps> = ({
    classNameInput,
    classNameWrapper,
    error,
    rule,
    icons,
    label,
    ...props
}) => {
    const config = {
        classNameInput: classNameInput ?? 'w-full min-h-8 max-h-28 border border-gray-300 rounded-md p-2 text-black text-sm focus:border-primary focus:outline-none flex items-center overflow-y-auto',
        classNameWrapper: classNameWrapper ?? 'flex flex-col gap-y-1'
    }
    return (
        <div className={config.classNameWrapper}>
            {label && <Label label={label} name={props.name} aria-required={props['aria-required']} />}

            <Section className={`${config.classNameInput} ${error && 'border-red-500'}`}>
                <Controller
                    name={props.name ?? ''}
                    control={props.control}
                    rules={rule}
                    render={({ field: { onChange, value } }) => (
                        <Section className='flex flex-wrap gap-4'>
                            <InputIconWrapper icons={icons} onChange={onChange} value={value} />
                        </Section>
                    )}
                />
            </Section>
            {error && (
                <p className="text-xs text-red-500" id="email-error">
                    {error.message?.toString()}
                </p>
            )}
        </div>
    )
}

export default InputIcon