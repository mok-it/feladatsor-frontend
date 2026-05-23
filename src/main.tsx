import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { truncate } from "lodash";
import {
  closeSnackbar,
  EnqueueSnackbar,
  SnackbarProvider,
  useSnackbar,
} from "notistack";
import React, { useMemo } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthContextProvider, useAuth } from "./pages/AuthContext.tsx";
import { ThemeProvider } from "./theme";

export const createApolloClient = ({
  token,
  enqueueSnackbar,
}: {
  token: string | null;
  enqueueSnackbar: EnqueueSnackbar;
}) => {
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
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((error) => {
        enqueueSnackbar({
          variant: "error",
          message: truncate(error.message, { length: 100 }),
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
  return new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
  });
};

const AppWithApollo = () => {
  const { token } = useAuth();

  const { enqueueSnackbar } = useSnackbar();

  const client = useMemo(() => {
    return createApolloClient({ token, enqueueSnackbar });
  }, [token, enqueueSnackbar]);

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
          vertical: "bottom",
          horizontal: "center",
        }}
        autoHideDuration={3000}
        action={(snackbarId) => (
          <button
            onClick={() => closeSnackbar(snackbarId)}
            style={{
              background: "none",
              border: "none",
              color: "inherit",
              cursor: "pointer",
              fontSize: "16px",
              padding: "4px 8px",
            }}
          >
            ✕
          </button>
        )}
      >
        <AuthContextProvider>
          <AppWithApollo />
        </AuthContextProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
