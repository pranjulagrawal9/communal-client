import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom'
import { followUnfollow, getUserProfile } from '../../store/slices/userSlice';
import Avatar from '../avatar/Avatar'
import Post from '../post/Post';
import './Profile.scss'
import {GrGrid} from 'react-icons/gr';
import {MdLogout} from 'react-icons/md';
import { Tooltip } from 'antd';
import { myPosts, userPosts } from '../../store/slices/postSlice';
import axiosinstance from '../../utils/axiosInstance';
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY, removeItem } from '../../utils/localStorageManager';

function Profile() {
    const navigate= useNavigate();
    const dispatch= useDispatch();
    const params= useParams();
    const myProfile= useSelector(state=> state.appConfigSlice.myProfile);
    const userProfile= useSelector(state=> state.userSlice.userProfile);
    const isFollowed= userProfile?.isFollowed;
    const currUserId= myProfile?.user._id;
    const [isMyProfile, setIsMyProfile] = useState(false);
    const userFeed= useSelector(state=> state.postSlice.userFeed);
    const currUserFeed= useSelector(state=> state.postSlice.currUserFeed);

    useEffect(() => {
        dispatch(userPosts({
          userId: params.userId
        }));
        dispatch(myPosts());
    }, [params.userId])
    

    useEffect(() => {
        setIsMyProfile(currUserId===params.userId);

        if(params)
            dispatch(getUserProfile({
                userId: params.userId
            }));
    }, [params.userId, myProfile])

    async function handleFollowUnfollow(){
        const result= dispatch(followUnfollow({
            userIdToFollow: params.userId
        }));

        console.log(result);
    }

    async function handleLogout(){
      try {
        await axiosinstance.get('/api/auth/logout');
        removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
        window.location.replace('/#/login');
      } catch (error) {
        console.log((error.message));
      }
    }

  return (
    <div className='profile'>
        <div className="container">
            <div className="top-part">
                <Avatar avatarClass="profile-avatar" avatarSrc={userProfile?.user?.userImg?.url}/>
                <div className="image-right">
                    <div className="name-and-edit">
                        <h2>{userProfile?.user.name}</h2>
                        {isMyProfile && <button className='edit-btn' onClick={()=>navigate('/editProfile')}>Edit Profile</button>}  
                        {!isMyProfile && <button className={isFollowed? 'following-btn' : 'follow-btn' } onClick={handleFollowUnfollow}>{isFollowed ? 'Following': 'Follow'}</button>} 
                        {isMyProfile && <div className='logout-box'>
                          <Tooltip title='Logout'>
                            <MdLogout onClick={handleLogout} className='logout-btn' />
                          </Tooltip>
                        </div>}
                    </div>
                    <div className="details">
                        <p><span>{userProfile?.numPosts}</span> posts</p>
                        <p><span>{userProfile?.numFollowers}</span> followers</p>
                        <p><span>{userProfile?.numFollowings}</span> followings</p>
                    </div>

                    <div className="bio-box">
                      <p>{userProfile?.user?.bio}</p>
                    </div>
                </div>
            </div>
            <hr />
            <div className="posts-heading-container">
                <div className="posts-heading">
                    <GrGrid />
                    <p>POSTS</p>
                </div>
            </div>
            
            <div className="bottom-part">
            {!isMyProfile && userFeed?.map((post) => {
            return (
              <Post
                userImg={post.owner?.userImg?.url}
                name={post.owner.name}
                postImg={post.image.url}
                likesCount={post.likesCount}
                caption={post.caption}
                key={post._id}
                postId= {post._id}
                isLiked= {post.isLiked}
                isMyProfile= {isMyProfile}
                timeCreated= {post.timeCreated}
              />
            );
          })}

            {isMyProfile && currUserFeed?.map((post) => {
            return (
              <Post
                userImg={post.owner?.userImg?.url}
                name={post.owner.name}
                postImg={post.image.url}
                likesCount={post.likesCount}
                caption={post.caption}
                key={post._id}
                postId= {post._id}
                isLiked= {post.isLiked}
                isMyProfile= {isMyProfile}
                timeCreated= {post.timeCreated}
              />
            );
          })}
            </div>
        </div>
    </div>
  )
}

export default Profile