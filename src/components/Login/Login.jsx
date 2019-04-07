/*eslint-disable*/
import React, { Component } from "react";
// @material-ui/core components
import TextField from "@material-ui/core/TextField";
import Dialog from '@material-ui/core/Dialog';
// core components
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

// Standard FIPS 202 SHA-3 implementation
import { SHA3 } from 'sha3';

import classnames from "classnames";

class Login extends Component {
  state = {
    identifiant: '',
    hashMotDePasse: ''
  };

  constructor(props) {
    super(props);
  }

  connexion = () => {
    this.props.onConnexion(this.state.identifiant, this.state.hashMotDePasse);
  }

  handleChangeIdentifiant = event => {
    this.setState({ identifiant: event.target.value });
  };

  handleChangeMotDePasse = event => {
    // Hash in SHA-3 512
    const hashMotDePasse = new SHA3(512).update(event.target.value);
    this.setState({ hashMotDePasse: hashMotDePasse.digest('hex') });
  };

  render() {
    const { open, onClose } = this.props

    return (
      <Dialog
        open={open}
        onClose={onClose}
      >
        <div className={classnames("fixed-plugin")} >
          <form
            className="dropdown-menu"
            onSubmit={this.connexion}
          >
            <Card>
              <CardHeader color="primary" style={{height: '26px'}}>
                <h4 style={{margin: 0}}>Identification</h4>
              </CardHeader>
              <CardBody>
                <TextField
                  required
                  autoFocus
                  fullWidth
                  id="identifiant"
                  label="Identifiant"
                  onChange={this.handleChangeIdentifiant}
                />
                <TextField
                  required
                  fullWidth
                  id="motDePasse"
                  label="Mot de passe"
                  type="password"
                  autoComplete="current-password"
                  onChange={this.handleChangeMotDePasse}
                />
              </CardBody>
              <CardFooter>
                <Button
                  color="primary"
                  type="submit"
                  round
                >
                  Connexion
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </Dialog>
    );
  }
}

export default Login;
