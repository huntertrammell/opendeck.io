import "../styles/globals.css";
import "../lib/pubsub";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Header } from "../components/navigation/header";
import { Layout } from "../components/layout/default";
import { Footer } from "../components/navigation/footer";
import { Alert } from "../components/ui/alert";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
        <title>opendeck</title>
        <meta
          name="description"
          content="Opendeck is an open source deck building platform that facilitates the creation and organization of playable cards. The cards and decks created by the community can then be consumed via API for use in custom games."
        />
        <meta property="og:url" content="https://opendeck.dev/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="opendeck" />
        <meta
          property="og:description"
          content="Opendeck is an open source deck building platform that facilitates the creation and organization of playable cards. The cards and decks created by the community can then be consumed via API for use in custom games."
        />
        <meta property="og:image" content="https://opendeck.dev/social.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="opendeck.dev" />
        <meta property="twitter:url" content="https://opendeck.dev/" />
        <meta name="twitter:title" content="opendeck" />
        <meta
          name="twitter:description"
          content="Opendeck is an open source deck building platform that facilitates the creation and organization of playable cards. The cards and decks created by the community can then be consumed via API for use in custom games."
        />
        <meta
          name="twitter:image"
          content="https://opendeck.dev/social.png"
        ></meta>
      </Head>
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
