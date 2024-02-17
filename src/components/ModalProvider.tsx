import {useEffect, useState} from "react";
import {PrimaryButton} from "@/components/Buttons";

export enum Modal {
  BUY_TICKETS
}

const BuyTicketsModal = ({active, close}: any) => (
  <div className={`${active ? 'delay-200' : 'invisible opacity-0 translate-y-6'} trans bg-black h-[30rem] w-[20rem] tile flex flex-col p-4 rounded-md shadow-md`}>
    <h1 className='text-xl'>Buy Tickets</h1>

    <PrimaryButton className='self-start w-full text-sm' text='Buy' />
  </div>
)

const ModalMap = {
  [Modal.BUY_TICKETS]: BuyTicketsModal
}

export const ModalProvider = () => {
  const [modal, setModal] = useState<Modal | null>(null)

  useEffect(() => {
    // @ts-ignore
    window.setModal = setModal

    // Watch for clicks on overlay
    document.getElementById('overlay')!!.onclick = ev => {
      // Make sure it's the background
      if (ev.target === document.getElementById('overlay'))
        return setModal(null)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = modal === null ? '' : 'hidden'
  }, [modal])

  return (
    <div id='overlay' className={`${modal === null && 'opacity-0 invisible'} duration-500 trans z-[9999] bg-black/10 backdrop-blur-sm flex flex-col items-center justify-center absolute top-0 left-0 bottom-0 right-0`}>
      {Object.keys(ModalMap).map((key: string, i) => {
        // @ts-ignore
        const Map = ModalMap[key]
        return (
          // @ts-ignore
          <Map active={modal === Modal[Modal[i]]} close={() => setModal(null)} key={i} />
        )
      })}
    </div>
  )
}