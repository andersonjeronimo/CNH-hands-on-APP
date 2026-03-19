import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import JSX from 'react';

import App from './App';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import SignUpResult from './pages/SignUpResult';
import RegisterForm from './pages/RegisterForm';
import RegisterResult from './pages/RegisterResult';
import SearchForm from './pages/SearchForm';
import SearchResult from './pages/SearchResult';
import SerchResultFail from './pages/SearchResultFail';
import Customers from './pages/Instructors';
import CustomerDetails from './pages/InstructorDetails';
import Details from './pages/Details';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import FaqCustomers from './pages/FaqCustomers';
import FaqInstructors from './pages/FaqInstructors';


import Construction from './pages/partials/Construction';

function Router() {

    type Props = {
        children: JSX.ReactElement;
    }

    //implementar login
    function PrivateRoute({ children }: Props) {
        const isAuth = localStorage.getItem(`${import.meta.env.VITE_TOKEN_VAR}`);
        return (isAuth != null) ? children : <Navigate to="/home" />
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/home' element={<App />} />
                <Route path='/signin' element={<SignInPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/construction' element={<Construction />} />
                <Route path='/signup-result' element={<SignUpResult />}></Route>
                <Route path='/register-result' element={<RegisterResult />}></Route>

                <Route path='/register' element={
                    <PrivateRoute>
                        <RegisterForm />
                    </PrivateRoute>
                }>
                </Route>

                {/* <Route path='/signup-result' element={
                    <PrivateRoute>
                        <SignUpResult />
                    </PrivateRoute>
                }>
                </Route> */}

                {/* <Route path='/register-result' element={
                    <PrivateRoute>
                        <RegisterResult />
                    </PrivateRoute>
                }>
                </Route> */}

                <Route path='/search' element={
                    <PrivateRoute>
                        <SearchForm />
                    </PrivateRoute>
                }>
                </Route>

                <Route path='/search-result' element={
                    <PrivateRoute>
                        <SearchResult />
                    </PrivateRoute>
                }>
                </Route>

                <Route path='/search-result-fail' element={
                    <PrivateRoute>
                        <SerchResultFail />
                    </PrivateRoute>
                }>
                </Route>

                <Route path='/customersfilter' element={
                    <PrivateRoute>
                        <CustomerDetails />
                    </PrivateRoute>
                }></Route>

                <Route path='/details' element={
                    <PrivateRoute>
                        <Details />
                    </PrivateRoute>
                }>
                </Route>

                <Route path='/customers' element={
                    <PrivateRoute>
                        <Customers />
                    </PrivateRoute>
                }>
                </Route>

                <Route path='/about' element={<About />}></Route>
                <Route path='/privacy' element={<Privacy />}></Route>
                <Route path='/terms' element={<Terms />}></Route>
                <Route path='/faq-customers' element={<FaqCustomers />}></Route>
                <Route path='/faq-instructors' element={<FaqInstructors />}></Route>

            </Routes>
        </BrowserRouter>
    )

}

export default Router;