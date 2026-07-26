import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App'

const route = window.__PAGE__?.route ?? window.location.pathname

hydrateRoot(
  document.getElementById('app'),
  <React.StrictMode>
    <App route={route} />
  </React.StrictMode>
)