import styles from './LoginCard.module.css'
import tweeterLogo from '../../../../../public/images/Twitter-logo.png'
import Image from 'next/image'
import {BsGithub} from 'react-icons/bs'
import { Input } from '@/shared/components/input/Input'
import Link from 'next/link'
import {signIn} from 'next-auth/react'
import { useForm } from 'react-hook-form'



export function LoginCard(){
  const {register,handleSubmit,formState:{isValid}} = useForm() 
   const onSubmit = async(data) => {
   console.log(data)
   const res = await signIn("credentials",{...data,redirect:true,callbackUrl:'/home'})
   console.log(res)
  }

  const loginWithGithub = async () => {
    const user = await signIn('github',{callbackUrl:'/'})
    console.log(user)
  }

  return (
  <div className={styles.loginCard}>
     <Image src={tweeterLogo} alt='tweeter' className={styles.tweeterLogo}/>
     <h4>Sign in to Twitter</h4>
     <button onClick={loginWithGithub} className='btn btn-bordered btn-ghost' style={{width:'100%'}}> <BsGithub height='2rem' width='2rem'/>Sign in with github</button>
     <div className='h-divider-or'></div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Input register={register("email",{minLength:3,required:'email is required'})} placeHolder='email' style={{width:'100%'}}/>
      <Input register={register("password",{minLength:6,required:'password is required'})} placeHolder='password' style={{width:'100%'}}/>
      <button type='submit' disabled={!isValid} className={`btn ${isValid?'btn-primary':'btn-disabled'}`} style={{width:'100%'}}>Login</button>
      </form>
      <p>don't have any account? <span className='text-primary'> <Link href="?page=signup">Sign up</Link> </span> </p>
    </div>
  )
}
