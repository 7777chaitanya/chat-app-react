import { makeStyles } from "@material-ui/core";

const  useStyles = makeStyles({
    app__body : {
        height : "100vh",
        width : "100vw",
        display : "flex",
        backgroundColor : "rgb(235,235,235)",
        boxShadow : "3px 3px 2px 2px rgba(0, 0, 0, 0.2)",

    },
    HeaderBox:{
         display : "flex",
         justifyContent : "center",
         alignItems : "center",
         padding : "1rem 0rem",
         backgroundColor : "rgb(105,193,165)",
         backgroundImage: "linear-gradient(165deg, lightcyan, white)"

    },
    messageBox:{
        marginRight : "2rem",
        marginTop : "1rem"
    },
    sidebar__header: {
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        alignItems: "center",
        backgroundColor: "rgb(235,235,235)",
        border: "1px solid black",
        maxWidth : "310px"
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
    
      },
      searchAlertCard:{
          padding: "1rem",
          backgroundImage: "linear-gradient(165deg, lightcyan, white)"

      }
})

export default useStyles;