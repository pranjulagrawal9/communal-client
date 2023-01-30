import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyInfoThunk } from "../../store/slices/appConfigSlice";
import { followUnfollow, getUserProfile } from "../../store/slices/userSlice";
import axiosinstance from "../../utils/axiosInstance";
import Avatar from "../avatar/Avatar";
import './Suggestion.scss'

function Suggestion({avatarImg, name, userId}) {
  const navigate= useNavigate();
  // const userProfile= useSelector(state=> state.userSlice.userProfile);
  const [userProfile, setUserProfile] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);
  const myUserId= useSelector(state=> state.appConfigSlice.myProfile?.user._id);
  const dispatch= useDispatch();

  useEffect(() => {
    // dispatch(getUserProfile({
    //   userId
    // }));

    async function fetchUserData(){
      try {
        const response= await axiosinstance.post('/api/user/userInfo', {
          userId
        });

        setUserProfile(response.data.result);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchUserData();
  }, [])

  useEffect(() => {
    // if(userId===userProfile?.user?._id)
      setIsFollowed(userProfile?.isFollowed);
  }, [userProfile])
  
  
  async function handleFollowUnfollow(){
    // dispatch(followUnfollow({
    //     userIdToFollow: userId
    // }));

    try {
      await axiosinstance.post('/api/user/followUnfollow', {
        userToFollowId: userId
      });

      setIsFollowed(!isFollowed);

      dispatch(getMyInfoThunk());
      
    } catch (error) {
      console.log(error.message);
    }
}

  return (
    <div className="suggestion">
      <div className="left" onClick={()=>navigate(`/profile/${userId}`)}>
        <Avatar avatarSrc={avatarImg} />
        <p>{name}</p>
      </div>
      {userId!==myUserId && <div className="followUnfollow">
        <button className={isFollowed? 'following-btn' : 'follow-btn'} onClick={handleFollowUnfollow}>{isFollowed? 'Following': 'Follow'}</button>
      </div>}
    </div>
  );
}

export default Suggestion;
