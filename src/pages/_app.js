// import '../styles/globals.css'
import { Provider } from 'react-redux'
import { useStore } from '../store/helpers'

const MyApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
