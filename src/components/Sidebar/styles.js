import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  sidebar: {
    flex: 3,
    borderRight: "1px solid black",
  },
  sidebar__header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    alignItems: "center",
    backgroundColor: "rgb(235,235,235)",
    border: "1px solid black",
  },
  sidebar__header__icon: {
    marginRight: "2rem",
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

  }
});

export default useStyles;
