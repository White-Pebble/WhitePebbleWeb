import Image from "next/image";

export interface ButtonProps {
  icon?: string
  text: string
  onClick?(): void
  className?: string
  loading?: boolean
}

export const PrimaryButton = ({icon, text, onClick, className, loading}: ButtonProps) => (
  <button onClick={onClick} className={`${className} text-center shadow-md text-black rounded-full gap-1 text-xs font-extrabold active:-skew-y-6 flex flex-row justify-center items-center px-3 py-2 bg-purple-300 hover:bg-opacity-80 trans`}>
    {loading && (
      <svg className="animate-spin text-black w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none"
           viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    )}
    {(icon && !loading) && (
      <Image width={20} height={20} src={icon} alt='Icon' />
    )}
    {text}
  </button>
)

export const SecondaryButton = ({icon, text, onClick, className, loading}: ButtonProps) => (
  <button onClick={onClick} className={`${className} text-center text-white rounded-full gap-1 text-xs font-light active:-skew-y-6 flex flex-row items-center px-3 py-2 border-white border bg-transparent backdrop-blur-sm trans`}>
    {loading && (
      <svg className="animate-spin text-white w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none"
           viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    )}
    {icon && (
      <Image className='opacity-90' width={20} height={20} src={icon} alt='Icon'/>
    )}
    {text}
  </button>
)