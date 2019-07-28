import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;

function create(initialState, apiHost) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  const isBrowser = typeof window !== 'undefined';
  const isDevelopmentMode = process.env.NODE_ENV === 'development';
  let uri;
  if (isDevelopmentMode) {
    uri = isBrowser ? 'http://localhost:4000' : 'http://backend:4000'; // Server URL (Docker handles backend resolution automatically)
  } else {
    uri = apiHost;
  }
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri,
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      // Use fetch() polyfill on the server
      fetch: !isBrowser && fetch
    }),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState, apiHost) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return create(initialState, apiHost);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, apiHost);
  }

  return apolloClient;
}
