import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });
  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      {registerErrors &&
        registerErrors.map(
          (
            err,
            i // Verificamos si registerErrors existe
          ) => (
            <div key={i} className="bg-red-500 p-2 text-white">
              {err}
            </div>
          )
        )}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          {...register("username", { required: true })} // Corregimos el atributo a "required"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="username"
        />
        {errors.username && (
          <p className="text-red-500">Username is required</p>
        )}
        <input
          type="email"
          {...register("email", { required: true })} // Corregimos el atributo a "required"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="email"
        />
        {errors.email && <p className="text-red-500">Email is Required</p>}
        <input
          type="password"
          {...register("password", { required: true })} // Corregimos el atributo a "required"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="password"
        />
        {errors.password && (
          <p className="text-red-500">Password is Required</p>
        )}
        <button type="submit">Register</button>
      </form>
      <p>
        Alredy have an account?{" "}
        <Link to="/login" className="text-sky-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
