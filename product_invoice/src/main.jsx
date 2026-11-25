import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProductInvoice from './product_invoice.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductInvoice />
  </StrictMode>,
)
