import React from "react";
import {
  ResetDialog,
  GenericFallback,
  ThemeProvider,
  appkitTranslations,
} from "@dxos/react-appkit";
import { ClientProvider } from "@dxos/react-client";
import { Config, Dynamics, Local, Defaults } from "@dxos/config";
import { ErrorBoundary } from "./ErrorBoundary";

import "./index.css";

// Dynamics allows configuration to be supplied by the hosting KUBE.
const config = async () => new Config(await Dynamics(), Local(), Defaults());

export const App = () => {
  return (
    <ThemeProvider
      appNs="todos"
      resourceExtensions={[appkitTranslations]}
      fallback={<GenericFallback />}
    >
      <ErrorBoundary
        fallback={({ error }) => <ResetDialog error={error} config={config} />}
      >
        <ClientProvider config={config} fallback={GenericFallback}>
          hola
        </ClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};
