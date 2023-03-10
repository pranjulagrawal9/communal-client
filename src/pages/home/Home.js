import React, { useEffect } from "react";
import "./Home.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
import { BsSearch } from "react-icons/bs";
import {BiMessageRoundedDetail} from 'react-icons/bi'
import { Tooltip } from 'antd';
import { IoCreateOutline } from "react-icons/io5";
import Avatar from "../../components/avatar/Avatar";
import CreatePost from "../../components/createPost/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { getMyInfoThunk, toggleCreateModal } from "../../store/slices/appConfigSlice";
import DeletePostDialog from "../../components/deletePostDialog/DeletePostDialog";
import EditPostModal from "../../components/editPostModal/EditPostModal";
import DeleteAccountModal from "../../components/deleteAccountDialog/DeleteAccountModal";
import FollowingModal from "../../components/followingModal/FollowingModal";
import FollowerModal from "../../components/followerModal/FollowerModal";

function Home() {
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const myProfile= useSelector(state=> state.appConfigSlice.myProfile);
  const myUserId= myProfile?.user?._id;
  const src= myProfile?.user?.userImg?.url;
  const showLoading= useSelector(state=> state.appConfigSlice.showLoading);

  useEffect(() => {
      if(showLoading){
        document.getElementById('main-container').classList.add('overflow-hidden');
      }
      else{
        document.getElementById('main-container').classList.remove('overflow-hidden');
      }

  }, [showLoading])
  

  useEffect(() => {
    dispatch(getMyInfoThunk())
  }, [dispatch])
  

  return (
    <div className="main-container" id='main-container'>
      <div className="sidebar">
        <div className="heading">
          <h1 onClick={()=> navigate('/')}>Communal</h1>
        </div>
        <div className="menu-items">
          <div className="menu-item" onClick={() => navigate("/")}>
            <GrHomeRounded className="icon" />
            <span>Home</span>
          </div>

          <Tooltip title='This feature is in development' placement="right" trigger="click" overlayStyle={{width: '130px', textAlign: 'center'}} >
            <div className="menu-item">
              <BsSearch className="icon" />
              <span>Search</span>
            </div>
          </Tooltip>
          

          <Tooltip title='This feature is in development' placement="right" trigger="click" overlayStyle={{width: '130px', textAlign: 'center'}} >
            <div className="menu-item">
              <BiMessageRoundedDetail className="icon" />
              <span>Messages</span>
            </div>
          </Tooltip>
          

          <div className="menu-item" onClick={()=>dispatch(toggleCreateModal(true))}>
            <IoCreateOutline className="icon" />
            <span>Create</span>
          </div>

          <CreatePost />
          <DeletePostDialog />
          <EditPostModal />
          <DeleteAccountModal />
          <FollowingModal />
          <FollowerModal />

          <div className="menu-item" onClick={() => navigate(`/profile/${myUserId}`)}>
            <Avatar avatarClass="icon" avatarSrc={src} />
            <span>Profile</span>
          </div>
        </div>
      </div>

      <div className="home-outlet">
        <Outlet />
      </div>

    {showLoading && <div className="loading-container">
        <div className="lds-facebook"><div></div><div></div><div></div></div>
      </div>}
      
    </div>
  );
}

export default Home;
