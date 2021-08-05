
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: process.env.CMS_GRAPHQL_URL || 'http://localhost:1337/graphql',
    cache: new InMemoryCache(),
})
