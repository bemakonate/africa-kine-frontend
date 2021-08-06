import { Provider } from 'react-redux'
import { useStore } from '../store/helpers'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../../lib/gtag'
import '../styles/main.scss';
import RootElmt from '../components/rootElmt';


const MyApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])


  return (
    <Provider store={store}>
      <RootElmt>
        <Component {...pageProps} />
      </RootElmt>
    </Provider>
  )
}

export function reportWebVitals(metric) {
  console.log(metric)
}

export default MyApp
