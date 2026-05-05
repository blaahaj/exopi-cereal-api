"use client";

import type { ApiKeyString } from "@lib/ApiKeyString";
import {
  createContext,
  type Provider,
  type ReactNode,
  useContext,
  useState,
} from "react";

interface T {
  getApiKey: () => ApiKeyString | null;
  setApiKey: (v: ApiKeyString | null) => void;
}

const nullT: T = {
  getApiKey: () => null,
  setApiKey: () => null,
};

const context = createContext<T>(nullT);
const Provider = context.Provider;

export const ApiKeyProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState<ApiKeyString | null>(null);

  const t: T = {
    getApiKey: () => value,
    setApiKey: (v) => setValue(v),
  };

  return <Provider value={t}>{children}</Provider>;
};

export default function useApiKey() {
  return useContext(context);
}
