import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import useStyles from "./styles";
import { CurrentUserDocContext } from "../../contexts/CurrentUserDocContext";
import { AllUsersContext } from "../../contexts/AllUsersContext";
import { Box, Popover } from "@material-ui/core";
import moment from "moment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { doc, deleteDoc,updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import StarIcon from "@material-ui/icons/Star";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
export default function RecipeReviewCard({
  name,
  time,
  message,
  imageUrl,
  email,
  id,
  roomDocId,
  starred,
  liked
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { allUsers, setAllUsers } = useContext(AllUsersContext);
  const { currentUserDoc, setCurrentUserDoc } = useContext(
    CurrentUserDocContext
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const userMessageClass = () => {
    if (name === "You") {
      return classes.chat__receiver;
    } else {
      return classes.chat__message;
    }
  };

  const profileBelongsTo = allUsers.find((user) => user.email === email);

  const handleStarMessage = async () => {
    console.log("starredc");
    handleClose();

    // const messageQuery = query(collection(db, "rooms", roomDocId, "messages", id));

    const docRef = doc(db, "rooms", roomDocId, "messages", id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(docRef, {
      starred: true,
    });
  };

  const handleUnstarMessage = async () => {
    handleClose();

    const docRef = doc(db, "rooms", roomDocId, "messages", id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(docRef, {
      starred: false,
    });
  };

  const handleDeleteMessage = async () => {
    console.log("deleted");
    handleClose();

    // const messageQuery = query(collection(db, "rooms", roomDocId, "messages", id));
    await deleteDoc(doc(db, "rooms", roomDocId, "messages", id));
  };

  const handleLikeMessage = async () => {
    console.log("starredc");
    // const messageQuery = query(collection(db, "rooms", roomDocId, "messages", id));
    handleClose();

    const docRef = doc(db, "rooms", roomDocId, "messages", id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(docRef, {
      liked: true,
    });
  };

  const handleDislikeMessage = async () => {
    const docRef = doc(db, "rooms", roomDocId, "messages", id);
    handleClose();

    // Set the "capital" field of the city 'DC'
    await updateDoc(docRef, {
      liked: false,
    });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const ide = open ? 'simple-popover' : undefined;

  

  return (
    <Card className={clsx(classes.root, userMessageClass())}>
      <CardHeader
        avatar={
          // profileBelongsTo ?
          // (<Avatar aria-label="recipe" className={classes.avatar} src={profileBelongsTo?.avatarUrl}/>):

          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={profileBelongsTo?.avatarUrl}
          >
            {name && name[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        }
        title={
          <Typography
            paragraph
            className={classes.chat__user}
            gutterBottom={false}
          >
            {name}
          </Typography>
        }
        subheader={
          <Typography paragraph className={classes.chat__timestamp}>
            {moment(time).format("MMM Do YYYY, h:mm:ss a")}
          </Typography>
        }
      />
      
      {imageUrl && (
        <CardMedia className={classes.media} image={imageUrl} title={name} />
      )}
      <CardContent className={classes.messageText}>
        <Typography variant="body2" color="textSecondary" component="p">
          {message}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
{liked  ?
        (<IconButton aria-label="add to favorites" onClick={handleDislikeMessage}>
          <FavoriteIcon />
        </IconButton>) :
  (
    <IconButton onClick={handleLikeMessage}>
      <FavoriteBorderIcon/>
    </IconButton>
  )}
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
         onClick={handleClick}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      

      <Popover
        id={ide}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <CardContent className={classes.collapseCard}>
          <List
            component="nav"
            aria-label="main mailbox folders"
            dense={false}
            disablePadding={true}
            disableSpacing={true}
          >
            {!starred ? (
              <ListItem button onClick={handleStarMessage}>
                <ListItemIcon>
                  <StarBorderIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="body2">Star</Typography>}
                />
              </ListItem>
            ) : (
              <ListItem button onClick={handleUnstarMessage}>
                <ListItemIcon>
                  <StarIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="body2">Unstar</Typography>}
                />
              </ListItem>
            )}

            <ListItem
              button
              className={classes.lastChild}
              onClick={handleDeleteMessage}
            >
              <ListItemIcon>
                <DeleteForeverIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">Delete</Typography>}
              />
            </ListItem>
          </List>
        </CardContent>
      </Popover>
    </Card>
  );
}
