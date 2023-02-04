import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTopLoading } from "../../store/slices/appConfigSlice";
import axiosinstance from "../../utils/axiosInstance";
import Avatar from "../avatar/Avatar";
import Post from "../post/Post";
import Suggestion from "../suggestion/Suggestion";
import "./Feed.scss";

function Feed() {
  const myProfile = useSelector((state) => state.appConfigSlice.myProfile);
  const src = myProfile?.user?.userImg?.url;
  const userName = myProfile?.user?.name;
  const [feedData, setFeedData] = useState([]);
  const navigate= useNavigate();
  const dispatch= useDispatch();

  useEffect(() => {
    fetchPostsOfFollowing();
  }, []);

  async function fetchPostsOfFollowing() {
    try {
      dispatch(setTopLoading(true));
      const response = await axiosinstance.get("/api/post/postsOfFollowings");
      setFeedData(response.data.result);
    } catch (error) {
      console.log(error.message);
    }
    finally{
      dispatch(setTopLoading(false));
    }
  }

  return (
    <div className="feed">
      <div className="container">
        <div className="left-part">
          {feedData.map((post) => {
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
                ownerId= {post.owner._id}
                timeCreated= {post.timeCreated}
              />
            );
          })}

          {feedData.length===0 && <div className="empty-feed">
              <h2>It looks like you are not following anyone, Follow someone to see their posts.</h2>
            </div>}
          
        </div>
        <div className="right-part">
          <div className="user">
            <Avatar avatarClass="user-img" avatarSrc={src} navigateLink={myProfile?.user?._id} />
            <p onClick={()=> navigate(`/profile/${myProfile?.user?._id}`)} >{userName}</p>
          </div>

          <div className="suggestions-box">
            <div className="heading">
              <h4>Suggestions for you</h4>
              <p onClick={()=> navigate('/suggested')} >See All</p>
            </div>

            {myProfile?.suggestions.slice(0, 5).map((suggestion) => {
              return (
                <Suggestion
                  key={suggestion._id}
                  name={suggestion.name}
                  avatarImg={suggestion?.userImg?.url}
                  userId={suggestion._id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
