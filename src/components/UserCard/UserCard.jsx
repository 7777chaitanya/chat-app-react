import React,{useContext} from "react";
import { CardHeader, Avatar, IconButton } from '@material-ui/core';
import { Card } from '@material-ui/core';
import useStyles from './styles.js';
import {Link} from "react-router-dom";
import { Typography } from '@material-ui/core';
import { ShowSearchListContext } from '../../contexts/ShowSearchListContext';


const UserCard = ({item}) => {
    const classes = useStyles();
    const { showSearchList, setShowSearchList, closeSearchList, openSearchList } = useContext(ShowSearchListContext)

    
  return (
    (item.name === "No results found!" || item.name ==="Enter a word to Search!") 
    
    ?

    (<Card className={classes.typographyRoot}>

    <Typography className={classes.typography} variant="body1">{item.name}</Typography>
</Card>)
:
    (<Card className={classes.root}>
      
      <CardHeader
        className={classes.usercard}
        // component={Link}
        // to={`/profile/${item.name}`}
        onClick={closeSearchList}
        avatar={
          (item?.avatarUrl!==null) &&
          (
          (item?.avatarUrl)  ? (
            <Avatar
              alt={item?.name}
              src={item?.avatarUrl}
              className={classes.avatarSize}
            />
          ) : (
            <Avatar aria-label="recipe" className={classes.avatarSize} src={item?.avatarUrl}
          >
            {item.name[0].toUpperCase()}
          </Avatar>
          )
          )
        }
    
        title={item.name}
      />
    </Card>)
      
)
    }

export default UserCard;