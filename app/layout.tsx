"use client";

import './globals.css';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../lib/store"; // Ensure correct path
import TopBar from "@/components/TopBar";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <TopBar />
              <div className="min-h-screen bg-cover bg-primary bg-center bg-[url('/images/bg.png')]">

              {children}
              </div>
            </PersistGate>
          </Provider>
        </I18nextProvider>
      </body>
    </html>
  );
}
