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
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { auth, db } from "../../firebase";
import useStyles from "./styles";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const classes = useStyles();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signinSuccess, setSigninSuccess] = useState("");
  const { signup } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("sign up method =>", auth);

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match!");
    }
    try {
      setError("");
      setLoading(true);
      setSigninSuccess("");

      const result = await signup(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      if (result) {
        setSigninSuccess("Account registered Successfully!");
      }

      // write user details to user collection
      await setDoc(doc(db, "users", emailRef.current.value), {
        name: usernameRef.current.value,
        email: emailRef.current.value,
        avatarUrl: "",
      });

      history.push("/");
      console.log("result =>", result);
    } catch (error) {
      setError(error.code);
    }
    // setError
    setLoading(false);
  };

  return (
    <Box className={classes.outer}>
      <Typography
        variant="h3"
        color="primary"
        align="center"
        className={classes.typography}
      >
        SignUp for HippoWire
      </Typography>
      <Box className={classes.box}>
        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}
      </Box>
      <Box className={classes.box}>
        {signinSuccess && (
          <Alert variant="filled" severity="success">
            {signinSuccess}
          </Alert>
        )}
      </Box>

      <Box className={classes.formBox}>
        <form onSubmit={handleSubmit}>
          <Box className={classes.form}>
            <Box className={classes.box}>
              <FormControl>
                <InputLabel htmlFor="my-input">Username</InputLabel>
                <Input
                  id="my-input"
                  aria-describedby="my-helper-text"
                  inputRef={usernameRef}
                />
                {/* <FormHelperText id="my-helper-text">
                    We'll never share your email.
                  </FormHelperText> */}
              </FormControl>
            </Box>

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
              <FormControl>
                <InputLabel htmlFor="my-input">
                  Password Confirmation
                </InputLabel>
                <Input
                  id="my-input"
                  aria-describedby="my-helper-text"
                  type="password"
                  inputRef={passwordConfirmRef}
                />
                <FormHelperText id="my-helper-text">
                  We'll never share your email.
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
                Submit
              </Button>
            </Box>
            <Box className={classes.link}>
            {/* <a style={{ textDecoration: "none", color: "black" }} href="/login"> */}

            <Typography
              variant="subtitle2"
              component={Link}
              to="/login"
              className={classes.link}
            >
              Already have an Account? Log In!
            </Typography>
            {/* </a> */}
          </Box>
          </Box>
         
        </form>
        {/* <Divider/> */}
      </Box>
      <Box className={classes.divider}>
        <Divider />
      </Box>
    </Box>
  );
};

export default Signup;
