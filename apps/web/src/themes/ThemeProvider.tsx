'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import type { PropsWithChildren } from 'react';
import React, { useEffect, useState } from 'react';

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <NextThemeProvider attribute="class">
      {children}
    </NextThemeProvider>
  );
};

export default ThemeProvider;
