import styles from './LoginCard.module.css'
import tweeterLogo from '../../../../../public/images/Twitter-logo.png'
import Image from 'next/image'
import { Button } from '@/shared/components/buttons/Button'
import {BsGithub} from 'react-icons/bs'
import { Input } from '@/shared/components/input/Input'
import Link from 'next/link'
import { useState } from 'react'
import {signIn} from 'next-auth/react'
export function LoginCard(){

  const [formData,setFormData] = useState({})
  const onSubmit = async() => {
    console.log(formData)
    const user = await signIn(formData)
    console.log(user)
  }

  return (
  <div className={styles.loginCard}>
     <Image src={tweeterLogo} alt='tweeter' className={styles.tweeterLogo}/>
     <h4>Sign in to Twitter</h4>
     <button className='btn btn-bordered btn-ghost' style={{width:'100%'}}> <BsGithub height='2rem' width='2rem'/>Sign in with github</button>
     <div className='h-divider-or'></div>
      <Input value={formData.email} onChange={({target})=>{setFormData(state=>({...state,email:target.value}))}} placeHolder='email' style={{width:'100%'}}/>
      <Input value={formData.password} onChange={({target})=>{setFormData(state=>({...state,password:target.value}))}} placeHolder='password' style={{width:'100%'}}/>
      <button className='btn  btn-primary' style={{width:'100%'}} onClick={onSubmit}>Login</button>
      <p>don't have any account? <span className='text-primary'> <Link href="?page=signup">Sign up</Link> </span> </p>
    </div>
  )
}
