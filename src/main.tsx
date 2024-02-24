import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "./theme";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

console.log(import.meta.env.VITE_APP_GRAPHQL_ENDPOINT);
const client = new ApolloClient({
  uri: import.meta.env.VITE_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
