import { makeStyles } from "@material-ui/core";

const  useStyles = makeStyles({
    sidebar : {
        flex : 3,
        borderRight : "1px solid black"
    },
    sidebar__header : {
        display : "flex",
        justifyContent : "space-between",
        padding : "1rem",
        alignItems : 'center',
        backgroundColor : "rgb(235,235,235)"
    },
    sidebar__header__icon : {
            marginRight : "2rem"
    }
})

export default useStyles;