//este componente manipulara el estdo global de la aplicacion incluyendo las funciones
import PropTypes from 'prop-types'
import { UserContext } from './UserContext'
import ReducerContext from './ReducerContext'
import { useReducer } from 'react'
//?el estado resive la propiedad childrem para compartir datos en toda la application

const StateContext = ( { children } ) => {
  const initialState = { 
    isAuthenticated: false,
    user: null,
  }

  //*useReducer lo usamos para la manipulacion del estado en el que se encuentra el logeo
  const [state, dispatch] = useReducer(ReducerContext, initialState)

  //todo lo que contenga la propiedad de value se compartira con toda la app
  return (
    <UserContext.Provider value={{
      state, dispatch
    }}>
      { children }
    </UserContext.Provider>
  )
}

export default StateContext

//le pasamos mediante las props que tipo de elemntos podems esperar
StateContext.propTypes ={
  children: PropTypes.any
}