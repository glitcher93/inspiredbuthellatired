import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../utils/interfaces";

const initialState = {
    anchor: false,
    anchorEl: null
}

const adminContentSlice = createSlice({
    name: "adminContent",
    initialState,
    reducers: {
        setAnchor: (state, action) => {
            const { anchor, anchorEl } = action.payload;
            state.anchor = anchor;
            state.anchorEl = anchorEl;
        },
    }
});

export const selectAnchor = (state: RootState) => state.adminContent.anchor;

export const selectAnchorEl = (state: RootState) => state.adminContent.anchorEl;

export const { setAnchor } = adminContentSlice.actions;

export default adminContentSlice.reducer;