import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import "react-datepicker/dist/react-datepicker.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Head from 'next/head'
import { MobileContext } from 'src/components/mobile'
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ko from 'date-fns/locale/ko';
registerLocale('ko', ko)

function App({ Component, pageProps }) {
  return (
    <>
        <Head>
          <title>copyc</title>
          <meta name="description" content="copyc" />
          <link rel="icon" href="/logo.ico" />
        </Head>
        <MobileContext>
          <Component {...pageProps} />
        </MobileContext>
    </>
  )
}

export default App
