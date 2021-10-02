import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    box: {
      display: "flex",
      justifyContent: "center",
      margin: "1rem",
      flexDirection : "column"
    },
    form: {
      border: "1px solid lightgray",
      margin: "5px",
      borderRadius: 5,
      // width: "50vw",
      padding: "0px 5rem",
      boxShadow:
        "0rem 0.1rem 0.1rem 0.1rem linear-gradient(165deg, lightcyan, white)",
      backgroundImage: "linear-gradient(165deg, lightcyan, white)",
    },
    button: {
      // background: "linear-gradient(135deg, lightgray, greenyellow)",
      backround: "lightgray",
      padding: "0.25rem 2rem",
      width: "20vw",
    },
    mainForm: {
      display: "flex",
      height: "100vh",
      alignItems: "center",
      justifyContent: "center",
    },
    outer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width : "100vw",
      backgroundImage: "linear-gradient(165deg, lightcyan, white)",

    },
    formBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    divider: {
      width: "50vw",
      height : "2rem",
      padding: "0.5rem 0",
      paddingLeft: "25vw",
      display : "flex",
  
      justifyContent : "center",
    },
    link: {
      textAlign: "center",
      textDecoration: "none",
      color: "black",
    },
    typography: {
      color: "rgb(91,96,116)",
    },
  });

  export default useStyles;