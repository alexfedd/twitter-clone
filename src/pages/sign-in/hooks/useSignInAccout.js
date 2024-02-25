import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../setup/auth";
import { useDispatch } from "react-redux";
import { initializeUser } from "../../../setup/store/reducers/authSlice";
import { useNavigate } from "react-router-dom";

export function useSignInAccount(setError) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data) =>
      signInWithEmailAndPassword(auth, data.email, data.password),
    onError: (error) => {
      console.log(error.message);
      switch (error.message) {
        case "Firebase: Error (auth/invalid-credential).":
          setError("root", { message: "Wrong email or password" });
          break;
        case "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
          setError("root", { message: "Too many attemps. Try later" });
          break;
        default:
          setError("root", { message: "Something went wrong" });
          break;
      }
    },
    onSuccess: () => {
      dispatch(initializeUser());
      navigate("/");
    },
  });
}
