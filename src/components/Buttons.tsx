import Image from "next/image";

export interface ButtonProps {
  icon?: string
  text: string
  onClick?(): void
  className?: string
}

export const PrimaryButton = ({icon, text, onClick, className}: ButtonProps) => (
  <button onClick={onClick} className={`${className} text-center shadow-md text-black rounded-full gap-1 text-xs font-extrabold active:-skew-y-6 flex flex-row justify-center items-center px-3 py-2 bg-purple-300 hover:bg-opacity-80 trans`}>
    {icon && (
      <Image width={20} height={20} src={icon} alt='Icon' />
    )}
    {text}
  </button>
)

export const SecondaryButton = ({icon, text, onClick, className}: ButtonProps) => (
  <button onClick={onClick} className={`${className} text-center text-white rounded-full gap-1 text-xs font-light active:-skew-y-6 flex flex-row items-center px-3 py-2 border-white border bg-transparent backdrop-blur-sm trans`}>
    {icon && (
      <Image className='opacity-90' width={20} height={20} src={icon} alt='Icon' />
    )}
    {text}
  </button>
)