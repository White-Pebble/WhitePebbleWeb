import type { AppProps } from 'next/app'
import {Onest} from "next/font/google";
import Head from "next/head";
import "../styles/globals.css"
import Image from "next/image";
import {ModalProvider} from "@/components/ModalProvider";

const font = Onest({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false
})

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${font.className} dashboard flex flex-col items-center pt-14 px-4 py-12 min-w-full min-h-screen`}>
      <Head>
        <title>White Pebble</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <ModalProvider />
      {/* Logo :D */}
      <div className='absolute top-4 left-4 gap-1.5 flex flex-row items-center'>
        <Image width={40} height={40} src='/logo.webp' alt='Logo' />
        <h1>White <span className='uppercase tracking-widest opacity-40 text-xs'>Pebble</span></h1>
      </div>
      <Component {...pageProps} />
    </main>
  )
}