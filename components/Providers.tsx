'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useAppSelector } from '@/store/hooks';
import { useMemo, useState, useEffect } from 'react';

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const themeMode = useAppSelector((state) => state.table?.theme || 'light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#dc004e',
          },
        },
      }),
    [themeMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Provider store={store}>
      {isClient ? (
        <PersistGate loading={null} persistor={persistor}>
          <ThemeWrapper>{children}</ThemeWrapper>
        </PersistGate>
      ) : (
        <ThemeWrapper>{children}</ThemeWrapper>
      )}
    </Provider>
  );
}
