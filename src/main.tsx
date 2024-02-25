import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import 'primereact/resources/themes/saga-green/theme.css'

import 'primeicons/primeicons.css'
import { PrimeReactProvider } from 'primereact/api'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>
)
