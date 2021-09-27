import { makeStyles } from "@material-ui/core";

const  useStyles = makeStyles({
    app : {
        backgroundColor : "rgb(248,249,250)",
        height : "100vh",
        display : "grid",
        placeItems : "center"

    },
    app__body : {
        height : "100vh",
        width : "100vw",
        display : "flex",
        backgroundColor : "rgb(235,235,235)",
        boxShadow : "3px 3px 2px 2px rgba(0, 0, 0, 0.2)",
        



    }
})

export default useStyles;