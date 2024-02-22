import { TODO } from '@/types/todo'
import React from 'react'
import Label from '../label'

type InputIconWrapperProps = {
    value: string
    onChange: any
    icons?: TODO
}

const InputIconWrapper: React.FC<InputIconWrapperProps> = ({
    value,
    onChange,
    ...props
}) => {
    const handleClick = (icon: string) => {
        onChange(icon);
    }

    return (
        <>
            {props.icons && Object.keys(props.icons).map((icon: any, index: number) => {
                return (
                    <div key={index} className={` p-1 hover:text-primary hover:cursor-pointer  ${value === icon ? 'bg-gray-200 rounded-md text-primary' : 'text-slate-800'}`} onClick={() => handleClick(icon)}>
                        {props.icons[icon]}
                    </div>
                )
            })}
        </>
    )
}

export default InputIconWrapper