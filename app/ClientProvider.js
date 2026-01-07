"use client";

import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "@/redux/store/store";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3000,
    },
  },
});

export default function ClientProvider({ children }) {
  return (
    <SnackbarProvider autoHideDuration={3000}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    </SnackbarProvider>
  );
}
