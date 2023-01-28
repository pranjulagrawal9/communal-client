import React, { useState } from "react";
import { Button, Modal } from "antd";
import './CreatePost.scss'
import { useDispatch, useSelector } from "react-redux";
import { setShowLoading, toggleCreateModal } from "../../store/slices/appConfigSlice";
import axiosInstance from "../../utils/axiosInstance";
import { onCreatePost } from "../../store/slices/userSlice";
import { myPosts, userPosts } from "../../store/slices/postSlice";

function CreatePost() {
  const [imgSrc, setImgSrc] = useState('');
  const [caption, setCaption] = useState('');

  const dispatch= useDispatch();
  const open= useSelector(state=> state.appConfigSlice.isCreateModalOpen);
  const myUserId= useSelector(state=> state.appConfigSlice.myProfile?.user?._id);

  function handleCancel() {
    dispatch(toggleCreateModal(false));
    setImgSrc('');
    setCaption('');
    // URL.revokeObjectURL(imgSrc);
  }

  function handleFileChooser(event){
    const file= event.target.files[0];
    const fileReader= new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload= ()=>{
      if(fileReader.readyState=== fileReader.DONE)
        setImgSrc(fileReader.result);
    }
    // setImgSrc(URL.createObjectURL(file));
  }

  async function onShare(){
    try {
      handleCancel();
      dispatch(setShowLoading(true));
      const response= await axiosInstance.post('/api/post', {
        caption,
        postImgDataUrl: imgSrc
      }); 
      dispatch(onCreatePost());
      dispatch(myPosts());

    } catch (error) {
      console.log('error from create api', error.message);
    }
    finally{
      console.log("I am in finally");
      dispatch(setShowLoading(false));
    }
  }

  return (
    <>
    <Modal
      title={
        <>
          <p>Create new post</p>
          <hr />
        </>
      }
      open={open}
      onCancel={handleCancel}
      centered="true"
      footer={null}
      destroyOnClose="true"
      width="fit-content"
      className="create-post"
    >
      {imgSrc !== "" && (
        <>
          <div className="image-container">
            <img src={imgSrc} alt="postImage" width="56%" />
            <hr />
            <div className="caption">
              <textarea
                name="caption"
                rows="11"
                placeholder="Write a caption..."
                spellCheck="false"
                onChange={(e)=>setCaption(e.target.value)}
              ></textarea>
            </div>
          </div>
          <p className="share-btn" onClick={onShare}>Share</p>
        </>
      )}

      {imgSrc === "" && (
        <div className="modal-container">
          <svg
            width="100px"
            height="100px"
            viewBox="0 -0.5 18 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#000000"
              fillRule="evenodd"
              d="M474.188327,259.775909 L480.842912,259.775909 L477.549999,256.482996 L474.375904,259.65709 C474.321124,259.71187 474.256777,259.751373 474.188327,259.775909 Z M474,258.618781 L474,247.775909 L486,247.775909 L486,254.968826 L483.657827,252.626653 C483.470927,252.439753 483.148791,252.4342 482.953529,252.629462 C482.940375,252.642616 482.928101,252.656403 482.916711,252.670736 C482.913161,252.674075 482.909651,252.677479 482.906183,252.680947 L479.034173,256.552957 L477.918719,255.437503 C477.808988,255.327771 477.655516,255.279359 477.507786,255.29536 C477.387162,255.302309 477.267535,255.351246 477.17513,255.44365 L474,258.618781 Z M482.257125,259.775909 L486,259.775909 L486,256.377007 L485.996984,256.380023 L483.309152,253.692192 L479.74128,257.260064 L482.257125,259.775909 Z M487,259.406871 L487.960593,259.541874 C488.51207,259.619379 489.020377,259.235606 489.097766,258.684953 L490.765938,246.815293 C490.843443,246.263816 490.459671,245.75551 489.909017,245.678121 L478.039358,244.009949 C477.487881,243.932444 476.979574,244.316216 476.902185,244.86687 L476.633887,246.775909 L474.006845,246.775909 C473.449949,246.775909 473,247.226689 473,247.782754 L473,259.769063 C473,260.32596 473.45078,260.775909 474.006845,260.775909 L485.993155,260.775909 C486.550051,260.775909 487,260.325128 487,259.769063 L487,259.406871 Z M487,258.397037 L488.10657,258.552556 L489.776647,246.669339 L477.89343,244.999262 L477.643739,246.775909 L485.993155,246.775909 C486.54922,246.775909 487,247.225857 487,247.782754 L487,258.397037 Z"
              transform="translate(-473 -244)"
            />
          </svg>
          <p>Drag photos and videos here</p>
          <Button
            type="primary"
            onClick={() => document.getElementById("fileInput").click()}
          >
            Select From Computer
          </Button>
          <input
            type="file"
            id="fileInput"
            className="fileInput"
            onChange={handleFileChooser}
          />
        </div>
      )}
    </Modal>
    </>
  );
}

export default CreatePost;
