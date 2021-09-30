import { Avatar, Card, CardHeader } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";


const UserCard1 = ({ user, searchTerm }) => {
 const classes = useStyles();

 const handleCardClick = () => {
     console.log(user.name);
 }

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.usercard}
        onClick={handleCardClick}
        avatar={
          <Avatar
            alt={user?.name}
            src={user?.avatarUrl}
            className={classes.avatarSize}
          >
            {user.name[0].toUpperCase()}
          </Avatar>
        }
        title={user.name}
      />
    </Card>
  );
};

export default UserCard1;
