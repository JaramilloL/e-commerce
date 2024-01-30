//este componente manipulara el estdo global de la aplicacion incluyendo las funciones
import PropTypes from 'prop-types'
import { UserContext } from './UserContext'
import ReducerContext from './ReducerContext'
import { useReducer } from 'react'
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'
//?el estado resive la propiedad childrem para compartir datos en toda la application

const StateContext = ( { children } ) => {
  const initialState = { 
    isAuthenticated: false,
    user: null,
  }

  //?creasmo una funcion para la creacion de usuarios en el registro
  const registerUser =(email, password)=>//resive los parametros del registro
     createUserWithEmailAndPassword(auth, email, password)

  //?creamos otre funcion para el login
  const signIn = async (emai, password)=> signInWithEmailAndPassword(auth, emai, password)

  //?creamos las funciones que validen la autentiaccion como el acceso a home y cualquier apartado de la ruta
  const isAuth =()=> dispatch( { type: 'LOGIN' } )
  const notAuth =()=> dispatch( { type: 'LOGOUT' } )

  //?creamos la funcion de cerrar sesion 
  const logout = ()=> signOut(auth)

  //?creamos la funcion de recuperacion de password
  const resetPassword = (email)=> sendPasswordResetEmail(auth, email)

  //*useReducer lo usamos para la manipulacion del estado en el que se encuentra el logeo
  const [state, dispatch] = useReducer(ReducerContext, initialState)

  //todo lo que contenga la propiedad de value se compartira con toda la app
  return (
    <UserContext.Provider value={{
      state, dispatch, registerUser, signIn, isAuth, notAuth, logout, resetPassword
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