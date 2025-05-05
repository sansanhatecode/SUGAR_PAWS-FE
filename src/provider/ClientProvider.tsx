"use client";

import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { ReactQueryProvider } from "@/provider/ReactQueryProvider";
import "react-toastify/dist/ReactToastify.css";
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
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="mt-16"
          toastClassName="rounded-md shadow-lg"
        />
      )}
    </ReactQueryProvider>
  );
}
