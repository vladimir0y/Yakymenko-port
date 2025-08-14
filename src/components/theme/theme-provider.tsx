'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ComponentProps } from 'react';

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

interface CustomThemeProviderProps
  extends Omit<ThemeProviderProps, 'children'> {
  children: React.ReactNode;
}

export function ThemeProvider({
  children,
  ...props
}: CustomThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="portfolio-theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
