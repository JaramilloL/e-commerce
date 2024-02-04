// en este componente solo el administrador puede agregar prosuctos nuevos a la base de datos

//vamos a usar react-hook-form para la validacion de los campos
import { addDoc, collection } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { bd } from "../firebase/firebaseConfig";
import { UserContext } from "../context/UserContext";
import { Navigate, Link } from "react-router-dom";
import FormProduct from "./FormProduct";

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
          <FormProduct onSubmite={onSubmite} register={register} createProduct={createProduct}/>
          <ToastContainer autoClose={4000} />
        </div>
      ) : (
        <Navigate to={"/login"} />
      )}
    </div>
  );
};

export default AddProduct;
