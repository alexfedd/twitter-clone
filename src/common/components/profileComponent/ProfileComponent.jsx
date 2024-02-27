/* eslint-disable react/prop-types */
import "./style.scss";
import { useGetFileByURL } from './../../hooks/useGetFileByUrl';
function ProfileComponent({ pfpUrl, nickname, name }) {
  const { data: currentUserPfp, isPending } = useGetFileByURL(pfpUrl);
  if(isPending) {
    return <p>Loading...</p>
  }
  return (
    <div className="profile-component">
      <div className="profile-component__image-wrapper">
        <img src={currentUserPfp} alt="" className="profile-component__image" />
      </div>
      <div className="profile-component__information">
        <h3 className="title-h3">{name}</h3>
        <span className="subtitle">{nickname}</span>
      </div>
    </div>
  );
}

export default ProfileComponent;
