import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import TextField from "@material-ui/core/TextField";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class ReferenceServices extends React.Component {
  service = {
    idService: 0,
    nomCourt: '',
    nomLong: '',
    niveau: 0
  };

  state = {
    idObject: '0',
    service: this.service
  };

  constructor(props) {
    super(props);
    if (props.initialIdObject) {
      this.state.idObject = props.initialIdObject;
    }
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_SERVICES_API_PREFIX + 'services/' + this.state.idObject)
    .then(results => {
      return results.json();
    }).then(data => {
      this.service = {
        idService: data['Id service'],
        nomCourt: data['Nom  court'],
        nomLong: data['Nom  long'],
        niveau: data['Niveau']
      };
      this.setState({
        service: this.service
      });
    });
  }

  getJsonBody() {
    return JSON.stringify({
      'Nom  court': this.state.service.nomCourt,
      'Nom long': this.state.service.nomLong,
      'Niveau': this.state.service.niveau
    });
  }

  createObject() {
    // Create a new object
    fetch(process.env.REACT_APP_SERVICES_API_PREFIX + 'services/', {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'POST',
      body: this.getJsonBody()
    });
  }

  updateObject() {
    // Update an existing object
    fetch(process.env.REACT_APP_SERVICES_API_PREFIX + 'services/' + this.state.idObject, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'PUT',
      body: this.getJsonBody()
    });
  }

  deleteObject() {
    // Delete an existing object
    fetch(process.env.REACT_APP_SERVICES_API_PREFIX + 'services/' + this.state.idObject, {
      method: 'DELETE'
    });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const isCreate = this.state.idObject === '0' ? true : false;
    return (
      <Card className={classes.divSmall}>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>
            {isCreate ? 'Création' : 'Mise à jour'}
          </h4>
          <p className={classes.cardCategoryWhite}>
            Remplissez tous les champs obligatoires.
          </p>
        </CardHeader>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} md={6}>
              <TextField
                id="nomCourt"
                label="Libellé court"
                required
                value={this.state.service.nomCourt}
                onChange={this.handleChange('nomCourt')}
                className={
                  (classes.margin,
                  classes.textField,
                  "CustomInput-formControl-214")
                }
                InputLabelProps={{
                  shrink: true
                }}
              />
            </GridItem>
            <GridItem xs={12} md={6}>
              <TextField
                id="nomLong"
                label="Libellé long"
                required
                value={this.state.service.nomLong}
                onChange={this.handleChange('nomLong')}
                className={
                  (classes.margin,
                  classes.textField,
                  "CustomInput-formControl-214")
                }
                InputLabelProps={{
                  shrink: true
                }}
              />
            </GridItem>
            <GridItem xs={12} md={6}>
              <TextField
                id="niveau"
                label="Niveau"
                required
                value={this.state.service.niveau}
                onChange={this.handleChange('niveau')}
                type="number"
                className={
                  (classes.margin,
                  classes.textField,
                  "CustomInput-formControl-214")
                }
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
            </GridItem>
          </GridContainer>
        </CardBody>
        <CardFooter>
          <Button color="primary" round>
           {isCreate ? 'Créer' : 'Mettre à jour'}
          </Button>
          <Button
            color={isCreate ? 'secondary' : 'danger'}
            disabled={isCreate ? true : false}
            round
          >
            Supprimer
          </Button>
        </CardFooter>
      </Card>
    );
  }
}

export default withStyles(styles)(ReferenceServices);
