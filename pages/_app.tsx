/* eslint-disable @next/next/no-page-custom-font */
import type { AppProps } from "next/app";

import CssBaseline from "@mui/material/CssBaseline";

import Head from "next/head";

import "./styles.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>

      <CssBaseline />

      <Component {...pageProps} />

      <ToastContainer position="bottom-left" />
    </main>
  );
}
