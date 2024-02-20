import {HTMLInputTypeAttribute, useState} from "react";
import {validateEmail, validatePassword} from "@/services/Utils";
import Image from "next/image";

export interface InputFieldProps {
  icon: string
  field: string
  type: HTMLInputTypeAttribute
  setText(input: string): void
  isError?: boolean
}

export const InputField = ({icon, field, type, setText, isError}: InputFieldProps) => {
  const [error, setError] = useState(false)
  const isEmail = type === 'email'
  const isPassword = type === 'password'
  const showingError = error || isError

  const onChange = (ev: any) => {
    const value = ev.target.value
    setError(false)
    setText(value)

    // Check for email error!
    if (isEmail && !validateEmail(value))
      return setError(true)

    // Check for password error!
    if (isPassword && !validatePassword(value))
      return setError(true)
  }

  return (
    // Contains both field name and input!
    <div className='z-50 group min-w-full items-start flex flex-col gap-1'>
      {/* Make sure to add forgot password! */}
      <div className='min-w-full flex flex-row justify-between'>
        <h1 className={`${showingError && '!text-red-500 !opacity-100'} tracking-widest text-xs font-light opacity-40 group-focus-within:opacity-70 trans`}>{field.toUpperCase()}</h1>
      </div>

      {/* Input w/ icon */}
      <div className={`${showingError && '!border-red-500/70 !bg-red-500/10'} border-white/15 focus-within:border-white/30 trans border px-2 flex flex-row gap-1 min-w-full h-11 bg-white/5 rounded-sm`}>
        <Image width={20} height={20} className='opacity-30 group-focus-within:opacity-80 trans' src={icon} alt='Icon' />
        <input placeholder='...' type={type} onChange={onChange} className='flex-grow min-h-full' />
      </div>
    </div>
  )
}