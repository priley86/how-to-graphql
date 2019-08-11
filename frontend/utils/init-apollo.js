import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;

function create(initialState, { apiHost, getToken }) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  const isBrowser = typeof window !== 'undefined';
  const isDevelopmentMode = process.env.NODE_ENV === 'development';
  let uri;
  if (isDevelopmentMode) {
    // set this back to localhost:4000 if using `now dev` to debug Next.js server side
    uri = isBrowser ? 'http://localhost:4000' : 'http://backend:4000'; // Server URL (Docker handles backend resolution automatically)
  } else {
    uri = apiHost;
  }

  const httpLink = new HttpLink({
    uri,
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    // Use fetch() polyfill on the server
    fetch: !isBrowser && fetch
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken && getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
