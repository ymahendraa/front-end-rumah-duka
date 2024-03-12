import React from 'react'
import '../input/input.css'

type LabelProps = {
    label: string
    name: string | undefined
} & React.LabelHTMLAttributes<HTMLLabelElement>

/**
 * @description Label component is a component that is used to create a label.
 * @param label label for input text
 * @param name name for input text
 * @returns Label component
 */

const Label: React.FC<LabelProps> = ({
    label,
    name,
    ...props
}) => {
    return (
        <label className={`text-sm text-white ${props['aria-required'] && 'required'}`} htmlFor={name} >{label}</label>
    )
}

export default Label