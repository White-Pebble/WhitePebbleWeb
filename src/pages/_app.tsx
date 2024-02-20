import type { AppProps } from 'next/app'
import {Onest} from "next/font/google";
import Head from "next/head";
import "../styles/globals.css"
import Image from "next/image";
import {ModalProvider} from "@/components/ModalProvider";
import {useEffect, useState} from "react";
import {availableSites, me} from "@/services/WhitePebble";
import {useRouter} from "next/router";
import {AppMe, Website} from "@/services/types";
import {NotificationProvider} from "@/components/NotificationProvider";
import Link from "next/link";

const font = Onest({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false
})

export interface PageProps {
  user: AppMe
  available: Website[]
}

const TabButton = ({href, name, icon, available}: any) => {
  const router = useRouter()
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(router.asPath === href)
  }, [href, router.asPath])

  // Make sure the website is offered :D
  if (!available.includes(name.toLowerCase()) && name !== 'Overview')
    return null

  return (
    <Link href={href} className={`${active ? '!opacity-100' : 'opacity-40'} hover:opacity-60 flex trans flex-row items-center gap-1.5`}>
      <Image className={icon === undefined ? 'opacity-0 invisible' : ''} width={20} height={20} src={icon || '/password.svg'} alt='Website Logo'/>
      <h1 className='text-sm'>{name}</h1>
    </Link>
  )
}

export default function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter()
  const [user, setUser] = useState<AppMe | null | undefined>(undefined)
  const [available, setAvailable] = useState<string[] | undefined>(undefined)

  useEffect(() => {
    // @ts-ignore
    window.setUser = setUser

    // Check auth
    me().then(res => {
      if (!res.data.success)
        return router.push('/login')
      setUser(res.data.user)
    })
    availableSites().then(res => {
      if (!res.data.success)
        return
      setAvailable(res.data.available)
    })
  }, [])

  return (
    <main className={`${font.className} dashboard flex flex-col items-center min-w-full min-h-screen`}>
      <Head>
        <title>White Pebble</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NotificationProvider />
      <ModalProvider />

      {/* Top Bar */}
      <div className='flex min-w-full px-6 h-16 gap-6 flex-row items-center justify-start'>
        {/* Logo :D */}
        <div className='gap-1.5 flex flex-row items-center'>
          <Image width={40} height={40} src='/logo.webp' alt='Logo' />
          <h1>White <span className='uppercase tracking-widest opacity-40 text-xs'>Pebble</span></h1>
        </div>

        {/* Mobile Tabs */}
        {(user !== undefined && available !== undefined) && (
          <div className='only-m ml-auto flex flex-row items-center gap-4'>
            <TabButton href='/' name='Overview' available={available}/>
            <TabButton href='/?site=rustclash' name='RustClash' icon='/rustclash-diamond.svg' available={available}/>
            <TabButton href='/?site=clash' name='Clash' icon='/clash-diamond.svg' available={available}/>
          </div>
        )}
      </div>

      {/* Bottom Content */}
      <div className='flex flex-row flex-grow min-w-full'>
        {/* Left Tabs */}
        {
          (user !== undefined && available !== undefined) && (
            <div className='min-h-full no-m pl-12 pt-6 gap-2.5 w-52 flex flex-col'>
              <h1 className='tracking-[4px] font-extrabold -translate-x-2 opacity-40 text-xs mb-0.5'>WEBSITES</h1>
              <TabButton href='/' name='Overview' available={available} />
              <TabButton href='/?site=rustclash' name='RustClash' icon='/rustclash-diamond.svg' available={available} />
              <TabButton href='/?site=clash' name='Clash' icon='/clash-diamond.svg' available={available} />
            </div>
          )
        }
        {/* Right Contents */}
        <div className='min-h-full flex-grow'>
          {(user === undefined || available === undefined) && router.asPath !== '/login' ? ( // Loading!
            <div
              className='backdrop-blur-sm bg-black/10 absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center'>
              <svg className="animate-spin text-white w-16 h-16" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            <div className='w-full h-full flex items-center justify-center'>
              <div className='relative w-full h-full flex items-center px-5 lg:px-0 justify-center max-w-6xl'>
                <Component user={user} available={available} {...pageProps} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
