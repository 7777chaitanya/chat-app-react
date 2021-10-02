import { makeStyles } from "@material-ui/core";
import Image from "./logo.png"

const useStyles = makeStyles({
  box: {
    display: "flex",
    justifyContent: "center",
    margin: "1rem",
  },
  form: {
    border: "1px solid lightgray",
    // margin: "1rem",
    borderRadius: 5,
    // width: "50vw",
    padding: "0px 5rem",
    boxShadow:
      "0rem 0.1rem 0.1rem 0.1rem linear-gradient(165deg, lightcyan, greenyellow)",
    backgroundImage: "linear-gradient(165deg, lightcyan, white)",
  },
  button: {
    background: "linear-gradient(15deg, gray, lightcyan)",
    backround: "lightgray",
    padding: "0.25rem 2rem",
    width: "20vw",
  },
  mainForm: {
    display: "flex",
    height: "105vh",
    alignItems: "center",
    justifyContent: "center",
  },
  outer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    backgroundImage: "linear-gradient(165deg, lightcyan, white)",
    color : "white",
    // backgroundRepeat: "repeat",
    backgroundPosition: "center",
    backgroundSize: "auto",
    backgroundOrigin: "content-box"




  },
  formBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // padding : "5rem"
    marginBottom : "3rem"
  },
  divider: {
    width: "50vw",
    height: "1rem",
    padding: "0.5rem 0",
    paddingLeft: "25vw",
    display: "flex",

    justifyContent: "center",
  },
  link: {
    textAlign: "center",
    textDecoration: "none",
    color: "black",
  },
  typography: {
    color: "rgb(91,96,116)",
    marginTop : "5rem"
  },
});

export default useStyles;
