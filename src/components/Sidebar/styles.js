import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme=>({
  sidebar: {
    flex: 3,
    // borderRight: "1px solid black",
    display : "flex",
    flexDirection : "column",
    minWidth : "22.6rem"
  },
  sidebar__header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    alignItems: "center",
    backgroundColor: "rgb(235,235,235)",
    // border: "1px solid darkgray",
    borderRight : 'none',
    // maxWidth : "22.6rem",
    width : "100%",
    backgroundImage: "linear-gradient(165deg, lightcyan, white)"

  },
  sidebar__header__icon: {
    marginRight: "2rem",
  },
  sidebar__header__icons:{
    marginRight : "2rem"
  },
  searchIcon: {
    margin: "auto 1rem",
    color: "darkgray",
    backgorundColor: "white",
    marginTop : "0.5rem"
    

  },
  sidebar_search: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    border: "1rem solid white",
    height : "1rem",
    backgroundColor : "white",
    borderRadius : "50px",
    maxWidth : "310px"

  },
  inputField: {
    width: "100%",
    border: "none",
    height : "2rem",
    "&:focus": {
       outlineWidth : "0rem"
      }
  },
  sidebar_searchicon_div : {
      backgroundColor : "white"
  },
  sidebar_search__container : {
      padding: "0.5rem",
      backgroundColor : "rgb(235,235,235)",
      marginTop : "1px solid darkgray",
      // backgroundImage: "linear-gradient(165deg, lightcyan, white)"


  },
  sidebar__chats:{
      overflow : "scroll", 
      flex : 1,
      overflowX : "hidden",
      '&::-webkit-scrollbar': {
        width: '0.4em'
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        outline: '1px solid slategrey'
      },
      backgroundImage: "linear-gradient(165deg, lightcyan, white)"

  },
  addRoomCard:{
    display : "flex",
    flexDirection : "column",
    [theme.breakpoints.down('sm')]: {
      width : "70vw",
      height : "auto"
    },
    [theme.breakpoints.up('sm')]: {
      width : "50vw",
      height : "auto"    },
    
  },
  addRoomForm:{
    display : "flex",
    flexDirection : "column"
  },
  typography : {
    margin : "1rem"
  },
  inputFieldCard:{
    margin : "1rem auto",
    
  },
  addRoomCardButtons:{
    margin : "1rem auto",

  },
  input : {
    display : "none"
  },
  uploadButton:{
    margin : "1rem auto"
  },
  noMessagesCard:{
    backgroundImage: "linear-gradient(165deg, lightcyan, white)"

  },
  noMessagesTest:{
    margin: "1rem"
  }
 
}));

export default useStyles;
