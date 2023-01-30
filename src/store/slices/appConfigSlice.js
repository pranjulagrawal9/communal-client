import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosinstance from '../../utils/axiosInstance';

export const getMyInfoThunk= createAsyncThunk('user/myInfo', async (_, thunkAPI)=>{
    try {
        thunkAPI.dispatch(setTopLoading(true));
        const response= await axiosinstance.get('/api/user/myInfo');
        return response.data.result;
    } 
    catch (error) {
        return Promise.reject(error);
    }   
    finally{
        thunkAPI.dispatch(setTopLoading(false));
    }
})

export const updateMyProfile= createAsyncThunk('user/updateMyProfile', async (body)=>{
    try {
        const response= await axiosinstance.put('/api/user', body);
        return response.data.result.user;
    } catch (error) {
        return Promise.reject(error);
    }
})


export const appConfigSlice= createSlice({
    name: 'appConfigSlice',
    initialState: {
        isCreateModalOpen: false,
        myProfile: null,
        openDeleteAccountModal: false,
        showLoading: false,
        showTopLoading: false,
        showMessage: false,
        isFollowingModalOpen: false,
        isMyProfile: false,
        isFollowerModalOpen: false
    },
    reducers: {
        toggleCreateModal: (state, action)=>{
            state.isCreateModalOpen= action.payload;
        },

        toggleDeleteAccountModal: (state, action)=>{
            state.openDeleteAccountModal= action.payload;
        },

        setShowLoading: (state, action)=>{
            state.showLoading= action.payload;
        },

        setTopLoading: (state, action)=>{
            state.showTopLoading= action.payload;
        },
        setshowMessage: (state, action)=>{
            state.showMessage= action.payload;
        },

        toggleFollowingModal: (state, action)=>{
            state.isFollowingModalOpen= action.payload
        },

        setIsMyProfile: (state, action)=>{
            state.isMyProfile= action.payload;
        },

        toggleFollowerModal: (state, action)=>{
            state.isFollowerModalOpen= action.payload;
        }
    },

    extraReducers: (builder)=> {
        builder.addCase(getMyInfoThunk.fulfilled, (state, action)=>{
            state.myProfile= action.payload;
        })
        .addCase(updateMyProfile.pending, (state, action)=>{
            state.showLoading= true;
        })
        .addCase(updateMyProfile.fulfilled, (state, action)=>{
            state.myProfile.user= action.payload;
            state.showLoading= false;
            state.showMessage= true;
        })
    }
    
});

export const {toggleCreateModal, toggleDeleteAccountModal, setShowLoading, setTopLoading, setshowMessage, toggleFollowingModal, setIsMyProfile, toggleFollowerModal}= appConfigSlice.actions;
export default appConfigSlice.reducer;