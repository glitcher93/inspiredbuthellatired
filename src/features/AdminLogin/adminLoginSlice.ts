import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../utils/common";
import { RootState } from "../../utils/interfaces";

const initialState = {
    email: "",
    password: "",
    emailError: false,
    passwordError: false,
    loginPending: false,
    loginFailed: false,
}

export const login = createAsyncThunk('adminLogin/login', async ({email, password}: {email: string, password: string}) => {
    const loginCredentials = {email, password};

    const { data } = await axios.post(`${apiUrl}/admin/login`, loginCredentials);

    const { token } = data;

    return token;
})

export const adminLoginSlice = createSlice({
    name: "adminLogin",
    initialState,
    reducers: {
        changeEmail: (state, action) => {
            state.email = action.payload;
            state.emailError = false;
        },
        changePassword: (state, action) => {
            state.password = action.payload;
            state.passwordError = false;
        },
        toggleEmailError: (state) => {
            state.emailError = true;
        },
        togglePasswordError: (state) => {           
            state.passwordError = true;
        },
        clearFields: (state) => {
            state.email = "";
            state.password = "";
        },
        logout: (state) => {
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loginPending = true;
                state.loginFailed = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loginPending = false;
                state.loginFailed = false;
                localStorage.setItem("token", `Bearer ${action.payload}`);
            })
            .addCase(login.rejected, (state) => {
                state.loginPending = false;
                state.loginFailed = true;
            })
    }
})

export const selectLoginPending = (state: RootState) => state.adminLogin.loginPending;

export const selectEmail = (state: RootState) => state.adminLogin.email;

export const selectEmailError = (state: RootState) => state.adminLogin.emailError;

export const selectPassword = (state: RootState) => state.adminLogin.password;

export const selectPasswordError = (state: RootState) => state.adminLogin.passwordError;

export const { changeEmail, changePassword, toggleEmailError, togglePasswordError, clearFields, logout } = adminLoginSlice.actions;

export default adminLoginSlice.reducer;