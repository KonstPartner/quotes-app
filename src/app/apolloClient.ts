import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';

import { GRAPHQL_API_BASE_URL } from '@constants/api';

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_API_BASE_URL,
  }),
  cache: new InMemoryCache(),
});
