import React from 'react'
import ReactDOM from 'react-dom/client'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {RouterProvider} from "react-router-dom"
import router from "./router.jsx"
import './index.css'
import './script.js'
import { UtilProvider } from './context/UtilContext.jsx'
import { MainProvider } from './context/MainContext.jsx'
import { MinimizedProvider } from './context/MinimizedContext.jsx'

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <UtilProvider>
        <MainProvider>
          <MinimizedProvider>
            <RouterProvider router={router} />
          </MinimizedProvider>
        </MainProvider>
      </UtilProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)