const { ApolloClient, InMemoryCache } = require('@apollo/client');

const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  cache: new InMemoryCache(),
});

export default client;
