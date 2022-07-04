import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Header } from "../components/navigation/header";
import { Layout } from "../components/layout/default";
import { Footer } from "../components/navigation/footer";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Header />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Footer />
    </SessionProvider>
  );
}

export default MyApp;
