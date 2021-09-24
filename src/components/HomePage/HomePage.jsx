import React from 'react';
import useStyles from "./styles";
import {useHistory} from "react-router-dom"

const HomePage = () => {
    const history = useHistory();

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
