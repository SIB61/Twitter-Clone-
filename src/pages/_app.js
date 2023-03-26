import '@/styles/globals.css'
import '@/styles/components.css'
import '@/styles/utils.css'
import {SessionProvider} from 'next-auth/react'
export default function App({ Component, pageProps:{session,...pageProps}}) {
  return <SessionProvider session={session}>
    {
      Component.Layout ? <Component.Layout>
        <Component {...pageProps}/>
      </Component.Layout> : <Component {...pageProps}/>
    }          
   </SessionProvider>
}
