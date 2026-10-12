import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'

const route = window.__PAGE__?.route ?? window.location.pathname
const rootElement = document.getElementById('app')
const app = (
  <React.StrictMode>
    <App route={route} />
  </React.StrictMode>
)

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app)
} else {
  createRoot(rootElement).render(app)
}