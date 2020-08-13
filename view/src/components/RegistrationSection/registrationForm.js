import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progess: {
    position: "absolute",
  },
});

class signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      phoneNumber: "",
      password: "",
      errors: [],
      loading: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const newUserData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      dateOfBirth: this.state.dateOfBirth,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("/signup", newUserData)
      .then((response) => {
        localStorage.setItem("AuthToken", `${response.data.token}`);
        this.setState({
          loading: false,
        });
        this.props.history.push("/dashboard");
      })
      .catch((error) => {
        this.setState({
          errors: error.response.data,
          loading: false,
        });
      });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  helperText={errors.firstName}
                  error={errors.firstName ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  helperText={errors.lastName}
                  error={errors.lastName ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  helperText={errors.username}
                  error={errors.username ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  pattern="[7-9]{1}[0-9]{9}"
                  helperText={errors.phoneNumber}
                  error={errors.phoneNumber ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  helperText={errors.email}
                  error={errors.email ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  helperText={errors.password}
                  error={errors.password ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="dateOfBirth"
                  label="Date of Birth"
                  type="date"
                  id="dateOfBirth"
                  defaultValue="2017-05-24"
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
              // disabled={
              //   loading ||
              //   !this.state.email ||
              //   !this.state.password ||
              //   !this.state.firstName ||
              //   !this.state.dateOfBirth ||
              //   !this.state.lastName ||
              //   !this.state.username ||
              //   !this.state.phoneNumber
              // }
            >
              Sign Up
              {loading && (
                <CircularProgress size={30} className={classes.progess} />
              )}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(signup);
