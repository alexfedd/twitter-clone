import { useNavigate } from "react-router-dom";
import UpperBar from "../../common/components/upperBar/upperBar";
import { useSelector } from "react-redux";
import Loader from "../../common/components/loader/loader";
import { useGetDocData } from "../../common/hooks/useGetDocData";
import { useGetFileByURL } from "../../common/hooks/useGetFileByUrl";
import "./style.scss";
import Autocomplete from "react-google-autocomplete";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { editSchema } from "./models";
import { useEffect, useRef, useState } from "react";
import ErrorMessage from "../../common/components/formErrorMessage/ErrorMessage";
import { useUpdateData } from "../../common/hooks/useUpdateData";
import photoAdding from "./../../assets/svg/profile/photo.svg";
import { useUploadFile } from "../../common/hooks/useUploadFile";
function Edit() {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(editSchema) });
  const pfpRef = useRef(null);
  const bannerRef = useRef(null);
  const navigate = useNavigate();
  const { userLoggedIn, currentUserID } = useSelector((state) => state.auth);
  const { data: currentUserData, isLoading: isCurrentUserDataLoading } =
    useGetDocData(currentUserID, "users");
  const [location, setLocation] = useState(currentUserData?.data().location);
  const { data: pfpImage } = useGetFileByURL(currentUserData?.data().pfp);
  const { data: bannerImage } = useGetFileByURL(currentUserData?.data().banner);
  const uploadFile = useUploadFile();
  const handleProfileEdit = useUpdateData(-1, "users");
  useEffect(()=> {
    setLocation(currentUserData?.data().location)
  }, [currentUserData])

  if (!userLoggedIn) {
    navigate("/", { replace: true });
  }
  const handleTextAreaChange = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };
  async function onSubmit(data) {
    let pfpUrl;
    let bannerUrl;
    if(data.pfp) {
      const type = data.pfp.type.split('/')[1]
      pfpUrl = `/${currentUserID}/pfp.${type}`;
      await uploadFile.mutateAsync({filePath: pfpUrl, file: data.pfp})
    }
    if(data.banner) {
      const type = data.banner.type.split('/')[1]
      bannerUrl = `/${currentUserID}/banner.${type}`;
      await uploadFile.mutateAsync({filePath: bannerUrl, file: data.banner})
    }
    await handleProfileEdit.mutateAsync({
      uid: currentUserID,
      newField: { ...data, location: location ?? "", ...(pfpUrl && {pfp: pfpUrl}), ...(bannerUrl && {banner: bannerUrl}) },
    });
    navigate(`/profile/${currentUserID}`);
  }

  function previewImage(ref) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        ref.current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  if (isCurrentUserDataLoading) {
    return (
      <div className="edit-page">
        <Loader />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="edit-page">
      <UpperBar>
        <div className="edit-page__upper-info">
          <h1 className="title-h2">Edit profile </h1>
          <button
            type="submit"
            className="edit-page__submit-button"
            disabled={handleProfileEdit.isPending}
          >
            {handleProfileEdit.isPending ? "Saving" : "Save"}
          </button>
        </div>
      </UpperBar>
      <div className="edit-page__form">
        <div className="edit-page__upper-form">
          <div className="edit-page__banner image-wrapper">
            <img
              ref={bannerRef}
              src={bannerImage}
              alt=""
              className="image-wrapper__image"
            />
            <label htmlFor="banner_input" className="edit-page__file-label">
              <img
                className="edit-page__file-label-img"
                src={photoAdding}
                alt=""
              />
              <input
                className="edit-page__file-input"
                type="file"
                name=""
                id="banner_input"
                accept="image/*"
                onChange={(e) => {
                  previewImage(bannerRef);
                  setValue("banner", e.target.files[0]);
                }}
              />
            </label>
          </div>
          <div className="edit-page__pfp image-wrapper">
            <img
              ref={pfpRef}
              src={pfpImage}
              alt=""
              className="image-wrapper__image"
            />
            <label htmlFor="pfp_input" className="edit-page__file-label">
              <img
                className="edit-page__file-label-img"
                src={photoAdding}
                alt=""
              />
              <input
                className="edit-page__file-input"
                type="file"
                name=""
                id="pfp_input"
                accept="image/*"
                onChange={(e) => {
                  previewImage(pfpRef);
                  setValue("pfp", e.target.files[0]);

                }}
              />
            </label>
          </div>
        </div>
        <div className="edit-page__main-form">
          <div className="edit-page__input-wrapper">
            <label htmlFor="your_name" className="edit-page__input-label">
              Name
            </label>
            <input
              defaultValue={currentUserData?.data().name}
              type="text"
              className="input edit-page__input"
              placeholder="Your name"
              id="your_name"
              {...register("name")}
            />
            {errors.name && <ErrorMessage errorMessage={errors.name.message} />}
          </div>
          <div className="edit-page__input-wrapper">
            <label htmlFor="your_bio" className="edit-page__input-label">
              Bio
            </label>
            <textarea
              defaultValue={currentUserData?.data().description}
              type="text"
              className="input edit-page__textarea"
              placeholder="Your description"
              id="your_bio"
              {...register("description")}
              onChange={(e) => {
                handleTextAreaChange(e);
                trigger("description"); // Для повторной валидации при изменении содержимого
              }}
            />
            {errors.description && (
              <ErrorMessage errorMessage={errors.description.message} />
            )}
          </div>
          <div className="edit-page__input-wrapper">
            <label htmlFor="your_name" className="edit-page__input-label">
              Location
            </label>
            <Autocomplete
              className="input edit-page__input"
              id="your_location"
              placeholder="Your location"
              defaultValue={currentUserData?.data().location}
              apiKey={import.meta.env.VITE_GOOGLE_MAPS_API}
              {...register("location")}
              onPlaceSelected={(place) => {
                setLocation(place.formatted_address);
              }}
            />
            {errors.location && (
              <ErrorMessage errorMessage={errors.location.message} />
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default Edit;
