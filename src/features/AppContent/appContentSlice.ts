import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../utils/interfaces";

const initialState = {
    drawerOpen: false,
    anchor: null
}

const appContentSlice = createSlice({
    name: "appContent",
    initialState,
    reducers: {
        toggleDrawerState: (state) => {
            if (state.drawerOpen === false) {
                state.drawerOpen = !state.drawerOpen;
            }
            if (state.drawerOpen === true) {
                state.drawerOpen = !state.drawerOpen;
            }
        },
        setAnchor: (state, action) => {
            const { payload } = action;
            state.anchor = payload;
        },
    }
});

export const selectDrawerOpen = (state: RootState) => state.appContent.drawerOpen;

export const selectAnchor = (state: RootState) => state.appContent.anchor;

export const { toggleDrawerState, setAnchor } = appContentSlice.actions;

export default appContentSlice.reducer;