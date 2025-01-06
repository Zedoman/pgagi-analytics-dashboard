"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Use state to track hydration
  const [hydrated, setHydrated] = React.useState(false);

  // Add the hydrated class after the component mounts
  React.useEffect(() => {
    setHydrated(true);
    document.body.classList.add("hydrated");
    return () => {
      document.body.classList.remove("hydrated");
    };
  }, []);

  // Avoid rendering the children until hydration is complete
  if (!hydrated) return null;

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
