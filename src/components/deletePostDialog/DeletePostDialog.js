import React from "react";
import "./DeletePostDialog.scss";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { myPosts, toggleDeletePostDialog } from "../../store/slices/postSlice";
import axiosinstance from "../../utils/axiosInstance";
import { OnDeletePost } from "../../store/slices/userSlice";
import { setTopLoading } from "../../store/slices/appConfigSlice";

function DeletePostDialog() {
  const open= useSelector(state=> state.postSlice.openDeletePostDialog);
  const postId= useSelector(state=> state.postSlice.postToDeleteId);
  const dispatch= useDispatch();

  const handleOk = async () => {
    try {
      dispatch(toggleDeletePostDialog(false));
      dispatch(setTopLoading(true));
        await axiosinstance.delete('/api/post', {
            data:{
                postId
            }
        });
    
        dispatch(myPosts());
        dispatch(OnDeletePost());

    } catch (error) {
        console.log(error.message);
    }
    finally{
      dispatch(setTopLoading(false));
    }
    
  };
  
  const handleCancel = () => {
    dispatch(toggleDeletePostDialog(false));
  };

  return (
    <>
      <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        centered="true"
        okText="Delete"
        width="fit-content"
        okType="danger"
      >
        <p>Do you want to delete this post?</p>
      </Modal>
    </>
  );
}

export default DeletePostDialog;
