import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../setup/auth";
import { useUpdateData } from "./useUpdateData";
import { useGetUserData } from "./useGetUserData";
export function useSendPost(setError, numberOfPosts) {
  const authorId = useSelector((state) => state.auth.currentUserID);
  const { data: authorData } = useGetUserData(authorId);
  const queryClient = useQueryClient();
  const handleUpdateUser = useUpdateData(-1);
  return useMutation({
    mutationFn: async (data) => {
      const newDocData = {
        ...data,
        authorId: authorId,
        comments: [],
        date: new Date(),
        likes: [],
      };
      const collectionRef = collection(db, "posts");
      return await addDoc(collectionRef, newDocData);
    },
    onError: (error) => {
      console.log(error.message);
      setError("root", { message: "Something went wrong! Try later" });
    },
    onSuccess: async (data) => {
      await handleUpdateUser.mutateAsync({
        uid: authorId,
        newField: { posts: [...authorData?.data().posts, data.path] },
      });
      await queryClient.invalidateQueries({
        queryKey: ["posts", numberOfPosts],
      });
    },
  });
}
