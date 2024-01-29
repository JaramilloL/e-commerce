//este componentes solo tendra la logica de cada cazo en especifico es decir si esta o no logeado el usuario y el acceso

const ReducerContext = (state, action) => {
  //mediante el estado y la accion se le dira en que caso deve acceder o no el usuario
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      }
  
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
  }
}

export default ReducerContext