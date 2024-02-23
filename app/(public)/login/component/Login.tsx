'use client'
// utils import
import { getSession, signIn } from 'next-auth/react'
import { AuthorizationContext } from '@/context/AuthorizationContext/context'

// hooks import
import { useContext, useRef } from 'react'
import { useRouter } from 'next/navigation'

// components import
import Image from 'next/image'
import Swal from 'sweetalert2'
import InputText from '@/components/atoms/input/input-text'
import axios from '@/lib/axios'


type Props = {
  callbackUrl?: string
  error?: string
}

const LoginComponent: React.FC<Props> = ({ error, callbackUrl }) => {
  const username = useRef('')
  const password = useRef('')
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const res = await signIn('credentials', {
      username: username.current,
      password: password.current,
      redirect: false,
    })
    if (res?.error) {
      // show error with sweetalert
      if (res?.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid email or password',
        })
      }
    }

    if (!res?.error) {
      const session = await getSession()
      if (session) {
        // redirect to callbackUrl or home
        router.push(callbackUrl ?? 'http://localhost:3000/home')
      }
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen items-center justify-around bg-primary lg:bg-white py-12 px-4 sm:px-6 lg:px-8">
      <Image
        src="/printing.svg"
        alt="printing"
        width={100}
        height={100}
        className="hidden lg:inline md:w-4/6"
      />
      <div className="flex flex-col h-[500px] bg-white pt-10 px-4 shadow-xl rounded-xl items-center">
        <Image src="/logo.png" alt="Logo" width={40} height={50} />
        <div className="max-w-xs w-full space-y-8 ">
          <div>
            <h2 className="mt-6 text-center text-2xl md:text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          {!!error && (
            <p className="bg-red-100 text-red-600 text-center p-2">
              Authentication Failed
            </p>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <InputText
                  data-testid="username"
                  id="email-address"
                  name="username"
                  type="text"
                  required
                  classNameInput="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-slate-800 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-white"
                  placeholder="Username"
                  onChange={(e) => (username.current = e.target.value)}
                />
              </div>
              <div>
                <InputText
                  data-testid="password"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  classNameInput="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500  text-slate-800 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-white"
                  placeholder="Password"
                  onChange={(e) => (password.current = e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                data-testid="login-button"
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-primaryLight hover:text-primaryDark"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-5a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm0-3a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent
