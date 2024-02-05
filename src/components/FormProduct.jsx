// en este componente se va a desarrollar la parte visual del formulario
import PropTypes from 'prop-types'

const FormProduct = ( { onSubmite, register, createProduct, errors } ) => {
  return (
    <>
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
           <p className='text-danger'> { errors?.nameProduct?.message }</p>

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
           <p className='text-danger'> { errors?.description?.message }</p>


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
           <p className='text-danger'> { errors?.price?.message }</p>


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
           <p className='text-danger'> { errors?.image?.message }</p>


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
                    value: false,
                    message: "La exisencia es requerida",
                  },
                })}
              ></input>
           <p className='text-danger'> { errors?.available?.message }</p>

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
    </>
  )
}

export default FormProduct

FormProduct.propTypes = {
    onSubmite: PropTypes.func,
    register: PropTypes.func,
    createProduct: PropTypes.func,
    errors: PropTypes.string,
}