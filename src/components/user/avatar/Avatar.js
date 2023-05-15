import Image from "next/image"
import Dp from 'public/images/dp.png'
export function Avator({size='48',src=Dp}){
  return <Image alt="avatar" style={{borderRadius:'50%',objectFit:'cover'}} src={src} height={size} width={size}/> 
}

