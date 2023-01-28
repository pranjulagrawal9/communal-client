import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setshowMessage,
  toggleDeleteAccountModal,
  updateMyProfile,
} from "../../store/slices/appConfigSlice";
import Avatar from "../avatar/Avatar";
import "./EditProfile.scss";
import { GoDeviceCamera } from "react-icons/go";
import { message } from "antd";

function EditProfile() {
  const myProfile = useSelector((state) => state.appConfigSlice.myProfile);
  const src = myProfile?.user?.userImg?.url;
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();
  const [userImgDataUrl, setUserImgDataUrl] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const showMessage= useSelector(state=> state.appConfigSlice.showMessage);

  useEffect(() => {
    if(showMessage)
      messageApi.open({
        type: 'success',
        content: 'Profile Updated',
      });

      dispatch(setshowMessage(false));
  }, [showMessage])
  

  useEffect(() => {
    if (userImgDataUrl){
      dispatch(updateMyProfile({ userImgDataUrl }));
    }
  }, [userImgDataUrl]);

  useEffect(() => {
    if (myProfile) {
      setName(myProfile?.user?.name);
      setEmail(myProfile?.user?.email);
      setBio(myProfile?.user?.bio);
    }
  }, [myProfile]);

  async function handleFileInput(event) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setUserImgDataUrl(fileReader.result);
      }
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    dispatch(
      updateMyProfile({
        name,
        email,
        userImgDataUrl,
        bio,
      })
    );
  }

  return (
    <div className="editProfile">
      {contextHolder}
      <div className="container">
        <div
          className="avatar-container"
          onClick={() => document.getElementById("photoInput").click()}
        >
          <Avatar avatarClass="profile-avatar" avatarSrc={src} />
          <div className="photo-overlay">
            <GoDeviceCamera className="camera-icon" />
            <p className="change-text">CHANGE PROFILE PHOTO</p>
          </div>
        </div>

        <input
          type="file"
          id="photoInput"
          className="photoInput"
          onChange={handleFileInput}
        />
        <form>
          <div className="inputs-container">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="nameInput"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="inputs-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="inputs-container">
            <label htmlFor="bio-text">Bio</label>
            <textarea
              id="bio-text"
              className="bio-text"
              maxLength="150"
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              spellCheck="false"
            ></textarea>
            <p>{bio?.length} / 150</p>
          </div>

          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>

        <div className="delete-btn-container">
          <button
            className="delete-btn"
            onClick={() => dispatch(toggleDeleteAccountModal(true))}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
