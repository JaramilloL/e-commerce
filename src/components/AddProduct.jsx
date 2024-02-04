// en este componente solo el administrador puede agregar prosuctos nuevos a la base de datos

//vamos a usar react-hook-form para la validacion de los campos
import { addDoc, collection } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { bd } from "../firebase/firebaseConfig";
import { UserContext } from "../context/UserContext";
import { Navigate, Link } from "react-router-dom";

const AddProduct = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmite = handleSubmit((data) => {
    console.log(data);
    reset();
  });

  //controlamos los errores desde que se inicia la pagina
  useEffect(() => {
    if (errors.nameProduct) {
      toast.error(errors.nameProduct.message);
    }
    if (errors.description) {
      toast.error(errors.description.message);
    }
    if (errors.price) {
      toast.error(errors.price.message);
    }
    if (errors.image) {
      toast.error(errors.image.message);
    }
    if (errors.available) {
      toast.error(errors.available.message);
    }
  }, [
    errors.nameProduct,
    errors.description,
    errors.price,
    errors.image,
    errors.available,
  ]);

  //creamos una funcion para enviar los datos del formulario
  const createProduct = async () => {
    const name = getValues("nameProduct");
    const description = getValues("description");
    const price = getValues("price");
    const image = getValues("image");
    const available = getValues("available");

   if(name && description && price && image && available) {
    try {
      const getProduct = await addDoc(collection(bd, "e-commerce"), {
        name: name,
        description: description,
        price: price,
        image: image,
        available: available,
      });
      console.log("this is id: " + getProduct.id);
      toast.success("Registro creado correctamente");
    } catch (error) {
      console.log(error);
    }
   }else{
    toast.error('llene los campos requeridos por favor');
   }
  };
  //usamos el estado paea traer si est o no autorizado
  const { state, notAuth } = useContext(UserContext);

  return (
    <div className="container m-a">
      {state.isAuthenticated ? (
        <div>
          <Link className="btn btn-primary mt-2" to={"/home "}>
            Home
          </Link>
          <div className="d-flex justify-content-end align-item-end">
            <button className="btn btn-close mt-2" onClick={notAuth}></button>
          </div>

          <form
            className="form-control w-50 m-auto mt-5 text-center"
            onSubmit={onSubmite}
          >
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="inputName"
              className="form-control"
              aria-describedby="passwordHelpBlock"
              name="nameProduct"
              {...register("nameProduct", {
                required: {
                  value: true,
                  message: "nombre es requerido",
                },
              })}
            ></input>

            <label htmlFor="inputDescrfiption" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              id="inputDescrfiption"
              className="form-control"
              aria-describedby="passwordHelpBlock"
              name="description"
              {...register("description", {
                required: {
                  value: true,
                  message: "Descripcion es requerida",
                },
              })}
            ></textarea>

            <label htmlFor="inputPrice" className="form-label">
              Price
            </label>
            <input
              type="number"
              id="inputPrice"
              className="form-control"
              aria-describedby="passwordHelpBlock"
              name="price"
              {...register("price", {
                required: {
                  value: true,
                  message: "precio es requerido",
                },
              })}
            ></input>

            <label htmlFor="inputImage" className="form-label">
              Image
            </label>
            <input
              type="text"
              id="inputImage"
              className="form-control"
              aria-describedby="passwordHelpBlock"
              name="image"
              {...register("image", {
                required: {
                  value: true,
                  message: "imagen es requerida",
                },
              })}
            ></input>

            <label htmlFor="inputAvailable" className="form-label">
              Available
            </label>
            <div className="d-flex justify-content-center align-content-center align-items-center">
              <input
                type="checkbox"
                id="inputAvailable"
                className="form-control form-check-input border-primary"
                aria-describedby="passwordHelpBlock"
                name="available"
                {...register("available", {
                  required: {
                    message: "La exisencia es requerida",
                  },
                })}
              ></input>
            </div>
            <div className="d-flex justify-content-center align-content-center align-items-center">
              <input
                type="submit"
                value="Enter"
                className="btn btn-light text-success border-success m-3"
                onClick={createProduct}
              />
            </div>
          </form>
          <ToastContainer autoClose={4000} />
        </div>
      ) : (
        <Navigate to={"/login"} />
      )}
    </div>
  );
};

export default AddProduct;
