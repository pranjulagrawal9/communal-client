import React from "react";
import "./Avatar.scss";
import avatarImg from "../../assets/avatar.png";
import { useNavigate } from "react-router-dom";

function Avatar({ avatarClass, avatarSrc, navigateLink }) {

  const navigate= useNavigate();

  return (
    <img
      className={avatarClass ? `avatar ${avatarClass}`: 'avatar'}
      src={avatarSrc ? avatarSrc : avatarImg}
      alt="user"
      onClick={navigateLink? ()=> navigate(`/profile/${navigateLink}`) : null}
    />
  );
}

export default Avatar;
