import { makeStyles } from "@material-ui/core";

const  useStyles = makeStyles({
    root: {
        maxWidth: 345,
        borderBottom : "0.0000001rem solid lightgray",
        backgroundColor : "white",
       
        cursor : "pointer"
      },
      cardHeader:{
        '&:hover': { 
            background: "rgba(200,200,200,0.3)"
        }
      },
      lastMessageTime:{
        fontSize : "0.7rem"
      },
      senderName:{
        fontWeight : "500",
        fontSize : "1rem"
      }
})

export default useStyles;