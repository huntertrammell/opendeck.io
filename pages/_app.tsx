import "../styles/globals.css";
import "../lib/pubsub";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Header } from "../components/navigation/header";
import { Layout } from "../components/layout/default";
import { Footer } from "../components/navigation/footer";
import { Alert } from "../components/ui/alert";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  
  return (
    <SessionProvider session={session}>
      <Header />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Footer />
      <Alert />
    </SessionProvider>
  );
}

export default MyApp;
