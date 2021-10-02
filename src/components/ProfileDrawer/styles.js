import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  list: {
    width: 360,
    overflow : "scroll",
    '&::-webkit-scrollbar': {
        width: '0.4em'
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,0.3)',
        outline: '1px solid slategrey'
      }
  },
  profileDrawerHeader: {
    display: "flex",
    paddingTop : "2rem",
    paddingLeft : "2rem",
    paddingBottom : "1rem",
    backgroundColor : "rgb(105,193,165)",
    backgroundImage: "linear-gradient(165deg, lightcyan, white)",

    alignItems : "center"
  },
  profileDrawerHeaderText: {
    fontSize: "x-large",
    fontWeight: 900,
    marginLeft : "2rem"
  },
  avatar: {
    flex: 3,
    display: "flex",
    justifyContent: "center",
    paddingTop : "2vh"
    // alignItems: "center",
  },
  avatarSize: {
    height: "20vw",
    width: "20vw",
    // width : "full-width",
    // height : "full-height"
  },
  yourNameBox:{
      padding : "2rem 3rem",
      

  },
  yourNameHeading:{
paddingBottom : "1rem"
  },
  avatarBox:{
      backgroundColor : "rgb(200,200,200)",
      backgroundImage: "linear-gradient(165deg, lightcyan, white)",

      padding: "1rem 0",
      // position : "absolute"
  },
  pBox : {
      padding : "2rem",
      backgroundColor : "rgb(200,200,200)",
      backgroundImage: "linear-gradient(165deg, lightcyan, white)"

  },
  usernameBox:{
    display :"flex",
    alignItems : "center"
  },
  progressBar:{
    marginTop : "1rem"
  }
});

export default useStyles;
