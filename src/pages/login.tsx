import {PrimaryButton} from "@/components/Buttons";
import {InputField} from "@/components/Fields";
import {useState} from "react";
import {login, me} from "@/services/WhitePebble";
import {validateEmail, validatePassword} from "@/services/Utils";
import {useRouter} from "next/router";

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const tryLogin = () => {
    if (!validateEmail(email))
      return
    if (!validatePassword(password))
      return

    setLoading(true)
    login(email, password).then(res => {
      setLoading(false)
      // Let interceptor take care of this!
      if (!res.data.success)
        return

      const newJWT = res.data.token
      localStorage.setItem('token', newJWT)
      me().then(res => {
        // @ts-ignore
        window.setUser(res.data.user)
        // @ts-ignore
        window.info('Success', 'Logged in!')
        return router.push('/')
      })
    })
  }

  return (
    <div className='flex flex-col gap-5 self-center w-[22rem] min-h-full justify-center items-center'>
      {/* Top Text */}
      <div className='flex flex-col items-center gap-0.5'>
        <h1 className='text-4xl'>👋 Welcome Back!</h1>
        <p className='text-sm'>Modern <span className='rustclash-gr'>Clash</span> Utilities</p>
      </div>

      {/* Input Fields */}
      <div className='flex min-w-full flex-col gap-1.5'>
        <InputField icon='/email.svg' field='Email' setText={setEmail} type='email' />
        <InputField icon='/password.svg' field='Password' setText={setPassword} type='password' />
      </div>
      <PrimaryButton loading={loading} onClick={tryLogin} className='min-w-full !text-sm h-10' icon='/login.svg' text='Login' />
    </div>
  )
}