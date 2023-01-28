import React from 'react'
import './DeleteAccountModal.scss'
import { Modal } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { setTopLoading, toggleDeleteAccountModal } from '../../store/slices/appConfigSlice';
import axiosinstance from '../../utils/axiosInstance';
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY, removeItem } from '../../utils/localStorageManager';

function DeleteAccountModal() {

    const open= useSelector(state=> state.appConfigSlice.openDeleteAccountModal);
    const dispatch= useDispatch();

    const handleOk = async () => {
        try {
            dispatch(setTopLoading(true));
            dispatch(toggleDeleteAccountModal(false));
            await axiosinstance.get('/api/user/deleteAccount');
            removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
            window.location.replace('/#/signup');
    
        } catch (error) {
            console.log(error);
        }
        finally{
          dispatch(setTopLoading(false));
        }
      };

      const handleCancel = () => {
        dispatch(toggleDeleteAccountModal(false));
      };    

  return (
    <>
    <Modal
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      centered="true"
      okText="Yes, Delete My Account"
      width="315px"
      okType="danger"
      className='deleteModal'
    >
      <p>Are you sure, you want to delete your account?</p>
    </Modal>
  </>
  )
}

export default DeleteAccountModal