import React from 'react'
import InputFileWrapper from '@/components/atoms/input/input-file-wrapper'
import { Controller, FieldError, FieldErrorsImpl, FieldValues, Merge, RegisterOptions } from 'react-hook-form'
import Image from 'next/image'
import Button from '@/components/atoms/button'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import Section from '@/components/atoms/section'

type FileInputProps = {
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
    control: any
    rule?: Omit<RegisterOptions<FieldValues, string>, "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"> | undefined
    label: string,
    id: string,
    name: string,
    type: 'file' | 'image',
    onlineUrl?: string,
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
        const URL_IMAGE = value instanceof File ? URL.createObjectURL(value) : value;
        if (!value) {
            return <p className='text-gray-400'>{placeholder}</p>
        }
        if (props.type === 'image') {
            return value ?
                <Image
                    src={URL_IMAGE}
                    // alt={value.name}
                    alt='image'
                    width={400}
                    height={400}
                />
                :
                <p className='text-gray-400'>{placeholder}</p>
        }

        // check if value is string
        if (typeof value === 'string') {
            return (
                <Section className='flex w-full justify-between items-center'>
                    <p className='text-gray-400'>{value}</p>
                    {props.onlineUrl && (
                        <Button
                            type='button'
                            className='bg-secondary hover:bg-secondary-dark text-white rounded-md p-1 cursor-pointer'
                            onClick={() => {
                                // download file from online url
                                window.open(props.onlineUrl, '_blank');

                            }}>
                            <ArrowDownTrayIcon className='h-5 w-5' />
                        </Button>
                    )
                    }
                </Section>
            )
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
                        onlineUrl={props.onlineUrl}
                    />
                );
            }}
        />
    )
}

export default FileInput