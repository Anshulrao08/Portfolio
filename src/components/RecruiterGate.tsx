"use client";

import React from "react";
import { useApp } from "./Providers";
import { RecruiterView } from "./RecruiterView";

export function RecruiterGate({ children }: { children: React.ReactNode }) {
  const { recruiterMode } = useApp();
  if (recruiterMode) {
    return <RecruiterView />;
  }
  return <>{children}</>;
}
