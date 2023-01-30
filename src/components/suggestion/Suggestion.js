import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followUnfollow, getUserProfile } from "../../store/slices/userSlice";
import Avatar from "../avatar/Avatar";
import './Suggestion.scss'

function Suggestion({avatarImg, name, userId}) {
  const navigate= useNavigate();
  const dispatch= useDispatch();
  const userProfile= useSelector(state=> state.userSlice.userProfile);
  const [isFollowed, setIsFollowed] = useState(false);

  // const isFollowed= userProfile?.isFollowed;

  useEffect(() => {
    dispatch(getUserProfile({
      userId
    }));
  }, [])

  useEffect(() => {
    if(userId===userProfile?.user?._id)
      setIsFollowed(userProfile?.isFollowed);
  }, [userProfile])
  
  
  async function handleFollowUnfollow(){
    dispatch(followUnfollow({
        userIdToFollow: userId
    }));
}

  return (
    <div className="suggestion">
      <div className="left" onClick={()=>navigate(`/profile/${userId}`)}>
        <Avatar avatarSrc={avatarImg} />
        <p>{name}</p>
      </div>
      <div className="followUnfollow">
        <button className={isFollowed? 'following-btn' : 'follow-btn'} onClick={handleFollowUnfollow}>{isFollowed? 'Following': 'Follow'}</button>
      </div>
    </div>
  );
}

export default Suggestion;
