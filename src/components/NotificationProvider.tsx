import {useCallback, useEffect, useRef, useState} from "react";
import Image from "next/image";

const SUCCESS_GREEN = '#52cb98'
const WARNING_YELLOW = '#ffb545'
const ERROR_RED = '#ff3e3e'
const INFO_BLUE = '#08bed6'

export enum NotificationFlare {
  SUCCESS,
  WARNING,
  ERROR,
  INFO
}

const flareToHex = (flare: NotificationFlare) => {
  if (flare === NotificationFlare.SUCCESS)
    return SUCCESS_GREEN
  else if (flare === NotificationFlare.WARNING)
    return WARNING_YELLOW
  else if (flare === NotificationFlare.INFO)
    return INFO_BLUE
  else
    return ERROR_RED
}

const flareToIcon = (flare: NotificationFlare) => {
  if (flare === NotificationFlare.SUCCESS)
    return '/check.svg'
  else if (flare === NotificationFlare.WARNING)
    return '/warning.svg'
  else if (flare === NotificationFlare.INFO)
    return '/info.svg'
  else
    return '/error.svg'
}

export interface NotificationProps {
  title: string
  description: string
  flare: NotificationFlare
}

const Notification = ({title, description, flare}: NotificationProps) => {
  enum Status {
    IN,
    OUT,
    GONE
  }

  const progress: any = useRef()
  const button: any = useRef()
  const [status, setStatus] = useState(Status.OUT)
  const close = useCallback(() => {
    // Just ignore if we're already transitioning
    if (status === Status.OUT)
      return
    setStatus(Status.OUT)
    setTimeout(() => setStatus(Status.GONE), 500)
  }, [Status.GONE, Status.OUT, status])

  useEffect(() => {
    setTimeout(() => {
      progress.current.style.width = '0'
      setStatus(Status.IN)
      setTimeout(() => {
        if (button.current)
          button.current.click()
      }, 4000)
    }, 500)
  }, [])

  // Return nothing if no status!
  if (status === Status.GONE)
    return

  const hex = flareToHex(flare)
  return (
    <div style={{transform: status === Status.IN ? 'translateX(0)' : 'translateX(500px)'}}
         className='trans ease-out relative flex shadow-md flex-row gap-2.5 rounded-md pb-4 p-3 bg-[#23272A] w-80'>
      {/* Icon Container */}
      <div style={{backgroundColor: `${hex}40`}} className='shadow-md z-40 flex items-center justify-center rounded-md w-7 h-7'>
        <Image width={16} height={16} src={flareToIcon(flare)} alt='Icon' />
      </div>

      {/* Text */}
      <div className='z-40 mt-0.5 flex flex-col gap-0 flex-grow items-start justify-start'>
        <h1>{title}</h1>
        <p className='font-light text-wrap w-0 min-w-full text-sm'>{description}</p>
      </div>

      {/* Close */}
      <button ref={button} onClick={close} className='z-40 mt-0.5 self-start opacity-40 trans hover:opacity-80'>
        <Image width={16} height={16} src='/close.svg' alt='Close' />
      </button>

      {/* Bottom Progress */}
      <div className='absolute p-0 top-0 left-0 right-0 bottom-0 rounded-md overflow-hidden'>
        {/* Cute blur :D */}
        <div style={{backgroundColor: hex}} className='-top-24 -left-24 w-32 h-32 bg-opacity-100 blur-[200px]' />
        <div ref={progress} style={{backgroundColor: hex}} className='duration-[4s] trans ease-linear absolute bg-white h-1 bottom-0 w-full'/>
      </div>
    </div>
  )
}

export const NotificationProvider = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([])

  useEffect(() => {
    // @ts-ignore
    window.info = (title: string, description: string) => {
      setNotifications(old => [
        ...old,
        {
          title: title,
          description: description,
          flare: NotificationFlare.INFO
        }
      ])
    }
    // @ts-ignore
    window.success = (title: string, description: string) => {
      setNotifications(old => [
        ...old,
        {
          title: title,
          description: description,
          flare: NotificationFlare.SUCCESS
        }
      ])
    }
    // @ts-ignore
    window.warning = (title: string, description: string) => {
      setNotifications(old => [
        ...old,
        {
          title: title,
          description: description,
          flare: NotificationFlare.WARNING
        }
      ])
    }
    // @ts-ignore
    window.error = (title: string, description: string) => {
      setNotifications(old => [
        ...old,
        {
          title: title,
          description: description,
          flare: NotificationFlare.ERROR
        }
      ])
    }
  }, [])

  return (
    // Overlay :D
    <div className='fixed bottom-4 z-[9999999999] right-4 gap-2 flex flex-col-reverse'>
      {notifications.map((n, i) => (
        <Notification {...n} key={i} />
      ))}
    </div>
  )
}