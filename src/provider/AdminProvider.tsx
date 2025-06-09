"use client";

import React from "react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

interface AdminProviderProps {
  children: React.ReactNode;
}

const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  return <MantineProvider>{children}</MantineProvider>;
};

export default AdminProvider;
