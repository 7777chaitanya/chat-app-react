import { makeStyles } from "@material-ui/core";

const  useStyles = makeStyles(theme =>({
chat : {
    flex : 7,
    [theme.breakpoints.down('sm')]: {
        display : "none"
    },
}
}))

export default useStyles;