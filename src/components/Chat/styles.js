import { createTheme, makeStyles } from "@material-ui/core";



const  useStyles = makeStyles(theme =>({
chat : {
    flex : 7,
    [theme.breakpoints.down('sm')]: {
        display : "none"
    },
    border : "1px solid black"
}
}))

export default useStyles;