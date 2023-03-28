import '@/styles/globals.css'
import '@/styles/components.css'
import '@/styles/utils.css'
import {SessionProvider} from 'next-auth/react'
import { useLoading } from '@/shared/hooks/useLoading'
import { LoadingBar } from '@/shared/components/loading-bar/LoadingBar'
import { useEffect } from 'react'
import { Router } from 'next/router'

export default function App({ Component, pageProps:{session,...pageProps}}) {
   const loading = useLoading()
   useEffect(() => {
    Router.events.on("routeChangeStart", (url)=>{
      loading.start()
    });
    Router.events.on("routeChangeComplete", (url)=>{
      loading.complete()
    });
    Router.events.on("routeChangeError", (url) =>{
      loading.complete()
    });
  }, [Router])

  return <SessionProvider session={session}>
      <LoadingBar loading={loading.loading}/>
    {
      Component.Layout ? <Component.Layout>
        <Component {...pageProps}/>
      </Component.Layout> : <Component {...pageProps}/>
    }          
   </SessionProvider>
}
