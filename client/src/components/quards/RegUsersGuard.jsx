import { useContext, useState } from "react"
import { Navigate, Outlet } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext"
import { Path } from "../../constants/constants";
import Modal from "../404/ModalErrors/ModalErrors";

export default function RegUsersGuard(props){
    const { isAuthenticated } = useContext(AuthContext);

    const [isClicked, setIsClicked] = useState(false);
    const[createError, setCreateError ] = useState({message: "You are alredy loged in"});


    if(isAuthenticated){
        return <Modal {...createError} />;
    }

    return <Outlet />;
}