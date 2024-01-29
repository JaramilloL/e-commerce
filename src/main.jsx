import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/Routes'
import StateContext from './context/StateContext'
//se creara la conexion con las rutad de react-router-dom

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  {/* el provider resive un parametro el cual es la definicipn de las rutas */}

    <StateContext>
      <RouterProvider  router={routes} />
    </StateContext>
    
  </React.StrictMode>,
)
