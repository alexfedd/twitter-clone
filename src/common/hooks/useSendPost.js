import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../setup/auth";
import { useUpdateData } from "./useUpdateData";
import { useGetDocData } from "./useGetDocData";
export function useSendPost(setError, numberOfPosts, parentPostData) {
  const authorId = useSelector((state) => state.auth.currentUserID);
  const { data: authorData } = useGetDocData(authorId, 'users');
  const queryClient = useQueryClient();
  const handleUpdateUser = useUpdateData(-1, 'users');
  const hadnleUpdatePost = useUpdateData(-1, 'posts')
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
    onSuccess: async (data, inputData) => {
      await handleUpdateUser.mutateAsync({
        uid: authorId,
        newField: { posts: [...authorData?.data().posts, data.path] },
      });
      console.log(inputData);
      if(inputData?.parentPost && inputData.parentPost !== '') {
        await hadnleUpdatePost.mutateAsync({uid: inputData.parentPost, newField: {comments: [...parentPostData?.data().comments, data.id]}})
        await queryClient.invalidateQueries({queryKey: ['postData', inputData.parentPost]});
      }
      await queryClient.invalidateQueries({
        queryKey: ["posts", numberOfPosts],
      });
    },
  });
}
