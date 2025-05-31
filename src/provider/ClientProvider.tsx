"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { ReactQueryProvider } from "@/provider/ReactQueryProvider";
import ReduxProvider from "./ReduxProvider";

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ReactQueryProvider>
      <ReduxProvider>{children}</ReduxProvider>
      {mounted && (
        <Toaster
          position="top-right"
          toastOptions={{ className: "rounded-md shadow-lg mt-16" }}
        />
      )}
    </ReactQueryProvider>
  );
}
