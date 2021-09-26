import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        marginTop : "0.5rem",
        "&:hover": {
          backgroundColor: "rgb(235,235,235)"
        }

      },
      usercard : {
        textDecoration : "none",
        color : "black"
      },
      typographyRoot : {
        maxWidth: 345,
        marginTop : "0.5rem",
      },
      typography: {
          margin : "1rem 2rem",

      }
})

export default useStyles;