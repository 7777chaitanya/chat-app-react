import {
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    Box,
    Button,
    Typography,
    CssBaseline,
    Divider,
  } from "@material-ui/core";
  import Alert from "@material-ui/lab/Alert";
  import React, { useRef, useState } from "react";
  import { makeStyles } from "@material-ui/core/styles";
  import {Link, useHistory} from 'react-router-dom';
  
  import { useAuth } from "../../contexts/AuthContext";
  import { auth } from "../../firebase";
  
  
  import useStyles from "./styles";
  
  const Login2 = () => {
    const classes = useStyles();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const history = useHistory();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("sign up method =>", auth);
  
      
      try {
        setError("");
        setLoading(true);
      //   setSigninSuccess("");
  
        const result = await login(
          auth,
          emailRef.current.value,
          passwordRef.current.value
        );
        
    
        console.log("result =>", result);
        history.push('/');
      } catch (error) {
        
        setError("Failed to log in");
      }
      setLoading(false);
    };
  
    return (
      <Box  className={classes.outer}>
        <Typography
          variant="h3"
          color="primary"
          align="center"
          className={classes.typography}
        >
          LogIn to HippoWire
        </Typography>
        <Box className={classes.box}>
          {error && (
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          )}
        </Box>
        {/* <Box className={classes.box}>
          {signinSuccess && (
            <Alert variant="filled" severity="success">
              {signinSuccess}
            </Alert>
          )}
        </Box> */}
  
        <Box className={classes.formBox}>
          <form onSubmit={handleSubmit}>
            <Box className={classes.form}>
              <Box className={classes.box}>
                <FormControl>
                  <InputLabel htmlFor="my-input">Email address</InputLabel>
                  <Input
                    id="my-input"
                    aria-describedby="my-helper-text"
                    inputRef={emailRef}
                  />
                  <FormHelperText id="my-helper-text">
                    We'll never share your email.
                  </FormHelperText>
                </FormControl>
              </Box>
              <Box className={classes.box}>
                <FormControl>
                  <InputLabel htmlFor="my-input">Password</InputLabel>
                  <Input
                    id="my-input"
                    aria-describedby="my-helper-text"
                    type="password"
                    inputRef={passwordRef}
                  />
                  <FormHelperText id="my-helper-text">
                    We'll never share your password.
                  </FormHelperText>
                </FormControl>
              </Box>
  
              <Box className={classes.box}>
                <Button
                  color="white"
                  className={classes.button}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </form>
          {/* <Divider/> */}
        </Box>
        <Box className={classes.divider}>
          <Divider />
        </Box>
        <Box className={classes.link}>
          <Typography
            variant="subtitle2"
            component={Link}
            to="/forgot-password"
            className={classes.link}
            
          >
            Forgot Password?
          </Typography>
        </Box>
         <Box className={classes.divider}>
          <Divider />
        </Box>
        <Box className={classes.link}>
          <Typography
            variant="subtitle2"
            component={Link}
            to="/signup"
            className={classes.link}
          >
            Don't have an account? SignUp!
          </Typography>
        </Box>
      </Box>
    );
  };
  
  export default Login2;
  