import { useMutation } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../../setup/auth";
import { useDispatch } from "react-redux";
import { resetCurrentUser } from "../../../setup/store/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { initialDataBaseSchema } from "../models";

export function useCreateAccount(setError, reset) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userCollection = collection(db, "users");
  const createUserWithEmailMutation = useMutation({
    mutationFn: (data) =>
      createUserWithEmailAndPassword(auth, data.email, data.password),
    onError: (error) => {
      reset({
        confirmPassword: ''
      })
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setError("root", { message: "Email is already taken" });
      } else {
        setError("root", { message: "Something went wrong" });
      }
    },
    onSuccess: async (res, data) => {
      try {
        if (await checkNicknameExist(`@${data.nickname}`)) {
          throw new Error("Nickname is already used");
        }
        await createUserDoc(res, data);
        await sendEmailVerification(res.user);
        await signOutUser();
      } catch (error) {
        reset({
          password: '',
          confirmPassword: ''
        })
        if (error.message === "Nickname is already used") {
          setError('nickname', {message: error.message})
        } else {
          setError("root", { message: error.message });
        }
        dispatch(resetCurrentUser());
        deleteUser(auth.currentUser);
      }
    },
  });

  const checkNicknameExist = async (nickname) => {
    const serverQuery = query(
      userCollection,
      where("nickname", "==", nickname)
    );
    return !(await getDocs(serverQuery)).empty;
  };

  const createUserDoc = async (res, data) => {
    const userDoc = doc(userCollection, res.user.uid);
    await setDoc(userDoc, initialDataBaseSchema(data.email, data.nickname));
  };

  const signOutUser = async () => {
    await signOut(auth);
    dispatch(resetCurrentUser());
    navigate("/sign-in");
  };

  return createUserWithEmailMutation;
}
