type ButtonProps = {
  children?: React.ReactNode
  onClick?: (val?: any) => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  loadingText?: string
  icon?: React.ReactNode
  formID?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  disabled,
  type,
  loading,
  loadingText,
  icon,
  formID,
}: ButtonProps) => {
  const defaultConfig = {
    className:
      className ??
      'bg-primary text-white hover:bg-primary-dark hover:border-secondary p-2 rounded-md text-sm',
    type: type ?? 'button',
    loading: loading ?? false,
    loadingText: loadingText ?? 'Loading...',
  }

  return (
    <button
      className={defaultConfig.className}
      onClick={onClick}
      disabled={disabled}
      type={type}
      form={formID}
    >
      {loading ? (
        loadingText
      ) : (
        <>
          {children}
          {icon}
        </>
      )}
    </button>
  )
}

export default Button
