import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css'
import App from './App'
import mockBackend from './mockBackend';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const client = new QueryClient();

// Start the mock backend
if (import.meta.env.MODE === 'development') {
  mockBackend();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
