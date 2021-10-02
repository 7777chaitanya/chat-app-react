import { makeStyles } from "@material-ui/core";
import { red } from '@material-ui/core/colors';


const  useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
        marginBottom : "1rem"
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),

      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: red[500],
        width: theme.spacing(3),
    height: theme.spacing(3),
      },
      chat__receiver : {
        backgroundColor : "white",
        position : 'relative',
        fontSize : "1rem",
        // padding : '1rem',
        // borderRadius : '1rem',
        width : "fit-content",
        // marginBottom : "1rem",
          marginLeft : "auto",
          backgroundColor : "rgb(219,246,198)",
          backgroundImage: "linear-gradient(165deg, lightcyan, white)"

      },
      chat__message : {
        backgroundColor : "white",
        position : 'relative',
        fontSize : "1rem",
        // padding : '1rem',
        // borderRadius : '1rem',
        width : "fit-content",
        
        // marginBottom : "1rem"
        
  
    },
    chat__timestamp : {
        marginLeft : "0.3rem",
        fontSize : "xx-small",
        marginBottom : "0"
    },
    chat__user:{
        // position : "absolute",
        fontSize : "medium",
        fontWeight : 800,
        marginBottom : "0",
        color : "rgb(91,96,116)"
        // top : 0,
        // left : 8
    },
    messageText:{
        paddingTop : "0rem"
    },
    collapseCard:{
      padding : "0rem"
      
    },
    lastChild:{
      paddingBottom : "0rem"
    },
    messageCardHeader:{
      paddingTop : "0rem",
      paddingBottom : "0rem"
    }
}))

export default useStyles;