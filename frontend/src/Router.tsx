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

import utils from './assets/utils/utils.json';
import Construction from './pages/partials/Construction';

function Router() {

    type Props = {
        children: JSX.ReactElement;
    }

    function PrivateRoute({ children }: Props) {
        const isAuth = localStorage.getItem(`${import.meta.env.VITE_TOKEN_VAR}`);
        return (isAuth != null) ? children : <Navigate to="/home" />
    }

    function InstructorRoute({ children }: Props) {
        const role = localStorage.getItem(`${import.meta.env.VITE_ROLE_VAR}`);
        return (role === utils.role.instrutor) ? children : <Navigate to="/home" />
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/home' element={<App />} />
                <Route path='/signin' element={<SignInPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/construction' element={<Construction />} />
                <Route path='/signup-result' element={<SignUpResult />} />

                <Route path='/register-result' element={
                    <PrivateRoute>
                        <RegisterResult />
                    </PrivateRoute>
                } />

                <Route path='/register' element={
                    <PrivateRoute>
                        <InstructorRoute>
                            <RegisterForm />
                        </InstructorRoute>
                    </PrivateRoute>
                } />

                <Route path='/search' element={
                    
                        <SearchForm />
                    
                } />

                <Route path='/search-result' element={
                    
                        <SearchResult />
                    
                } />

                <Route path='/search-result-fail' element={
                    
                        <SerchResultFail />
                    
                } />

                <Route path='/customersfilter' element={
                    <PrivateRoute>
                        <CustomerDetails />
                    </PrivateRoute>
                } />

                <Route path='/details' element={
                    <PrivateRoute>
                        <InstructorRoute>
                            <Details />
                        </InstructorRoute>
                    </PrivateRoute>
                } />

                <Route path='/customers' element={
                    <PrivateRoute>
                        <Customers />
                    </PrivateRoute>
                } />

                <Route path='/about' element={<About />} />
                <Route path='/privacy' element={<Privacy />} />
                <Route path='/terms' element={<Terms />} />
                <Route path='/faq-customers' element={<FaqCustomers />} />
                <Route path='/faq-instructors' element={<FaqInstructors />} />

            </Routes>
        </BrowserRouter>
    )

}

export default Router;