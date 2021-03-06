import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
// Jest でも動かす必要があるので cross-fetch を使用する
import fetch from "cross-fetch";

const gqlEndpoint = "http://localhost:5000/graphql";

const client = new ApolloClient({
  uri: gqlEndpoint,
  link: new HttpLink({ uri: gqlEndpoint, fetch }),
  cache: new InMemoryCache(),
});

export default client;
