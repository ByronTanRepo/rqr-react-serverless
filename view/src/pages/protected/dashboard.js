import React, { Component } from "react";
import axios from "axios";

//components
import Account from "../../components/account";
import Goal from "../../components/goal";

import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles from "@material-ui/core/styles/withStyles";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import NotesIcon from "@material-ui/icons/Notes";
// import Avatar from "@material-ui/core/avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

import { authMiddleWare } from "../../util/auth";

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  avatar: {
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
    marginTop: 20,
  },
  uiProgess: {
    position: "fixed",
    zIndex: "1000",
    height: "31px",
    width: "31px",
    left: "50%",
    top: "35%",
  },
  toolbar: theme.mixins.toolbar,
});

class dashboard extends Component {
  state = {
    render: false,
  };

  loadAccountPage = (event) => {
    this.setState({ render: true });
  };

  loadGoalPage = (event) => {
    this.setState({ render: false });
  };

  logoutHandler = (event) => {
    localStorage.removeItem("AuthToken");
    this.props.history.push("/login");
  };

  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      profilePicture: "",
      profileComplete: "",
      role: "",
      uiLoading: true,
      imageLoading: false,
    };
    this.renderProfilePromt = this.renderProfilePromt.bind(this);
  }

  renderProfilePromt = () => {
    if (!this.state.completedProfile) {
      return alert("Please Complete Account Information");
    }
  };

  componentDidMount = () => {
    authMiddleWare(this.props.history);
    const authToken = localStorage.getItem("AuthToken");
    axios.defaults.headers.common = {
      Authorization: `${authToken}`,
    };
    axios
      .get("/user")
      .then((response) => {
        this.setState({
          firstName: response.data.userCredentials.firstName,
          lastName: response.data.userCredentials.lastName,
          email: response.data.userCredentials.email,
          phoneNumber: response.data.userCredentials.phoneNumber,
          username: response.data.userCredentials.username,
          profileComplete: response.data.userCredentials.profileComplete,
          role: response.data.userCredentials.role,
          uiLoading: false,
          profilePicture: response.data.userCredentials.imageUrl,
        });
      })
      .catch((error) => {
        if (error.response.status === 403) {
          this.props.history.push("/login");
        }
        console.log(error);
        this.setState({ errorMsg: "Error in retrieving the data" });
      });
  };

  render() {
    const { classes } = this.props;
    if (this.state.uiLoading === true) {
      return (
        <div className={classes.root}>
          {this.state.uiLoading && (
            <CircularProgress size={150} className={classes.uiProgress} />
          )}
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" noWrap>
                RQR
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
          >
            <div className={classes.toolbar} />
            <Divider />
            <center>
              {/* <Avatar
                src={this.state.profilePicture}
                className={classes.avatar}
              /> */}
              <p>
                {" "}
                {this.state.firstName} {this.state.lastName}
              </p>
            </center>
            <Divider />
            {this.state.profileComplete !== true ? (
              <Alert severity="info">Please Complete Account Information</Alert>
            ) : null}
            <List>
              {this.state.role !== 0 ? (
                <ListItem button key="Goals" onClick={this.loadGoalPage}>
                  <ListItemIcon>
                    {" "}
                    <NotesIcon />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Goals" />
                </ListItem>
              ) : null}
              <ListItem button key="Account" onClick={this.loadAccountPage}>
                <ListItemIcon>
                  {" "}
                  <AccountBoxIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItem>
              <ListItem button key="Logout" onClick={this.logoutHandler}>
                <ListItemIcon>
                  {" "}
                  <ExitToAppIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Drawer>
          <div> {this.state.render ? <Account /> : <Goal />}</div>
        </div>
      );
    }
  }
}

export default withStyles(styles)(dashboard);