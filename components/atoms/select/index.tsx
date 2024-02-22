import React from 'react'

type SelectProps = {
    value: any
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    options?: Array<any>
    className?: string
}

const Select: React.FC<SelectProps> = ({
    value,
    handleChange,
    options,
    className
}) => {
    const config = {
        className: className ?? 'bg-white border border-gray-300 rounded-md shadow-sm px-1 text-sm text-black',
    }

    return (
        <select
            className={config.className}
            onChange={handleChange}
            defaultValue={value}
        >
            {options?.map((option) => (
                <option key={option.value} value={option.value} >
                    {option.label}
                </option>
            ))}
        </select>
    )
}

export default Select