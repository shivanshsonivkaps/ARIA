// app/providers.tsx
"use client";
import { persistor, store } from "@/lib/store";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </NextUIProvider>
  );
}
