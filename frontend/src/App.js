import { useSelector } from 'react-redux';
import {
  Route, RouterProvider, createBrowserRouter, createRoutesFromElements
} from "react-router-dom";
import { selectIsAuthChecked, selectLoggedInUser } from './features/auth/AuthSlice';
import { Logout } from './features/auth/components/Logout';
import { Protected } from './features/auth/components/Protected';
import { useAuthCheck } from "./hooks/useAuth/useAuthCheck";
import { useFetchLoggedInUserDetails } from "./hooks/useAuth/useFetchLoggedInUserDetails";
import { ForgotPasswordPage, HomePage, LoginPage, OtpVerificationPage, ResetPasswordPage, SignupPage } from './pages';
import { NotFoundPage } from './pages/NotFoundPage';
import { TodoPage } from './pages/TodoPage'


function App() {

  const isAuthChecked = useSelector(selectIsAuthChecked)
  const loggedInUser = useSelector(selectLoggedInUser)

  useAuthCheck();
  useFetchLoggedInUserDetails(loggedInUser);

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/verify-otp' element={<OtpVerificationPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password/:userId/:passwordResetToken' element={<ResetPasswordPage />} />
        <Route exact path='/logout' element={<Protected><Logout /></Protected>} />

        <Route path='/' element={<Protected><HomePage /></Protected>} />
        <Route path='/todo' element={<Protected><TodoPage /></Protected>} />

        <Route path='*' element={<NotFoundPage />} />

      </>
    )
  )


  return isAuthChecked ? <RouterProvider router={routes} /> : "";
}

export default App;
