import React from 'react'

// components import
import Section from '../../section'

type RadioButtonProps = {
    name: string
    label: string
    classNameLabel?: string

} & React.InputHTMLAttributes<HTMLInputElement>

const RadioButton: React.FC<RadioButtonProps> = ({
    name,
    label,
    ...props
}) => {
    const config = {
        classNameLabel: props.classNameLabel || 'text-sm text-slate-800'
    }
    return (
        <Section className='flex gap-1'>
            <input
                name={name}
                type="radio"
                value={props.value}
                aria-label={label}
                onChange={props.onChange}
                {...props} />
            <label htmlFor={name} className={config.classNameLabel}>{label}</label>
        </Section>
    )
}

export default RadioButton