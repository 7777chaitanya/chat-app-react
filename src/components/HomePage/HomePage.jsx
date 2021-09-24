import React, {useContext} from 'react';
import useStyles from "./styles";
import {useHistory} from "react-router-dom"
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const HomePage = () => {
    const history = useHistory();
   const [user, setUser] =  useContext(CurrentUserContext);
   console.log("user in home page => ", user)

    const classes = useStyles();

    const gotoapppage = () => {
history.push(`/app/chat/`);
    }

    return (
        <div>
            home page
            <button onClick={gotoapppage}>
                go to app page
            </button>
        </div>
    )
}

export default HomePage
