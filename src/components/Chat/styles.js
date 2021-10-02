import { createTheme, makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import image from "./whatsappbackground.png";
import image1 from "./nightbg.jpg";
import image2 from "./undraw_Online_chat_re_c4lx.png"


const useStyles = makeStyles((theme) => ({
  chat: {
    flex: 7,
    [theme.breakpoints.down("sm")]: {
      // display: "none",
    },
    // border: "1px solid black",
    display: "flex",
    flexDirection: "column",
    minWidth : "30rem",
    borderLeft : "1px solid darkgray"
  },
  avatar: {
    backgroundColor: red[500],
  },
  chat__header: {
    border : "1px solid darkgray",
    borderLeft : "none",
    borderRight : "none",
    backgroundImage: "linear-gradient(180deg, lightcyan, white)"

  },
  chat__body: {
    // minHeight : "70vh",
    // height : "100%",
    flex : 1,
    backgroundImage: `url(${image})`,
    backgroundRepeat: "repeat",
    backgroundPosition: "center",
    overflow: "scroll",
    padding: "1rem",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },

  },
  chat__footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxHeight: "3rem",
    padding: "0.5rem 1rem",
    position: "sticky",
    bottom : 0

  },
  footerIcons: {
    color: "gray",
  },
  chat__footer__messageform: {
    flex: 1,
    // backgroundColor : "green",
    display: "flex",
  },
  messageInput: {
    flex: 1,
    margin: "0 2rem",
    height: "2.7rem",
    borderRadius: "50px",
    border: "none",
    "&:focus": {
      outlineWidth: "0rem",
    },
    padding: "0 1rem",
  },
  chat__message: {
    backgroundColor: "white",
    position: "relative",
    fontSize: "1rem",
    padding: "1rem",
    borderRadius: "1rem",
    width: "fit-content",
    marginBottom: "1rem",
  },
  chat__user: {
    position: "absolute",
    fontSize: "xx-small",
    fontWeight: 800,
    top: 0,
    left: 8,
  },
  chat__timestamp: {
    marginLeft: "0.3rem",
    fontSize: "xx-small",
  },
  chat__receiver: {
    backgroundColor: "white",
    position: "relative",
    fontSize: "1rem",
    padding: "1rem",
    borderRadius: "1rem",
    width: "fit-content",
    marginBottom: "1rem",
    marginLeft: "auto",
    backgroundColor: "rgb(219,246,198)",
  },
  submitButton: {
    display: "none",
  },
  input: {
    display: "none",
  },
  chatSettingsList: {
    minWidth: "8rem",
  },
  fullChatContainer: {
    display: "flex",
  },
  fullChatContainerLeft: {
    display: "flex",
    height: "99.8vh",
    flexDirection: "column",
    flex: 6,
    overflow: "scroll",
    // padding : "1rem",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  fullChatContainerRight: {
    flex: 4,
    overflow: "scroll",
    maxHeight: "99vh",

    // padding : "1rem",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
   
    // display : "none"
  },
  imageName:{
    color : "black",
    fontSize : "0.7rem"
},
emojiPanel:{
  zIndex : 10000,
  position : "relative",
}
}));

export default useStyles;
