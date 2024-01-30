//esta sera la pagini inicial despues del logeo del usuario

import { useContext } from "react"
import HomeComponent from "../components/HomeComponent"
import { UserContext } from "../context/UserContext"
import { Navigate } from 'react-router-dom'

const Home = () => {
  const { state } = useContext(UserContext)
  return (
    <div>
    {
      state.isAuthenticated ? (
        <HomeComponent/>
      ):
      (
        <Navigate to={'/login'}/>
      )
    }
        
    </div>
  )
}

export default Home