import { Modal } from 'antd';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleFollowerModal } from '../../store/slices/appConfigSlice';
import Suggestion from '../suggestion/Suggestion';
import './FollowerModal.scss'

function FollowerModal() {
    const open= useSelector(state=> state.appConfigSlice.isFollowerModalOpen);
    const myProfile= useSelector(state=> state.appConfigSlice.myProfile);
    const userProfile= useSelector(state=> state.userSlice.userProfile);
    const isMyProfile= useSelector(state=> state.appConfigSlice.isMyProfile);
    const dispatch= useDispatch();

    function handleCancel(){
        dispatch(toggleFollowerModal(false));
    }

  return (
    <Modal
      title={
        <>
          <p>Followers</p>
          <hr />
        </>
      }
      open={open}
      onCancel={handleCancel}
      centered="true"
      footer={null}
      destroyOnClose="true"
      width="383px"
      className="following-modal"
    >
        {isMyProfile && myProfile?.user?.followers?.map((follower) => {
              return (
                <Suggestion
                  key={follower._id}
                  name={follower.name}
                  avatarImg={follower?.userImg?.url}
                  userId={follower._id}
                />
              );
            })}

        {!isMyProfile && userProfile?.user?.followers?.map((follower) => {
              return (
                <Suggestion
                  key={follower._id}
                  name={follower.name}
                  avatarImg={follower?.userImg?.url}
                  userId={follower._id}
                />
              );
            })}

            {/* {(myProfile?.user?.followers?.length===0 || userProfile?.user?.followers?.length==0) && 
                dispatch(toggleFollowerModal(false))
            } */}
            
    </Modal>
  )
}

export default FollowerModal