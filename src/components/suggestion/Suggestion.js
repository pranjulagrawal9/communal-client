import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followUnfollow, getUserProfile } from "../../store/slices/userSlice";
import Avatar from "../avatar/Avatar";
import './Suggestion.scss'

function Suggestion({avatarImg, name, userId}) {
  const navigate= useNavigate();
  const dispatch= useDispatch();
  const userProfile= useSelector(state=> state.userSlice.userProfile);
  const isFollowed= userProfile?.isFollowed;

  useEffect(() => {
    dispatch(getUserProfile({
      userId: userId
    }));
  }, [])
  
  async function handleFollowUnfollow(){
    const result= await dispatch(followUnfollow({
        userIdToFollow: userId
    }));
    console.log(result);
}

  return (
    <div className="suggestion">
      <div className="left" onClick={()=>navigate(`/profile/${userId}`)}>
        <Avatar avatarSrc={avatarImg} />
        <p>{name}</p>
      </div>
      <div className="followUnfollow">
        <p className={isFollowed? 'following-btn' : 'follow-btn'} onClick={handleFollowUnfollow}>{isFollowed? 'Following': 'Follow'}</p>
      </div>
    </div>
  );
}

export default Suggestion;
