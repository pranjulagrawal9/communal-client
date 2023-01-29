import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosinstance from "../../utils/axiosInstance";
import { setTopLoading } from "./appConfigSlice";

export const followUnfollow= createAsyncThunk('/user/followUnfollow', async (body, thunkAPI)=>{
    try {
        const response= await axiosinstance.post('/api/user/followUnfollow', {
            userToFollowId: body.userIdToFollow
        });

        thunkAPI.dispatch(getUserProfile({
            userId: body.userIdToFollow
        }));
        return response.data.result;
    } catch (error) {
        return Promise.reject(error.message);
    }
});

export const getUserProfile= createAsyncThunk('/user/userInfo', async (body, thunkAPI)=>{
    try {
        thunkAPI.dispatch(setTopLoading(true));
        const response= await axiosinstance.post('/api/user/userInfo', {
            userId: body.userId
        });

        return response.data.result;
    } catch (error) {
        Promise.reject(error.message);
    }
    finally{
        thunkAPI.dispatch(setTopLoading(false));
    }
})

export const userSlice= createSlice({
    name: 'userSlice',
    initialState: {
        userProfile: null,
    },

    reducers:{
        onCreatePost: (state, action)=>{
            state.userProfile.numPosts++;
        },
        OnDeletePost: (state, action)=>{
            state.userProfile.numPosts--;
        }
    },

    extraReducers: (builder)=> {
        builder.addCase(getUserProfile.fulfilled , (state, action)=>{
            state.userProfile= action.payload;
            console.log(state.userProfile);
        })
        .addCase(followUnfollow.fulfilled, (state, action)=>{
            // state.userProfile.isFollowed= !state.userProfile.isFollowed;
            if(action.payload==="Followed")
                state.userProfile.numFollowers++;
            else
                state.userProfile.numFollowers--;
        })
    }
});

export const {onCreatePost, OnDeletePost}= userSlice.actions;
export default userSlice.reducer;