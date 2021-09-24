import { createTheme, makeStyles } from "@material-ui/core";
import { red } from '@material-ui/core/colors';
import image from "./whatsappbackground.png";

const useStyles = makeStyles((theme) => ({
  chat: {
    flex: 7,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    border: "1px solid black",
    display: "flex",
    flexDirection: "column",
  },
  avatar : {
    backgroundColor: red[500],
  },
  chat__header: {

  },
  chat__body: {
      flex : 1,
      backgroundImage : `url(${image})`,
      backgroundRepeat : "repeat",
      backgroundPosition : 'center',
      overflow: "scroll",
      padding : "1rem",
      overflowX : "hidden"
      
    //   height : "50vh"
  },
  chat__footer: {

    display : "flex",
    justifyContent : "space-between",
    alignItems : "center",
    height : "3rem",
    padding: "0 1rem"

  },
  footerIcons:{
      color : "gray"
  },
  chat__footer__messageform : {
flex : 1,
// backgroundColor : "green",
display : "flex"

  },
  messageInput:{
    flex : 1,
    margin : "0 2rem",
    height :"2.7rem",
    borderRadius : "50px",
    border : "none",
    "&:focus": {
        outlineWidth : "0rem"
       },
    padding : "0 1rem"
  },
  chat__message : {
      backgroundColor : "white",
      position : 'relative',
      fontSize : "1rem",
      padding : '1rem',
      borderRadius : '1rem',
      width : "fit-content",
      marginBottom : "1rem"
      

  },
  chat__user:{
      position : "absolute",
      fontSize : "xx-small",
      fontWeight : 800,
      top : 0,
      left : 8
  },
  chat__timestamp : {
      marginLeft : "0.3rem",
      fontSize : "xx-small"
  },
  chat__receiver : {
    backgroundColor : "white",
    position : 'relative',
    fontSize : "1rem",
    padding : '1rem',
    borderRadius : '1rem',
    width : "fit-content",
    marginBottom : "1rem",
      marginLeft : "auto",
      backgroundColor : "rgb(219,246,198)"
  },
  submitButton:{
      display : "none"
  }
}));

export default useStyles;
