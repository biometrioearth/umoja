import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BALAM_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('authData');
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  connectToDevTools: true,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default client;
