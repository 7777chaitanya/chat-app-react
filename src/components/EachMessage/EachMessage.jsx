import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useStyles from "./styles";
import { CurrentUserDocContext } from '../../contexts/CurrentUserDocContext';
import { AllUsersContext } from '../../contexts/AllUsersContext';
import { Box } from '@material-ui/core';
import moment from 'moment'


export default function RecipeReviewCard({name,time,message, imageUrl, email}) {
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
    if(name==="You"){
        return classes.chat__receiver
    }
    else{
        return classes.chat__message
    }    
  }

  

  return (
    <Card className={clsx(classes.root,userMessageClass())} >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
            <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        }
        title={<Typography paragraph className={classes.chat__user} gutterBottom={false}>{name}</Typography>}
        subheader={<Typography paragraph className={classes. chat__timestamp}>{moment(time).format('MMM Do YYYY, h:mm:ss a')}</Typography>}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. 
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
      {imageUrl &&
      <CardMedia
        className={classes.media}
        image={imageUrl}
        title={name}
      />}
      <CardContent className={classes.messageText}>
        <Typography variant="body2" color="textSecondary" component="p" >
          {message}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      
    </Card>
  );
}
