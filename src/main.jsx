import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import './index.css'
import App from './App.jsx'

// Start Mock Service Worker
import { worker } from './mocks/browser.js'

// Start the service worker before rendering the app
worker.start({
  onUnhandledRequest: 'bypass', // Don't warn about non-API requests
}).then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  )
})
