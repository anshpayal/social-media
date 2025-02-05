import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const SUPABASE_GRAPHQL_URL = "https://cfhqyojxrrjucpnpihpf.supabase.co/graphql/v1";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmaHF5b2p4cnJqdWNwbnBpaHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2NzY5NzksImV4cCI6MjA1NDI1Mjk3OX0.8Zx4T0ePFcwzsWpAEtjASs5GNibbIxxdGlmJAlQaq8s";

const client = new ApolloClient({
  link: createHttpLink({
    uri: SUPABASE_GRAPHQL_URL,
    headers: {
      apikey: SUPABASE_ANON_KEY,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
