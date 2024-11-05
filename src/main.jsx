import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import ShareContext from './contexts/ShareContext.jsx'
import TokenContext from './contexts/TokenContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ShareContext>
        <TokenContext>
          <App />
        </TokenContext>
      </ShareContext>
    </BrowserRouter>
  </StrictMode>,
)
