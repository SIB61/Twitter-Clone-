import Image from "next/image"
import Dp from 'public/images/dp.jpg'
export function Avator({size='48',src=Dp}){
  return <Image style={{borderRadius:'50%'}} src={src} height={size} width={size}/> 
}

