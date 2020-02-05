import React from 'react';
import HomePage from "../components/HomePage"
import Register from "../components/pages/Register"
import LogIn from "../components/pages/LogIn"
import ChangePassword from "../components/pages/ChangePassword"
import { Redirect } from 'react-router-dom';
import CreateVacation from '../components/pages/CreateVacation';

const routes = [
    { role: "guest", exact: true, isVisible: false, title: "Change Password", path: "/changepassword", component: ChangePassword },
    { role: "guest", exact: true, isVisible: true, title: "Log In", path: "/login", component: LogIn },
    { role: "guest", exact: true, isVisible: false, title: "Register", path: "/register", component: Register },
    { role: "all", exact: true, isVisible: true, title: "Home", path: "/home", component: HomePage },
    { role: "admin", exact: true, isVisible: true, title: "Reports", path: "/reports", component: HomePage },
    { role: "admin", exact: true, isVisible: false, title: "create vacation", path: "/createoredit", component: CreateVacation }
]

export default routes


