import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext";
import * as authService from '../../services/authService';

import { Path } from "../../constants/constants";



export default function Logout(){
    const navigate = useNavigate();
    const { logoutHandler } = useContext(AuthContext);

    useEffect(() => {
        authService.logout()
        .then(() => {
            logoutHandler();
            navigate(Path.Home);
        })
        .catch(() => {
            logoutHandler();
            navigate(Path.Login);
        });
    }, []);

    return null;
}