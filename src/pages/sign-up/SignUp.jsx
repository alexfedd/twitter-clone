import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../common/components/formErrorMessage/ErrorMessage";
import { useCreateAccount } from "./hooks/useCreateAccount";
import { registrationSchema } from "./models";
import './style.scss'


function SignUp() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registrationSchema) });
  const createAccountMutation = useCreateAccount(setError);

  const onSubmit = async (data) => {
    await createAccountMutation.mutateAsync(data);
  };


  return (
    <div className="container container__sign-container">
      <div className="form-wrapper">
        <h1 className="form-wrapper__title">Create your account</h1>
        <form
          className="form-wrapper__form sign-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            className="sign-form__input input"
            style={errors.nickName && {border: '1px solid rgb(243, 59, 59)'}}
            placeholder="Nickname"
            {...register("nickName")}
          />
          {errors.nickName && (
            <ErrorMessage errorMessage={errors.nickName.message} />
          )}
          <input
            type="email"
            className="sign-form__input input"
            style={errors.email && {border: '1px solid rgb(243, 59, 59)'}}
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <ErrorMessage errorMessage={errors.email.message} />}
          <input
            type="password"
            className="sign-form__input input"
            style={errors.password && {border: '1px solid rgb(243, 59, 59)'}}
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <ErrorMessage errorMessage={errors.password.message} />
          )}
          <input
            type="password"
            className="sign-form__input input"
            style={errors.confirmPassword && {border: '1px solid rgb(243, 59, 59)'}}
            placeholder="Confirm password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <ErrorMessage errorMessage={errors.confirmPassword.message} />
          )}
          <div className="sign-form__sign-option">
            <span className="sign-form__span">Already have an account?</span>
            <Link className="sign-form__link" to={"/sign-in"}>
              Sign in
            </Link>
          </div>
          {errors.root && <ErrorMessage errorMessage={errors.root.message} />}
          <button disabled={createAccountMutation.isPending} type="submit" className="sign-form__button">
            {createAccountMutation.isPending ? 'In progress' : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
