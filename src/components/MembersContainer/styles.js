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
         backgroundImage: "linear-gradient(165deg, lightcyan, white)",

         
    },
    messageBox:{
        marginRight : "2rem",
        marginTop : "1rem"
    },
   
})

export default useStyles;