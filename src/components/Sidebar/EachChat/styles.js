import { makeStyles } from "@material-ui/core";

const  useStyles = makeStyles({
    root: {
        minWidth: "22.6",

        // maxWidth : "100%",
        borderBottom : "0.0000001rem solid lightgray",
        backgroundColor : "white",
       
        cursor : "pointer",
        marginLeft : "auto",
        marginRight : "auto",
        backgroundImage: "linear-gradient(165deg, lightcyan, white)"

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