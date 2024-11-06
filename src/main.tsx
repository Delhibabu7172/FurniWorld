import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './components/scrollToTop/index.tsx'
import { Toaster } from 'react-hot-toast'
import Router from './Router/index.tsx'
import ProvidersRedux from './redux/ProvidersRedux.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
        <ScrollToTop/>
        <ProvidersRedux>
        <Router />
        </ProvidersRedux>
        </BrowserRouter>
        <Toaster
        position='top-right'
        toastOptions={{className: 'react-hot-toast'}}
        />
    </QueryClientProvider>
    
  </StrictMode>,
)
