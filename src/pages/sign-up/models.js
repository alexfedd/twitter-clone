import * as yup from "yup";

export const registrationSchema = yup.object().shape({
    nickName: yup.string().required("Nickname is required"),
    email: yup.string().email("Wrong email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password length is atleast 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords doesn't match")
      .required("Confirm password is required"),
  });