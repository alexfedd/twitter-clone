import * as yup from "yup";

export const registrationSchema = yup.object().shape({
    nickname: yup.string().matches(/^[a-zA-Z0-9_]+$/, 'You can use only latine letters, numbers and _ in your nickname').required("Nickname is required"),
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

export const initialDataBaseSchema = (email, nickname) => ({
  banner: '',
  pfp: 'default_pfp.svg',
  description: '',
  email: email,
  followers: [],
  following: [],
  joinDate: new Date(),
  location: '',
  name: nickname,
  nickname: `@${nickname}`,
  posts: []
})