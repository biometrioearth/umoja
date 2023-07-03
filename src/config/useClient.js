import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BALAM_URL,
});

const authLink = setContext(async (_, { headers }) => {
  const response = await fetch(`${process.env.REACT_APP_BALAM_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `mutation {
              tokenAuth(
                  username: "brenda",
                  password: "admin12345"
              ) {
                  token
              }
          }`,
    }),
  });

  const parsedResponse = await response.json();
  const { token } = parsedResponse.data.tokenAuth;
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
