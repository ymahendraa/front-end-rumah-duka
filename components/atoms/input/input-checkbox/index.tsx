import React from 'react'
import Label from '../../label'
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'

type InputCheckboxProps = {
    className?: string,
    label?: string,
    register?: UseFormRegister<any>
    name?: string,
    rule?: Omit<RegisterOptions<FieldValues, string>, "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"> | undefined
} & React.InputHTMLAttributes<HTMLInputElement>

/**
 * @description
 * InputCheckbox component is a component that is used to create a checkbox input field.
 * @param className className for input checkbox
 * @param label label for input checkbox
 * @param name name for input checkbox
 * @param register register for integrating with react-hook-form
 * @param rule rule for input checkbox
 * @param props props for input checkbox
 * @returns InputCheckbox component
 * 
 * @example
 * <InputCheckbox
 *  className='w-full h-10 border border-gray-300 rounded-md px-2'
 * label='Label'
 * name='name'
 * register={register}
 * rule={{ required: 'This field is required' }}
 * />
 */
const InputCheckbox: React.FC<InputCheckboxProps> = ({
    className,
    label,
    name,
    register,
    rule,
    ...props
}) => {
    const config = {
        className: className ?? 'accent-primary border border-gray-300 focus:border-primary focus:outline-none hover:cursor-pointer p-2 w-4 h-4',
    }
    return (
        <div className='flex items-center gap-x-1'>
            <input
                type="checkbox"
                id={String(props.value)}
                className={config.className}
                {...register && register(name ?? '', rule)}
                {...props}
            />
            {label && <Label label={label} name={String(props.value)} />}
        </div>
    )
}

export default InputCheckbox