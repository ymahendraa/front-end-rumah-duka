import RadioButton from '@/components/atoms/input/input-radio'
import Section from '@/components/atoms/section'
import React from 'react'
import { Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form'

type WrapperRadioProps = {
    name: string
    label?: string
    options: string[]
    control?: Control<FieldValues, any>
    rule?: Omit<RegisterOptions<FieldValues, string>, "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"> | undefined

} & React.InputHTMLAttributes<HTMLInputElement>

export const WrapperRadio: React.FC<WrapperRadioProps> = ({
    name,
    label,
    options,
    control,
    rule,
    defaultValue,
}) => {
    return (
        <>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={rule}
                render={({ field: { onChange, ...props } }) => {
                    return (
                        <Section className='flex gap-2'>
                            {options.map((option, index) => (
                                <RadioButton
                                    key={index}
                                    {...props}
                                    label={label ?? option}
                                    onChange={onChange}
                                    value={option}
                                    defaultChecked={defaultValue === option}
                                />
                            ))}
                        </Section>
                    );
                }} />
        </>
    )
}
