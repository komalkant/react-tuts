//////////////// all routes ////////////////////////////
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import DoctorsList from './components/DoctorsList'
import LandingPage from './components/LandingPage'
import HomePage from './components/Home'
import SignUp from './containers/auth/signup/SignUp'
import Login from './containers/auth/signin/Login'
import RequireAuth from './containers/auth/requireauth/requireauth'
import ForgetPassword from './containers/auth/forgetpassword/ForgetPassword'
import SelectPlan from './components/selectplan'
import DoctorDetail from './components/doctordetail'
import Error404 from './components/error404'
import Settings from './components/patientprofile/settings'
import Appointment from './components/appointment'
import Payment from './components/payment'
import DoctorSignup from './components/doctorsignup/doctorSignup'
import DoctorProfile from './components/doctorprofile/doctorprofile'
import MedicalRecord from './components/medicalrecords/medicalrec'
import Terms from './components/t&c'
import ResetPass from './components/resetpass'
export default (
   
    < Route path= "/" component= { App } >
        <IndexRoute component={LandingPage} />
        <Route path="home" component={HomePage} />
        <Route path="login" component={Login} />
        <Route path="signup" component={SignUp} />
        <Route path="forgotpassword" component={ForgetPassword} />
        <Route path="doctorlist" component={DoctorsList} />
        <Route path="doctorsignup" component={DoctorSignup} />
        <Route path="payment" component={RequireAuth(Payment)} />
        <Route path="book" component={DoctorDetail} />
        <Route path="selectplan" component={RequireAuth(SelectPlan)} />
        <Route path="appointment" component={RequireAuth(Appointment)} />
        <Route path="settings" component={RequireAuth(Settings)} />
        <Route path="doctorprofile" component={RequireAuth(DoctorProfile)} />
        <Route path="medicalrecords" component={RequireAuth(MedicalRecord)} />
        <Route path="terms" component={Terms} />
        <Route path="reset/:id" component={ResetPass} />
        <Route path='*' component={Error404} />
    </Route >
);