import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  list: {
    width: 360,
  },
  profileDrawerHeader: {
    display: "flex",
    paddingTop : "4rem",
    paddingLeft : "2rem",
    paddingBottom : "2rem",
    backgroundColor : "rgb(105,193,165)",
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
      padding: "1rem 0"
  },
  pBox : {
      padding : "2rem",
      backgroundColor : "rgb(200,200,200)"
  }
});

export default useStyles;
