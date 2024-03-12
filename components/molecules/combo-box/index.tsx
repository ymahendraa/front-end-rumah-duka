import ComboBoxWrapper from '@/components/atoms/combo-box-wrapper'
import Label from '@/components/atoms/label'
import React from 'react'
import { Control, Controller, FieldError, FieldErrorsImpl, FieldValues, Merge, RegisterOptions } from 'react-hook-form'

type ComboBoxProps = {
    classNameInput?: string
    classNameWrapper?: string
    label?: string
    options: {
        value: string | number;
        label: string;
    }[];
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
    control?: Control<FieldValues, any>
    rule?: Omit<RegisterOptions<FieldValues, string>, "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"> | undefined
    placeholder?: string,
    name?: string,
    required?: boolean
}

const ComboBox: React.FC<ComboBoxProps> = ({
    classNameInput,
    classNameWrapper,
    label,
    error,
    options,
    control,
    name,
    rule,
    ...props
}) => {
    const config = {
        classNameInput: classNameInput ?? 'w-full h-8 border border-gray-300 rounded-md px-2 text-black text-sm focus:border-primary focus:outline-none',
        classNameWrapper: classNameWrapper ?? 'flex flex-col gap-y-1'
    }
    return (

        <div className={config.classNameWrapper}>
            {label && <Label label={label} name={name} aria-required={props.required} />}
            <Controller
                name={name ?? ''}
                control={control}
                rules={rule}
                render={({ field: { onChange, value, onBlur } }) => (
                    <ComboBoxWrapper
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        label={label ?? ''}
                        options={options}
                        error={error}
                    />
                )}
            />
            {error && (
                <p className=" text-xs text-red-500" id="email-error">
                    {error.message?.toString()}
                </p>
            )}
        </div>
    )
}

export default ComboBox