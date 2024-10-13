import { tokenAtom } from "@/util/atoms.ts";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { useAtomValue } from "jotai";
import { truncate } from "lodash";
import { SnackbarProvider, useSnackbar } from "notistack";
import React, { useMemo } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "./theme";

// tessék bazdmeg voice komment
// vscode extenstion required: AsyncLine
//audio: 5NA6

const AppWithApollo = () => {
  const token = useAtomValue(tokenAtom);

  const { enqueueSnackbar } = useSnackbar();

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((error) => {
        enqueueSnackbar({
          variant: "error",
          message: `[${error.message ?? "GraphQL"}] ${truncate(error.message, { length: 100 })}`,
          autoHideDuration: 5000,
        });
      });
    }

    if (networkError) {
      // handle network error
      enqueueSnackbar({
        variant: "error",
        message: `[${networkError.name ?? "Network"}] ${networkError.message}`,
      });
    }
  });

  const client = useMemo(() => {
    const httpLink = createHttpLink({
      uri: import.meta.env.VITE_APP_GRAPHQL_ENDPOINT,
    });

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });
    return new ApolloClient({
      link: from([errorLink, authLink, httpLink]),
      cache: new InMemoryCache(),
    });
  }, [errorLink, token]);

  console.log("Graphql endpoint:", import.meta.env.VITE_APP_GRAPHQL_ENDPOINT);

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        autoHideDuration={3000}
      >
        <AppWithApollo />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
