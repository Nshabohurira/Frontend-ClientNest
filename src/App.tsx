import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import AppRouter from './router';
import { AppProvider } from './contexts/AppContext';
import { ThemeProvider } from './contexts/ThemeContext';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Aggressively clear all cached state
    localStorage.clear();
    sessionStorage.clear();

    // Clear specific auth storage
    localStorage.removeItem('auth-storage');
    localStorage.removeItem('zustand');

    // Clear any cookies
    document.cookie.split(';').forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });

    console.log('All cached state cleared');
  }, []);

  return (
    <ThemeProvider>
      <AppProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppRouter />
          </TooltipProvider>
        </QueryClientProvider>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
