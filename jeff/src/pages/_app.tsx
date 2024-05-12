// _app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { AuthProvider } from './Context/useAuthContext'; // Adjust import path as needed
import '../styles/globals.css'; // Import your global styles

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
