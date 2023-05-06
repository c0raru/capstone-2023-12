import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { MobileContext } from "src/components/mobile";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import axios from "axios";
import { UserProvider } from "src/hooks/UserContext";
import { ProductProvider } from "src/hooks/ProductContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { NoticeProvider } from "src/hooks/NoticeContext";
import { ContactProvider } from "src/hooks/ContactContext";

const queryClient = new QueryClient();

registerLocale("ko", ko);

axios.defaults.baseURL = "/api/";
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>copyc</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ProductProvider>
            <NoticeProvider>
              <ContactProvider>

                <MobileContext>
                  <Component {...pageProps} />
                  <ToastContainer />
                </MobileContext>

              </ContactProvider>
            </NoticeProvider>
          </ProductProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
