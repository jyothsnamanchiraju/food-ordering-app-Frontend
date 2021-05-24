import React, { Component } from "react";
import "./Header.css";

import Modal from "react-modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import PropTypes from "prop-types";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Fastfood from "@material-ui/icons/Fastfood";
import Search from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Snackbar from "@material-ui/core/Snackbar";
import validator from "validator";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const TabContainer = function (props) {
  return (
    <Typography
      component="div"
      style={{ padding: 0, paddingTop: "30px", textAlign: "left" }}
    >
      {props.children}
    </Typography>
  );
};

TabContainer.propTypes = { children: PropTypes.node.isRequired };

const validPassword = function (password) {
  if (
    validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
  ) {
    return true;
  } else {
    return false;
  }
};

const ValidContact = function (contact) {
  if (isNaN(contact)) return false;
  else if (contact.length !== 10) return false;
  else return true;
};

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loginModalOpen: false,
      value: 0,
      contactnumberRequired: "dispNone",
      contactnumber: "",
      passwordRequired: "dispNone",
      password: "",
      validlogin: false,
      firstname: "",
      firstnameRequired: "dispNone",
      email: "",
      emailRequired: "dispNone",
      invalidEmail: "dispNone",
      regpassword: "",
      regPasswordRequired: "dispNone",
      invalidRegPassword: "dispNone",
      regContactNumber: "",
      regContactRequired: "dispNone",
      invalidContact: "dispNone",
      allFieldsValid: false,
      signupSuccessful: false,
      loggedIn: false,
      openLoginSnackBar: false,
      loggedInCustomerName: "",
      anchorEl: null,
      snackBarMessage: "",
      signupError: false,
      signupErrorMsg: "",
      loginErrorMsg: "",
      snackBarOpen: false,
    };
  }

  tabchangeHandler = (event, value) => {
    this.setState({ value });
    this.setState({ password: "", regpassword: "" });
  };

  loginModalHandler = () => {
    this.setState({ loginModalOpen: true });
  };

  closeModalHandler = () => {
    this.setState({ loginModalOpen: false, value: 0, loginError: false });

    this.setState({
      contactnumberRequired: "dispNone",
      passwordRequired: "dispNone",
    });

    this.setState({
      firstnameRequired: "dispNone",
      emailRequired: "dispNone",
      regPasswordRequired: "dispNone",
      regContactRequired: "dispNone",
      invalidEmail: "dispNone",
      invalidRegPassword: "dispNone",
      invalidContact: "dispNone",
    });
  };

  inputContactNumberChangeHandler = (e) => {
    this.setState({
      contactnumber: e.target.value,
      contactnumberRequired: "dispNone",
    });
  };

  inputPasswordChangeHandler = (e) => {
    this.setState({ password: e.target.value, passwordRequired: "dispNone" });
  };

  loginClickHandler = () => {
    this.state.contactnumber === ""
      ? this.setState({ contactnumberRequired: "dispBlock", loginError: false })
      : ValidContact(this.state.contactnumber)
      ? this.setState({ invalidContact: "dispNone" })
      : this.setState({ invalidContact: "dispBlock", loginError: false });
    this.state.password === ""
      ? this.setState({ passwordRequired: "dispBlock", loginError: false })
      : this.setState({ passwordRequired: "dispNone" });

    if (
      this.state.contactnumber === "" ||
      this.state.password === "" ||
      !ValidContact(this.state.contactnumber)
    ) {
      return;
    }

    let dataLogin = null;
    let xhrLogin = new XMLHttpRequest();
    let that = this;

    xhrLogin.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        let loginResponse = JSON.parse(xhrLogin.response);

        if (
          loginResponse.code === "ATH-001" ||
          loginResponse.code === "ATH-002"
        ) {
          that.setState({ loginError: true });
          that.setState({ loginErrorMsg: loginResponse.message });
        } else {
          sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
          sessionStorage.setItem(
            "access-token",
            xhrLogin.getResponseHeader("access-token")
          );
          sessionStorage.setItem(
            "firstName",
            JSON.parse(this.responseText).first_name
          );
          that.setState({
            loggedInCustomerName: JSON.parse(this.responseText).first_name,
          });
          that.setState({
            loggedIn: true,
            snackBarMessage: "Logged in successfully!",
            snackBarOpen: true,
          });
          that.closeModalHandler();
        }
      }
    });
    xhrLogin.open("POST", this.props.baseUrl + "customer/login");
    xhrLogin.setRequestHeader(
      "Authorization",
      "Basic " +
        window.btoa(this.state.contactnumber + ":" + this.state.password)
    );
    xhrLogin.setRequestHeader("Content-Type", "application/json");
    xhrLogin.setRequestHeader("Cache-Control", "no-cache");
    xhrLogin.send(dataLogin);
  };

  inputFirstnameChangeHandler = (e) => {
    this.setState({ firstname: e.target.value, firstnameRequired: "dispNone" });
  };

  inputLastnameChangeHandler = (e) => {
    this.setState({ lastname: e.target.value });
  };

  inputEmailChangeHandler = (e) => {
    this.setState({ email: e.target.value, emailRequired: "dispNone" });
  };

  inputRegPasswordHandler = (e) => {
    this.setState({
      regpassword: e.target.value,
      regPasswordRequired: "dispNone",
    });
  };

  inputRegContactNumberChangeHandler = (e) => {
    this.setState({
      regContactNumber: e.target.value,
      regContactRequired: "dispNone",
    });
  };
  signupClickHandler = () => {
    // validating the fields of Signup form
    this.state.firstname === ""
      ? this.setState({ firstnameRequired: "dispBlock", signupError: false })
      : this.setState({ firstnameRequired: "dispNone" });

    //validating the email-
    this.state.email === ""
      ? this.setState({ emailRequired: "dispBlock", signupError: false })
      : validator.isEmail(this.state.email)
      ? this.setState({ invalidEmail: "dispNone" })
      : this.setState({ invalidEmail: "dispBlock", signupError: false });

    //validating the password-
    this.state.regpassword === ""
      ? this.setState({ regPasswordRequired: "dispBlock", signupError: false })
      : validPassword(this.state.regpassword)
      ? this.setState({ invalidRegPassword: "dispNone" })
      : this.setState({ invalidRegPassword: "dispBlock", signupError: false });

    //validating the contactnumber -
    this.state.regContactNumber === ""
      ? this.setState({ regContactRequired: "dispBlock", signupError: false })
      : ValidContact(this.state.regContactNumber)
      ? this.setState({ invalidContact: "dispNone" })
      : this.setState({ invalidContact: "dispBlock", signupError: false });

    if (
      this.state.firstname === "" ||
      this.state.email === "" ||
      this.state.regpassword === "" ||
      this.state.regContactNumber === "" ||
      !validator.isEmail(this.state.email) ||
      !validPassword(this.state.regpassword) ||
      !ValidContact(this.state.regContactNumber)
    ) {
      return;
    }

    let dataSignup = JSON.stringify({
      contact_number: this.state.regContactNumber,
      email_address: this.state.email,
      first_name: this.state.firstname,
      last_name: this.state.lastname,
      password: this.state.regpassword,
    });

    let xhrSignup = new XMLHttpRequest();
    let that = this;
    xhrSignup.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        let signupResponse = JSON.parse(this.response);
        if (
          signupResponse.code === "SGR-001" ||
          signupResponse.code === "SGR-002" ||
          signupResponse.code === "SGR-003" ||
          signupResponse.code === "SGR-004"
        ) {
          that.setState({
            signupError: true,
            signUpErrorMsg: signupResponse.message,
          });
        } else {
          that.setState({
            signupSuccessful: true,
            value: 0,
            snackBarMessage: "Registered successfully! Please login now!",
            snackBarOpen: true,
          });
        }
      }
    });

    xhrSignup.open("POST", this.props.baseUrl + "customer/signup");
    xhrSignup.setRequestHeader("Content-Type", "application/json");
    xhrSignup.setRequestHeader("Cache-Control", "no-cache");
    xhrSignup.send(dataSignup);
  };

  /* Close the snackbar */
  snackbarCloseHandler = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackBarOpen: false });
  };

  searchRestaurantHandler = (e) => {
    this.props.searchRestaurantByName(e.target.value);
  };

  openMenuHandler = (event) => {
    this.setState({ anchorEl: event.target });
  };

  closeMenuHandler = () => {
    this.setState({ anchorEl: null });
  };

  logoutMenuHandler = () => {
    sessionStorage.clear();
    this.setState({
      loggedIn: false,
      loggedInCustomerName: "",
      anchorEl: null,
    });
    this.setState({
      contactnumber: "",
      password: "",
      validlogin: false,
    });
  };
  render() {
    return (
      <div>
        <header className="hdr">
          <div>
            <div className="app-icon">
              <Fastfood />
            </div>
          </div>
          {this.props.page === "HomePage" ? (
            <div className="header-searchbox">
              <span className="search-icon" style={{ color: "white" }}>
                <Search />{" "}
              </span>
              <Input
                className="search-box"
                placeholder="Search by Restaurant Name"
                style={{ color: "white" }}
                onChange={this.searchRestaurantHandler}
              ></Input>
            </div>
          ) : (
            <div> </div>
          )}
          {sessionStorage.getItem("access-token") === null ? (
            <div>
              <Button
                color="default"
                variant="contained"
                onClick={this.loginModalHandler}
              >
                {" "}
                <AccountCircle />
                Login{" "}
              </Button>
            </div>
          ) : (
            <div>
              <Button
                id="menubtn"
                aria-controls="profile-menu"
                aria-haspopup="true"
                color="default"
                variant="contained"
                onClick={this.openMenuHandler}
              >
                {" "}
                <AccountCircle />
                {sessionStorage.getItem("firstName")}{" "}
              </Button>
              <Menu
                id="profile-menu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onClose={this.closeMenuHandler}
              >
                <Link
                  to={"/profile"}
                  underline="none"
                  color={"default"}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <MenuItem onClick={this.closeMenuHandler}>Profile</MenuItem>
                </Link>

                <Link
                  to={"/"}
                  underline="none"
                  color={"default"}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <MenuItem onClick={this.logoutMenuHandler}>Logout</MenuItem>
                </Link>
              </Menu>
            </div>
          )}
        </header>

        <Modal
          ariaHideApp={false}
          contentLabel="Login"
          isOpen={this.state.loginModalOpen}
          onRequestClose={this.closeModalHandler}
          style={customStyles}
        >
          <Tabs value={this.state.value} onChange={this.tabchangeHandler}>
            <Tab label="Login" />
            <Tab label="Signup" />
          </Tabs>
          {this.state.value === 0 && (
            <TabContainer>
              <FormControl required>
                <InputLabel htmlFor="contactnumber">
                  {" "}
                  Contact Number{" "}
                </InputLabel>
                <Input
                  id="contactnumber"
                  type="text"
                  contactnumber={this.state.contactnumber}
                  onChange={this.inputContactNumberChangeHandler}
                />
                <FormHelperText className={this.state.contactnumberRequired}>
                  <span className="red">required</span>
                </FormHelperText>
                <FormHelperText className={this.state.invalidContact}>
                  <span className="red">Invalid Contact</span>
                </FormHelperText>
              </FormControl>{" "}
              <br />
              <FormControl required>
                <InputLabel htmlFor="password"> Password </InputLabel>
                <Input
                  id="password"
                  type="password"
                  password={this.state.password}
                  onChange={this.inputPasswordChangeHandler}
                />
                <FormHelperText className={this.state.passwordRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>{" "}
              <br />
              {this.state.loginError ? (
                <FormHelperText style={{ marginBottom: "10px" }}>
                  <span className="red">{this.state.loginErrorMsg}</span>
                </FormHelperText>
              ) : (
                ""
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={this.loginClickHandler}
              >
                Login
              </Button>
            </TabContainer>
          )}

          {this.state.value === 1 && (
            <TabContainer>
              <FormControl required>
                <InputLabel htmlFor="firstname"> First Name </InputLabel>
                <Input
                  id="firstname"
                  type="text"
                  value={this.state.firstname}
                  firstname={this.state.firstname}
                  onChange={this.inputFirstnameChangeHandler}
                />
                <FormHelperText className={this.state.firstnameRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>{" "}
              <br />
              <FormControl required>
                <InputLabel htmlFor="lastname"> Last Name </InputLabel>
                <Input
                  id="lastname"
                  type="text"
                  value={this.state.lastname}
                  lastname={this.state.lastname}
                  onChange={this.inputLastnameChangeHandler}
                />
              </FormControl>{" "}
              <br />
              <FormControl required>
                <InputLabel htmlFor="email"> Email </InputLabel>
                <Input
                  id="email"
                  type="email"
                  value={this.state.email}
                  email={this.state.email}
                  onChange={this.inputEmailChangeHandler}
                />
                <FormHelperText className={this.state.emailRequired}>
                  <span className="red">required</span>
                </FormHelperText>
                <FormHelperText className={this.state.invalidEmail}>
                  <span className="red">Invalid Email</span>
                </FormHelperText>
              </FormControl>{" "}
              <br />
              <FormControl required>
                <InputLabel htmlFor="regpassword"> Password </InputLabel>
                <Input
                  id="regpassword"
                  type="password"
                  regpassword={this.state.regpassword}
                  onChange={this.inputRegPasswordHandler}
                />
                <FormHelperText className={this.state.regPasswordRequired}>
                  <span className="red">required</span>
                </FormHelperText>
                <FormHelperText className={this.state.invalidRegPassword}>
                  <span className="red">
                    Password must contain at least one capital letter, one small
                    letter, one number, and one special character
                  </span>
                </FormHelperText>
              </FormControl>{" "}
              <br />
              <FormControl required>
                <InputLabel htmlFor="regcontactnumber">
                  {" "}
                  Contact No.{" "}
                </InputLabel>
                <Input
                  id="regcontactnumber"
                  type="text"
                  value={this.state.regContactNumber}
                  regcontactnumber={this.state.regContactNumber}
                  onChange={this.inputRegContactNumberChangeHandler}
                />
                <FormHelperText className={this.state.regContactRequired}>
                  <span className="red">required</span>
                </FormHelperText>
                <FormHelperText className={this.state.invalidContact}>
                  <span className="red">
                    Contact No. must contain only numbers and must be 10 digits
                    long
                  </span>
                </FormHelperText>
              </FormControl>{" "}
              <br />
              {this.state.signupError ? (
                <FormHelperText style={{ marginBottom: "10px" }}>
                  <span className="red">{this.state.signUpErrorMsg}</span>
                </FormHelperText>
              ) : (
                ""
              )}
              <Button
                className="signup-button"
                variant="contained"
                color="primary"
                onClick={this.signupClickHandler}
              >
                SIGNUP
              </Button>
            </TabContainer>
          )}
        </Modal>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.snackBarOpen}
          autoHideDuration={2000}
          onClose={this.snackbarCloseHandler}
          message={this.state.snackBarMessage}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.snackbarCloseHandler}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    );
  }
}

export default Header;
