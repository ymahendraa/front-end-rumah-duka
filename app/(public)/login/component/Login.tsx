'use client'
// utils import
import { getSession, signIn } from 'next-auth/react'
import { AuthorizationContext } from '@/context/AuthorizationContext/context'

// hooks import
import { useRef } from 'react'
import { useRouter } from 'next/navigation'

// components import
import Image from 'next/image'
import Swal from 'sweetalert2'
import InputText from '@/components/atoms/input/input-text'
import Button from '@/components/atoms/button'


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
        // redirect to callbackUrl or dashboard
        router.push(callbackUrl ?? `${process.env.NEXT_PUBLIC_URL}/dashboard`)
      }
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen items-center justify-around bg-base py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:w-2/5 h-[450px] bg-primary pt-10 px-4 shadow-xl rounded-xl items-center">
        <div className="max-w-sm w-full space-y-8 ">
          <div className='flex flex-col gap-y-10'>
            <h1 className="text-center text-xl font-bold text-white">
              Yayasan Daya Besar Rumah Duka
            </h1>
            <h2 className="text-center text-2xl font-bold text-white">
              Log In
            </h2>
          </div>
          {!!error && (
            <p className="bg-red-100 text-red-600 text-center p-2">
              Authentication Failed
            </p>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-y-4">
              <div>
                <InputText
                  data-testid="username"
                  id="email-address"
                  name="username"
                  type="text"
                  required
                  classNameInput="rounded-xl relative block w-full px-3 py-4 placeholder-gray-500 text-white bg-base focus:outline-none focus:ring-white focus:border-white focus:border focus:z-10 text-sm"
                  placeholder="Masukkan username"
                  onChange={(e) => (username.current = e.target.value)}
                />
              </div>
              <div>
                <InputText
                  data-testid="password"
                  id="password"
                  name="password"
                  // type="password"
                  isPassword
                  autoComplete="current-password"
                  required
                  classNameInput="rounded-xl relative block w-full px-3 py-4 placeholder-gray-500 text-white bg-base focus:outline-none focus:ring-white focus:border-white focus:border focus:z-10 text-sm"
                  classNameWrapper='relative flex'
                  placeholder="Masukkan password"
                  onChange={(e) => (password.current = e.target.value)}
                />
              </div>
            </div>

            <div>
              <Button
                data-testid="login-button"
                type="submit"
                className="relative w-full flex justify-center py-4 px-3 border border-transparent text-sm font-medium rounded-xl text-white bg-secondary hover:bg-secondary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent
