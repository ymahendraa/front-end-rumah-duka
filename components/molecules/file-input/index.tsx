import React from 'react'
import InputFileWrapper from '@/components/atoms/input/input-file-wrapper'
import { Control, Controller, FieldError, FieldErrorsImpl, FieldValues, Merge, RegisterOptions } from 'react-hook-form'
import Image from 'next/image'

type FileInputProps = {
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
    control: Control<FieldValues, any>
    rule?: Omit<RegisterOptions<FieldValues, string>, "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"> | undefined
    label: string,
    id: string,
    name: string,
    type: 'file' | 'image'
} & React.InputHTMLAttributes<HTMLInputElement>

const FileInput: React.FC<FileInputProps> = ({
    error,
    control,
    rule,
    label,
    placeholder = 'Choose File PNG/JPG/PDF',
    ...props
}) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const getContent = (value: File) => {
        if (!value) {
            return <p className='text-gray-400'>{placeholder}</p>
        }
        if (props.type === 'image') {
            return value ?
                <img
                    src={URL.createObjectURL(value)}
                    alt={value.name}
                    width={400}
                    height={400}
                />
                :
                <p className='text-gray-400'>{placeholder}</p>
        }
        return <p className='text-gray-400'>{value?.name}</p>
    }

    return (
        <Controller
            control={control}
            name={props.name}
            rules={rule}
            render={({ field: { value, onChange, ...field } }) => {
                return (
                    <InputFileWrapper
                        {...field}
                        aria-required={props['aria-required']}
                        ref={inputRef}
                        onChange={(event) => {
                            if (event?.target?.files) {
                                onChange(event.target.files[0]);
                            }
                        }}
                        inputContent={getContent(value)}
                        name={props.name}
                        error={error}
                        label={label}
                        id={props.id}
                    />
                );
            }}
        />
    )
}

export default FileInput