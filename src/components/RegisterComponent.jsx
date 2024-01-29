//este componente manejara el registro del usuario

//todo importamos la libreria de react form para las validaciones
import { useForm } from 'react-hook-form'

const RegisterComponent = () => {
  const { handleSubmit, register, reset, formState: { errors } } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    reset();
  })

  return (
    <form className="container m-auto w-50 mt-5" onSubmit={onSubmit}>
    <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          name='username'
          {
            ...register('username', { 
              required: {
                value: true,
                message: 'User name is required'
              }
            })
          }
        />
        <label htmlFor="floatingInput">User-Name</label>
      </div>
      { errors?.username?.message }

      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          name='email'
          {
            ...register('email', { 
              required: {
                value: true,
                message: 'Email is required'
              }
            })
          }
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      { errors?.email?.message }
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          name='password'
          {
            ...register('password', { 
              required: {
                value: true,
                message: 'Password is required'
              }
            })
          }
        />
        <label htmlFor="floatingPassword">Password</label>
      { errors?.password?.message }
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <input className="btn btn-success mt-1 w-25" type="submit" value="Submite" />
      </div>
    </form>
  )
}

export default RegisterComponent