import '@/styles/globals.css'
export default function App({ Component, pageProps }) {
  if(Component.Layout) return <Component.Layout>
                  <Component {...pageProps}/>
        </Component.Layout>
  return <Component {...pageProps} />
}
