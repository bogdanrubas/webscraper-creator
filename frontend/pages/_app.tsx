import { ApolloClient, InMemoryCache, createHttpLink, from, split, ApolloProvider } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import React, { useEffect, useState } from 'react';
import Head from "next/head";
import { useRouter } from 'next/router';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import GlobalStyle from "../config/globalStyles";
import type { AppProps } from 'next/app';
import AccountBody from 'layout/AccountBody';
import AccountHeader from 'layout/AccountHeader';
import { GlobalContextProvider } from 'ctx/globalCtx';

let apolloClient: any;

const wsLink: any = process.browser ? new WebSocketLink({
  uri: `ws://localhost:3000/graphql`,
  options: {
    reconnect: true
  }
}) : null;

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include'
});


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const splitLink = process.browser ? split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
) : httpLink;

apolloClient = new ApolloClient({
  link: from([authLink, splitLink]),
  cache: new InMemoryCache()
});


function MyApp({ Component, pageProps }: AppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const url = window.location.href;

    if (url.search("account") !== -1) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [router.asPath]);

  return (
    <>
      <Head>
        <title>Bots</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </Head>

      <GlobalStyle />

      <div id="modals" />

      <ApolloProvider client={apolloClient}>
        <GlobalContextProvider>
          {isLoggedIn ? (
            <>
              <AccountHeader />
              <AccountBody>
                <Component {...pageProps} />
              </AccountBody>
            </>
          ) : (
            <Component {...pageProps} />
          )}
        </GlobalContextProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;