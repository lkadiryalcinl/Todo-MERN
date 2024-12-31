import {configureStore} from '@reduxjs/toolkit'
import AuthSlice from '../features/auth/AuthSlice'
import UserSlice from '../features/user/UserSlice'
import TodoSlice from '../features/todo/TodoSlice'

export const store=configureStore({
    reducer:{
        AuthSlice,
        UserSlice,
        TodoSlice
    }
})