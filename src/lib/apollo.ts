import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://YOUR_SUPABASE_URL/graphql/v1',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer YOUR_PUBLIC_ANON_KEY`,
  },
});
