import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../utils/interfaces";

const initialState = {
    drawerOpen: false,
    anchor: false,
    anchorEl: null
}

const appContentSlice = createSlice({
    name: "appContent",
    initialState,
    reducers: {
        toggleDrawerOpen: (state, action) => {
            const { payload } = action;
            state.drawerOpen = payload;
        },
        setAnchor: (state, action) => {
            const { anchor, anchorEl } = action.payload;
            state.anchor = anchor;
            state.anchorEl = anchorEl;
        },
    }
});

export const selectDrawerOpen = (state: RootState) => state.appContent.drawerOpen;

export const selectAnchor = (state: RootState) => state.appContent.anchor;

export const selectAnchorEl = (state: RootState) => state.appContent.anchorEl;

export const { toggleDrawerOpen, setAnchor } = appContentSlice.actions;

export default appContentSlice.reducer;