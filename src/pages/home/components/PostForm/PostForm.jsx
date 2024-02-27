import { useForm } from "react-hook-form";
import { useGetFileByURL } from "./../../../../common/hooks/useGetFileByUrl";
import { yupResolver } from "@hookform/resolvers/yup";
import { postSchema } from "../../../../common/models";
import ErrorMessage from "../../../../common/components/formErrorMessage/ErrorMessage";
import { useSendPost } from "../../../../common/hooks/useSendPost";
import "./style.scss";

function PostForm({ currentUserData, numberOfPosts }) {
  const { data: currentUserPfp, isLoading } = useGetFileByURL(
    currentUserData?.data().pfp
  );
  const {
    handleSubmit,
    setError,
    reset,
    register,
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(postSchema) });
  const handleSendPost = useSendPost(setError, numberOfPosts);

  const handleChange = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const onSubmit = async (data) => {
    await handleSendPost.mutateAsync(data);
    reset();
  };
  if (isLoading) {
    return;
  }
  return (
    <form className="post-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="post-form__pfp-wrapper">
        <img src={currentUserPfp} alt="" className="post-form__pfp" />
      </div>
      <textarea
        rows={1}
        className="post-form__input"
        placeholder="What's up?"
        {...register("content")}
        onChange={(e) => {
          handleChange(e);
          trigger("content"); // Для повторной валидации при изменении содержимого
        }}
      ></textarea>
      <button disabled={handleSendPost.isPending} className="post-form__button">
        {handleSendPost.isPending ? "Posting..." : "Post"}
      </button>
      {errors.root && <ErrorMessage errorMessage={errors.root.message} />}
    </form>
  );
}

export default PostForm;
