//este componente manejara el registro del usuario

//todo importamos la libreria de react form para las validaciones
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const RegisterComponent = () => {
  //usamos el contexto para extrar la funcion de register y demas
  const { registerUser } = useContext(UserContext);

  //usamos la navegacion de react-router-dom para enviar al usuario al login
  const navigateUser = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    try {
      //evaluamos si cumplen las condiciones de los campos
      await registerUser(data.email, data.password);
      navigateUser("/login");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/weak-password")
        toast.error("ingrease mas de 6 caracteres");
      if (error.code === "auth/internal-error")
        toast.error("Email invalido ingrese otro");
      if (error.code === "auth/email-already-in-use")
        toast.error("Este correo ya existe, imgrese uno nuevo");
    }

    console.log(data.email, data.password);
    console.log(data);
    reset();
  });

  //todo creamos un effecto en el cual se mantendra al pendiente de los cambios en la entrada de valoes del input
  useEffect(() => {
    if (errors.username) {
      toast.error(errors?.username?.message);
    }
    if (errors.email) {
      toast.error(errors?.email?.message);
    }
    if (errors.password) {
      toast.error(errors?.password?.message);
    }
  }, [errors.email, errors.password, errors.username]);
  return (
    <form className="container m-auto w-50 mt-5" onSubmit={onSubmit}>
      <div className="">
        <img className="size-img " src={Logo} alt="placeholder" />
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingInputUser"
          placeholder="name@example.com"
          name="username"
          {...register("username", {
            required: {
              value: true,
              message: "User name is required",
            },
          })}
        />
        <label htmlFor="floatingInputUser">User-Name</label>
      </div>
      {/* { errors?.username?.message } */}

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
      {/* { errors?.email?.message } */}
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
        {/* { errors?.password?.message } */}
      </div>
            
      <div className="d-flex justify-content-evenly align-items-center">
        <input
          className="btn btn-light text-primary border-primary mt-2 w-50"
          type="submit"
          value="Register"
        />
      </div>
      <div className="d-flex justify-content-evenly align-items-center">
      <Link to={"/login"} className="btn btn-light text-primary border-primary mt-2 w-50">
          Login
        </Link>
      </div>
      <ToastContainer autoClose={2000} />
    </form>
  );
};

export default RegisterComponent;
