import Image from "next/image"
import Dp from 'public/images/dp.jpg'
export function Avator({size='3rem',src=Dp}){
  return <Image style={{height:size,width:size,borderRadius:'50%'}} src={src}/> 
}

