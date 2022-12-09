import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeContext } from "../components/Context/ThemeContext";
import { lightTheme } from "../components/utils/theme";
import { AppManagerContext } from "../components/AppManag.tsx/AppContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppManagerContext>
      <ThemeContext.Provider value={lightTheme}>
        <Head>
          <title>TechLand panel Admin 🖋️</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1"
          />
          <meta name="description" content="panel Admin" />
          {/* <link rel="icon" href="/favicon.ico" /> */}
        </Head>
        <Component {...pageProps} />
      </ThemeContext.Provider>
    </AppManagerContext>
  );
}

export default MyApp;
