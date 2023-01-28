import React, { useEffect, useState } from 'react'
import Avatar from '../avatar/Avatar'
import './Post.scss'
import {FiHeart} from 'react-icons/fi'
import {FaRegComment} from 'react-icons/fa'
import {GrEdit} from 'react-icons/gr'
import {RiDeleteBin6Line} from 'react-icons/ri'
import axiosinstance from '../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { setPostToDeleteId, setPostToUpdateData, toggleDeletePostDialog, toggleEditPostModal } from '../../store/slices/postSlice'

function Post({userImg, name, postImg, likesCount, caption, postId, isLiked, ownerId, isMyProfile, timeCreated}) {

    const [numLikes, setNumLikes] = useState(likesCount);
    const [isPostLiked, setIsPostLiked] = useState(isLiked);
    const navigate= useNavigate();
    const dispatch= useDispatch();
    
    async function likeDislikePost(){
        try {
            const response= await axiosinstance.post('/api/post/likeDislike', {
                postId
            });
            if(response.data.result==='Liked'){
                setNumLikes(numLikes+1);
                setIsPostLiked(true);
            }
            else{
                setNumLikes(numLikes-1);
                setIsPostLiked(false);
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    function handleDeletePost(){
        dispatch(setPostToDeleteId(postId));
        dispatch(toggleDeletePostDialog(true));
    }

    function handleEditPost(){
        dispatch(setPostToUpdateData({
            postId,
            postImg,
            caption
        }));
        dispatch(toggleEditPostModal(true));
    }

  return (
    <div className='post'>
        <div className="user-info">
            <div className="left-part-post">
                <Avatar avatarSrc={userImg} navigateLink={ownerId} />
                <p onClick={()=> navigate(`/profile/${ownerId}`)} >{name}</p>
                <div className="time-box">
                    <span className='dot'>•</span>
                    <span className='time'>{timeCreated}</span>
                </div>
            </div>
            {isMyProfile && <div className="edit-delete">
                <Tooltip title="Edit Post" >
                    <GrEdit onClick={handleEditPost} className="edit-post" />
                </Tooltip>
                <Tooltip title="Delete Post">
                    <RiDeleteBin6Line onClick={handleDeletePost} className="delete-post" />
                </Tooltip>
            </div>}
            
        </div>
        <img className='post-img' src={postImg} alt="post" />
        <div className="footer">
            <div className="like-box">
                <FiHeart className={isPostLiked? 'liked': 'not-liked'} onClick={likeDislikePost} />
                <FaRegComment className='comment-btn'/>
            </div>
            <div className="likes">
                <p>{numLikes} likes</p>
            </div>
            <div className="caption">
                <p>{caption}</p>
            </div>
        </div>
    </div>
  )
}

export default Post