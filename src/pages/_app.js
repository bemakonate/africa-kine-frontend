import { Provider } from 'react-redux'
import { useStore } from '../store/helpers'
import '../styles/main.scss';
import RootElmt from '../components/rootElmt';
import { SWRConfig } from 'swr';
import axios from '../constants/instances/backend';


const fetcher = (url) => axios.get(url).then(res => res.data)

const MyApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <SWRConfig value={{ fetcher }}>
        <RootElmt>
          <Component {...pageProps} />
        </RootElmt>
      </SWRConfig>

    </Provider>
  )
}

export default MyApp
