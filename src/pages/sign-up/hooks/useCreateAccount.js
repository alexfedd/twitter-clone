import { useMutation } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth } from "../../../setup/auth";
import { useDispatch } from "react-redux";
import { resetCurrentUser } from "../../../setup/store/reducers/authSlice";
import { useNavigate } from "react-router-dom";

export function useCreateAccount(setError) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data) =>
      createUserWithEmailAndPassword(auth, data.email, data.password),
    onError: (error) => {
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setError("root", { message: "Email is already taken" });
      } else {
        setError("root", { message: "Something went wrong" });
      }
    },
    onSuccess: async (res) => {
       await sendEmailVerification(res.user);
       await signOut(auth).then(() => {
        dispatch(resetCurrentUser());
        navigate("/sign-in");
      });
    },
  });
}
