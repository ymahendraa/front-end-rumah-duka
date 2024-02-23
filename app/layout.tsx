// import { AuthorizationProvider } from '@/context/AuthorizationContext/context'
import { AuthorizationProvider } from '@/context/AuthorizationContext/context'
import './globals.css'
// import Loading from './loading'
import Provider from './Provider'
import { Poppins } from 'next/font/google'
// 
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="flex flex-row min-w-screen">
        <Provider>
          <AuthorizationProvider>
            <div className="bg-base w-full lg:flex lg:justify-center">
              {children}
            </div>
          </AuthorizationProvider>
        </Provider>
      </body>
    </html>
  )
}
