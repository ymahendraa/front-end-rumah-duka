import React, { useState } from 'react'
import { FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form'
import Label from '../../label'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

type InputTextProps = {
  classNameInput?: string
  classNameWrapper?: string
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  label?: string
  rule?: any
  isPassword?: boolean
  register?: UseFormRegister<any>
} & React.InputHTMLAttributes<HTMLInputElement>

/**
 * @description
 * InputText component is a component that is used to create a text input field.
 * @param className className for input text
 * @param classNameWrapper classNameWrapper for input text
 * @param error error for input text
 * @param label label for input text
 * @param rule rule for the input text
 * @param register register for integrating with react-hook-form
 * @param isPassword isPassword for input text
 * @param props props for input text
 * @returns InputText component
 * 
 * @example
 * <InputText
 *  className='w-full h-10 border border-gray-300 rounded-md px-2'
 *  error={false}
 * />
 */
const InputText: React.FC<InputTextProps> = ({
  classNameInput,
  classNameWrapper,
  error,
  register,
  rule,
  label,
  isPassword,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const config = {
    classNameInput: classNameInput ?? 'w-full bg-base h-12 border border-gray-300 rounded-xl px-2 text-white text-sm focus:border-primary focus:outline-none',
    classNameWrapper: classNameWrapper ?? 'flex flex-col gap-y-1'
  }
  return (
    <div className={config.classNameWrapper}>
      {label && <Label label={label} name={props.name} aria-required={props['aria-required']} />}
      <input
        id={props.name}
        type={isPassword ? (showPassword ? 'text' : 'password') : props.type ?? 'text'}
        className={`${config.classNameInput} ${error ? 'border-red-500' : ''}`}
        {...register && register(props.name ?? '', rule)}
        {...props}
      />
      {isPassword && (
        <div onClick={toggleShowPassword} className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
          {showPassword ? <EyeIcon className='w-4 h-4 text-white' /> : <EyeSlashIcon className='w-4 h-4 text-white' />}
        </div>
      )}
      {error && <span className="text-xs text-red-500">{error.message?.toString()}</span>}
    </div>
  )
}

export default InputText