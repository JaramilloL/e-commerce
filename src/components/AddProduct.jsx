// en este componente solo el administrador puede agregar prosuctos nuevos a la base de datos

//vamos a usar react-hook-form para la validacion de los campos
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const AddProduct = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
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
  }, [errors.nameProduct]);

  return (
    <div className="container m-a">
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
          ></input>
        </div>
        <div className="d-flex justify-content-center align-content-center align-items-center">
          <input
            type="submit"
            value="Enter"
            className="btn btn-light text-success border-success m-3"
          />
        </div>
      </form>
      <ToastContainer autoClose={2000}/>
    </div>
  );
};

export default AddProduct;
