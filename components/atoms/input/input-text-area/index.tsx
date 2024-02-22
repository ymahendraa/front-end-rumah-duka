import React from 'react'
import { FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form'
import Label from '../../label'

type InputTextProps = {
    classNameInput?: string
    classNameWrapper?: string
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
    label?: string
    rule?: any
    register?: UseFormRegister<any>
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

/**
 * @description
 * InputText component is a component that is used to create a text input field.
 * @param className className for input text
 * @param classNameWrapper classNameWrapper for input text
 * @param error error for input text
 * @param label label for input text
 * @param rule rule for the input text
 * @param register register for integrating with react-hook-form
 * @param props props for input text
 * @returns InputText component
 * 
 * @example
 * <InputText
 *  className='w-full h-10 border border-gray-300 rounded-md px-2'
 *  error={false}
 * />
 */
const InputTextArea: React.FC<InputTextProps> = ({
    classNameInput,
    classNameWrapper,
    error,
    register,
    rule,
    label,
    ...props
}) => {
    const config = {
        classNameInput: classNameInput ?? 'w-full min-h-28 border border-gray-300 rounded-md p-2 text-black text-sm focus:border-primary focus:outline-none',
        classNameWrapper: classNameWrapper ?? 'flex flex-col gap-y-1'
    }
    return (
        <div className={config.classNameWrapper}>
            {label && <Label label={label} name={props.name} aria-required={props['aria-required']} />}
            <textarea
                id={props.name}
                className={`${config.classNameInput} ${error ? 'border-red-500' : ''}`}
                {...register && register(props.name ?? '', rule)}
                {...props}
            />
            {error && <span className="text-xs text-red-500">{error.message?.toString()}</span>}
        </div>
    )
}

export default InputTextArea