import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n/i18n' // Import i18n configuration
import App from './App'
import './index.css'

console.log('React mounting started...')
const rootElement = document.getElementById('root')
console.log('Root element:', rootElement)

if (!rootElement) {
  console.error('Root element not found!')
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
  console.log('React mounted successfully')
} 