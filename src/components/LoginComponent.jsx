//este sera el compnente que manejara el login y sus actividades

//todo llamamos a useform para las validaciones y actualizaciones de datos de login
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.jpg";
//implementacion de las notificaciones de error
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const LoginComponent = () => {
  //creamos el contexto de la app
  const {signIn, isAuth} = useContext(UserContext)

  //creamos un navigate para reenviar al home
  const navigateUser = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async(data) => {
    try {
      await signIn(data.email, data.password)
      isAuth()
      navigateUser('/home')
    } catch (error) {
      if (error.code === "auth/invalid-credential")
        toast.error("Usuario no registrado");
      if (error.code === "auth/too-many-requests")
        toast.error("Demasiados intentos");
    }
    console.log(data);
    reset();
  });

  //todo creamos un useeffect para la llamada de errores
  useEffect(() => {
    if (errors.email) {
      toast.error(errors.email.message);
    }
    if (errors.password) {
      toast.error(errors.password.message);
    }
  }, [errors.email, errors.password]);

  return (
    <form className="container m-auto w-50 mt-5" onSubmit={onSubmit}>
      <div className="">
        <img className="size-img " src={Logo} alt="placeholder" />
      </div>
      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          name="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      {/* {toast.error(errors?.email?.message)} */}

      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          name="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
        />
        <label htmlFor="floatingPassword">Password</label>
        {/* {toast.error(errors?.password?.message)} */}
      </div>
      <div className="d-flex justify-content-evenly align-items-center">
        <input
          className="btn btn-success mt-2 w-25"
          type="submit"
          value="Submite"
        />
        <Link to={"/register"} className="btn btn-success mt-2 w-25">
          Register
        </Link>
      </div>
      <ToastContainer autoClose={2000}/>
    </form>
  );
};

export default LoginComponent;
