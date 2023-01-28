import React, { useEffect, useState } from 'react'
import './EditPostModal.scss'
import { Modal } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { myPosts, toggleEditPostModal } from '../../store/slices/postSlice';
import axiosinstance from '../../utils/axiosInstance';
import { setTopLoading } from '../../store/slices/appConfigSlice';

function EditPostModal() {

    const open= useSelector(state=> state.postSlice.openEditPostModal);
    const postData= useSelector(state=> state.postSlice.postToUpdateData);
    const dispatch= useDispatch();
    const [caption, setCaption] = useState('');
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        setCaption(postData?.caption);
    }, [postData])
    

    const handleOk = async () => {
        try {
            handleCancel();
            dispatch(setTopLoading(true));
            await axiosinstance.put('/api/post/update', {
                postId: postData.postId,
                postImgDataUrl: imgSrc,
                caption
            });
            
            dispatch(myPosts());
        } catch (error) {
            console.log((error.message));
        }
        finally{
          dispatch(setTopLoading(false));
        }
        
      };

    const handleCancel = () => {
        dispatch(toggleEditPostModal(false));
        setImgSrc('');
      };

    function handleFileChooser(event){
        const file= event.target.files[0];
        const fileReader= new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload= ()=>{
        if(fileReader.readyState=== fileReader.DONE)
            setImgSrc(fileReader.result);
    }
    }

  return (
    <>
      <Modal
        open={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        centered="true"
        width="fit-content"
        okText='Submit'
        destroyOnClose="true"
        className='editModal'
      >
        <div className="editbox">
            <div className="img-container">
                <img src={!imgSrc? postData?.postImg: imgSrc} width="400px" />
                <label htmlFor="editPostImg" className='editImgLabel' >Change Post Image</label>
                <input type="file" id="editPostImg" className='editPostImg' onChange={handleFileChooser} />
            </div>
            
            <textarea rows="6" spellCheck="false" placeholder='Write your caption here...' value={caption} onChange={(e)=> setCaption(e.target.value)} ></textarea>
        </div>
        
      </Modal>
    </>
  );
}

export default EditPostModal