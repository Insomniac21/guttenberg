import { NextUIProvider } from '@nextui-org/react';
import { SSRProvider } from '@react-aria/ssr'; 

type Props = {
  Component: React.ComponentType;
  pageProps: any;
}

function MyApp({ Component, pageProps } : Props) {
  return (
    <SSRProvider>
        <NextUIProvider>
            <Component {...pageProps} />
        </NextUIProvider>
    </SSRProvider>
  );
}

export default MyApp;