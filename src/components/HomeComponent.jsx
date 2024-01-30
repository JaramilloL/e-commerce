//este componente se centrara en la pagina inicial donde se muestran los datos de los productos

import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const HomeComponent = () => {
  const { notAuth } = useContext(UserContext)

  return (
    <div>
    HomeComponent
    <div className="d-flex justify-content-end align-content-end align-items-end m-3">
      <button onClick={notAuth} className="btn btn-close"></button>
    </div>
      
    </div>
  )
}

export default HomeComponent