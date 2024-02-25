import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "./models";
import { useSignInAccount } from "./hooks/useSignInAccout";
import ErrorMessage from "../../common/components/formErrorMessage/ErrorMessage";
import { useLayoutEffect } from "react";
import { useSelector } from 'react-redux';
function SignIn() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });
  const signInAccountMutation = useSignInAccount(setError);
  const isLoggedIn = useSelector(state => state.auth.userLoggedIn)
  const navigate = useNavigate()

  useLayoutEffect(()=> {
    if(isLoggedIn) {
      navigate('/', true);
    }
  }, [isLoggedIn, navigate])

  const onSubmit = async (data) => {
    await signInAccountMutation.mutateAsync(data);
  };

  return (
    <div className="container container__sign-container">
      <div className="form-wrapper">
        <h1 className="form-wrapper__title">Sign in</h1>
        <form
          className="form-wrapper__form sign-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            className="sign-form__input input"
            style={errors.email && {border: '1px solid rgb(243, 59, 59)'}}
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <ErrorMessage errorMessage={errors.email.message} />}
          <input
            type="password"
            className="sign-form__input input"
            style={errors.email && {border: '1px solid rgb(243, 59, 59)'}}
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <ErrorMessage errorMessage={errors.password.message} />
          )}
          <div className="sign-form__sign-option">
            <span className="sign-form__span">Dont have an account?</span>
            <Link className="sign-form__link" to={"/sign-up"}>
              Sign up
            </Link>
          </div>
          {errors.root && <ErrorMessage errorMessage={errors.root.message} />}
          <button className="sign-form__button">Sign in</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
