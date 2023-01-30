import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import VerifyUser from "./components/VerifyUser";
import Feed from "./components/feed/Feed";
import Profile from "./components/profile/Profile";
import EditProfile from "./components/editProfile/EditProfile";
import LoadingBar from 'react-top-loading-bar'
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import IfNotLoggedIn from "./components/IfNotLoggedIn";
import Suggested from "./components/suggested/Suggested";

function App() {
  const loadingRef= useRef(null);
  const showTopLoading= useSelector(state=> state.appConfigSlice.showTopLoading);

  useEffect(() => {
    if(showTopLoading){
      loadingRef.current.continuousStart();
    }
    else
      loadingRef.current.complete();
  }, [showTopLoading])
  

  return (
    <>
      <LoadingBar color="#f11946" ref={loadingRef} waitingTime="200" height={3} />

      <Routes>
        <Route element={<VerifyUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/editProfile" element={<EditProfile />} />
            <Route path="/suggested" element={<Suggested />} />
          </Route>
        </Route>

        <Route element={<IfNotLoggedIn />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        
      </Routes>
    </>
  );
}

export default App;
