import { Modal } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFollowingModal } from '../../store/slices/appConfigSlice';
import Suggestion from '../suggestion/Suggestion';
import './FollowingModal.scss'

function FollowingModal() {

    const open= useSelector(state=> state.appConfigSlice.isFollowingModalOpen);
    const myProfile= useSelector(state=> state.appConfigSlice.myProfile);
    const userProfile= useSelector(state=> state.userSlice.userProfile);
    const isMyProfile= useSelector(state=> state.appConfigSlice.isMyProfile);
    const dispatch= useDispatch();

    function handleCancel(){
        dispatch(toggleFollowingModal(false));
    }

  return (
    <Modal
      title={
        <>
          <p>Followings</p>
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
        {isMyProfile && myProfile.user?.followings?.map((following) => {
              return (
                <Suggestion
                  key={following._id}
                  name={following.name}
                  avatarImg={following?.userImg?.url}
                  userId={following._id}
                />
              );
            })}

        {!isMyProfile && userProfile?.user?.followings?.map((following) => {
              return (
                <Suggestion
                  key={following._id}
                  name={following.name}
                  avatarImg={following?.userImg?.url}
                  userId={following._id}
                />
              );
            })}
    
    </Modal>
  )
}

export default FollowingModal