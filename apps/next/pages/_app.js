import React from 'react'
import Head from 'next/head'

if (!global.requestAnimationFrame) {
  global.requestAnimationFrame = () => {
    /** nothing */
  }
}

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
