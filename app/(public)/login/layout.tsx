type LoginLayoutProps = {
  children: React.ReactNode
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <div className="w-full">
      <div>{children}</div>
      <div className="login-footer bg-base text-slate-800 text-sm md:text-md pl-2">
        <p>Copyright &copy; 2023 CICT KALLA</p>
      </div>
    </div>
  )
}

export default LoginLayout
