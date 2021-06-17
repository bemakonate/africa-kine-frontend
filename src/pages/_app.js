import { Provider } from 'react-redux'
import { useStore } from '../store/helpers'
import '../styles/main.scss';
import RootElmt from '../components/rootElmt';

const MyApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <RootElmt>
        <Component {...pageProps} />
      </RootElmt>
    </Provider>
  )
}

export default MyApp
