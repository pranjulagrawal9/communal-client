import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosinstance from "../../utils/axiosInstance";
import { setTopLoading } from "./appConfigSlice";

export const userPosts= createAsyncThunk('/post/userPosts', async (body, thunkAPI)=>{
    try {
        thunkAPI.dispatch(setTopLoading(true));
        const response= await axiosinstance.post('/api/post/userPosts', {
            userId: body.userId
        });

        return response.data.result;
    } catch (error) {
        return Promise.reject(error.message);
    }
    finally{
        thunkAPI.dispatch(setTopLoading(false));
    }
});

export const myPosts= createAsyncThunk('/post/myPosts', async (_, thunkAPI)=>{
    try {
        thunkAPI.dispatch(setTopLoading(true));
        const response= await axiosinstance.get('/api/post/myPosts');

        return response.data.result;
    } catch (error) {
        return Promise.reject(error.message);
    }
    finally{
        thunkAPI.dispatch(setTopLoading(false));
    }
});

export const postSlice= createSlice({
    name: 'postSlice',
    initialState: {
        userFeed: [],
        currUserFeed: [],
        openDeletePostDialog: false,
        openEditPostModal: false,
        postToDeleteId: '',
        postToUpdateData: null
    },

    reducers: {
        toggleDeletePostDialog: (state, action)=>{
            state.openDeletePostDialog= action.payload;
        },

        toggleEditPostModal: (state, action)=>{
            state.openEditPostModal= action.payload;
        },

        setPostToDeleteId: (state, action)=>{
            state.postToDeleteId= action.payload;
        },

        setPostToUpdateData: (state, action)=>{
            state.postToUpdateData= action.payload;
        }
    },

    extraReducers: (builder)=> {
        builder.addCase(userPosts.fulfilled , (state, action)=>{
            state.userFeed= action.payload;
        })
        .addCase(myPosts.fulfilled , (state, action)=>{
            state.currUserFeed= action.payload;
        })
    }
});

export const {toggleDeletePostDialog, setPostToDeleteId, setPostToUpdateData, toggleEditPostModal}= postSlice.actions;
export default postSlice.reducer;