import { Provider } from 'react-redux'
import { useStore } from '../store/helpers'
import '../styles/main.scss';


const MyApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
