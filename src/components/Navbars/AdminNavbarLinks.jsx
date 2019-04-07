import React from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Tooltip from '@material-ui/core/Tooltip';
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Login from "components/Login/Login.jsx";

import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";

class HeaderLinks extends React.Component {
  state = {
    open: false,
    openLogin: false,
    idUtilisateur: -1,
    identifiant: 'Non connecté',
    hashMotDePasse: ''
  };

  getKeyOnStorageToState(key) {
    // if the key exists in sessionStorage
    if (sessionStorage.hasOwnProperty(key)) {
      // get the key's value from sessionStorage
      let value = sessionStorage.getItem(key);
      // parse the sessionStorage string and setState
      try {
        return JSON.parse(value);
      } catch (e) {
        // handle empty string
        return null;
      }
    } else {
      return null;
    }
  }

  saveStateToSessionStorage() {
    // save to sessionStorage
    sessionStorage.setItem('idUtilisateur', JSON.stringify(this.state.idUtilisateur));
    sessionStorage.setItem('identifiant', JSON.stringify(this.state.identifiant));
    sessionStorage.setItem('hashMotDePasse', JSON.stringify(this.state.hashMotDePasse));
  }

  componentDidMount() {
    // add event listener to save state to sessionStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToSessionStorage.bind(this)
    );

    // Load session data in the state
    const idUtilisateur = this.getKeyOnStorageToState('idUtilisateur');
    const identifiant = this.getKeyOnStorageToState('identifiant');
    const hashMotDePasse = this.getKeyOnStorageToState('hashMotDePasse');

    // If there is no data in session, the user has not been connected and is not connecting
    if (!idUtilisateur) {
      return;
    }

    // If the user is not connected, check if his identification is correct and get his credentials
    if (idUtilisateur===-1 && identifiant!=='Non connecté') {
      fetch(process.env.REACT_APP_SERVICES_API_PREFIX + 'identification', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identifiant: identifiant,
          hashMotDePasse: hashMotDePasse})
      }).then(results => {
        return results.json();
      }).then(data => {
        // If the authentification is successful, user credentials are put in the state (and later saved in the session)
        if (data.reussi) {
          this.setState({
            idUtilisateur: data.id_utilisateur,
            identifiant: data.identifiant,
            hashMotDePasse: 'Vide'
          });
        }
      });
    } else {
      // Else set credentials to state
      this.setState({
        idUtilisateur: idUtilisateur,
        identifiant: identifiant,
        hashMotDePasse: hashMotDePasse
      });
    }
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  handleOpenLogin = () => {
    this.setState({ openLogin: true });
  };

  handleCloseLogin = () => {
    this.setState({ openLogin: false });
  };

  onConnexion = (identifiant, hashMotDePasse) => {
    this.handleCloseLogin();
    this.setState({
      identifiant: identifiant,
      hashMotDePasse: hashMotDePasse
    });
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <div>
        <div className={classes.searchWrapper}>
          <CustomInput
            formControlProps={{
              className: classes.margin + " " + classes.search
            }}
            inputProps={{
              placeholder: "Search",
              inputProps: {
                "aria-label": "Search"
              }
            }}
          />
          <Button color="white" aria-label="edit" justIcon round>
            <Search />
          </Button>
        </div>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Dashboard"
          className={classes.buttonLink}
        >
          <Dashboard className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Dashboard</p>
          </Hidden>
        </Button>
        <div className={classes.manager}>
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={open ? "menu-list-grow" : null}
            aria-haspopup="true"
            onClick={this.handleToggle}
            className={classes.buttonLink}
          >
            <Notifications className={classes.icons} />
            <span className={classes.notifications}>5</span>
            <Hidden mdUp implementation="css">
              <p onClick={this.handleClick} className={classes.linkText}>
                Notification
              </p>
            </Hidden>
          </Button>
          <Poppers
            open={open}
            anchorEl={this.anchorEl}
            transition
            disablePortal
            className={
              classNames({ [classes.popperClose]: !open }) +
              " " +
              classes.pooperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        Mike John responded to your email
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        You have 5 new tasks
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        You're now friend with Andrew
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        Another Notification
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        Another One
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>
        <Tooltip
          title={this.state.identifiant}
          aria-label={this.state.identifiant}
          leaveDelay={500}
        >
          <Button
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-label="Person"
            className={classes.buttonLink}
            onClick={this.handleOpenLogin}
          >
            <Person className={classes.icons} />
          </Button>
        </Tooltip>
        <Login
          open={this.state.openLogin}
          onClose={this.handleCloseLogin}
          onConnexion={this.onConnexion}
        />
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
