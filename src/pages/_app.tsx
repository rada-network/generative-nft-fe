import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { useStore } from 'src/libs/redux';
import { Web3Provider } from 'src/libs/web3-context';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore();

  return (
    <Provider store={store}>
      <Web3Provider>
        <Component {...pageProps} />
      </Web3Provider>
    </Provider>
  );
}

export default MyApp;
