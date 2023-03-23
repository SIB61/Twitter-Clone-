import styles from './SignupCard.module.css'
import tweeterLogo from '../../../../../public/images/Twitter-logo.png'
import Image from 'next/image'
import { Button } from '@/shared/components/buttons/Button'
import {BsGithub} from 'react-icons/bs'
import { Input } from '@/shared/components/input/Input'
import Link from 'next/link'
export function SignupCard(){
  return (
  <div className={styles.signupCard}>
     <Image src={tweeterLogo} alt='tweeter' className={styles.tweeterLogo}/>
     <h4>Sign u to Twitter</h4>
      <Input placeHolder='email' style={{width:'100%'}}/>
      <Input placeHolder='password' style={{width:'100%'}}/>
      <Input placeHolder='password' style={{width:'100%'}}/>
      <button className='btn  btn-primary' style={{width:'100%'}}>Login</button>
      <p>allready have an account? <span className='text-primary'> <Link href="?page=login">login</Link> </span> </p>
    </div>
  )
}
