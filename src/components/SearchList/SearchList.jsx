import { Card } from '@material-ui/core';
import React, {useContext} from 'react';
import useStyles from "./styles"
import { AllUsersContext } from '../../contexts/AllUsersContext';

const SearchList = (searchTerm) => {
    const classes = useStyles();
    
    const {allUsers} = useContext(AllUsersContext);
    console.log("SearchList => ", allUsers);
    return (
        <Card className={classes.root}>
            {allUsers.map(eachUser => <h6>{eachUser.name}</h6>)}
        </Card>
    )
}

export default SearchList
