import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// core components
import GridItem from "./node_modules/components/Grid/GridItem.jsx.js";
import GridContainer from "./node_modules/components/Grid/GridContainer.jsx.js";
import CustomInput from "./node_modules/components/CustomInput/CustomInput.jsx.js";
import Button from "./node_modules/components/CustomButtons/Button.jsx.js";
import Card from "./node_modules/components/Card/Card.jsx.js";
import CardHeader from "./node_modules/components/Card/CardHeader.jsx.js";
import CardBody from "./node_modules/components/Card/CardBody.jsx.js";
import CardFooter from "./node_modules/components/Card/CardFooter.jsx.js";

import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";

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

class SaisiePermission extends React.Component {
  state = {
    dateLeaving: new Date(),
    dateReturn: new Date()
  }

  setDateLeaving = (dateLeaving) => this.setState({ dateLeaving });
  setDateReturn = (dateReturn) => this.setState({ dateReturn });

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <Card className={classes.divSmall}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  Saisie de la permission
                </h4>
                <p className={classes.cardCategoryWhite}>
                  Remplissez tous les champs obligatoires. Le départ est le
                  moment où vous quittez le travail.
                </p>
              </CardHeader>
              <CardBody>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <DatePicker
                        id="dayLeaving"
                        autoFocus
                        margin="normal"
                        label="Jour du départ"
                        format="dd/MM/yyyy"
                        value={this.state.dateLeaving}
                        onChange={this.setDateLeaving}
                      />
                      <TextField
                        id="timeLeaving"
                        label="Heure"
                        type="time"
                        defaultValue="16:30"
                        className={
                          (classes.textField, "MuiFormControl-marginNormal-216")
                        }
                        InputLabelProps={{
                          shrink: true
                        }}
                        inputProps={{
                          step: 600 // 10 min
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <DatePicker
                        id="dayReturn"
                        margin="normal"
                        label="Jour du retour"
                        format="dd/MM/yyyy"
                        value={this.state.dateReturn}
                        onChange={this.setDateReturn}
                      />
                      <TextField
                        id="timeReturn"
                        label="Heure"
                        type="time"
                        defaultValue="07:30"
                        className={
                          (classes.textField, "MuiFormControl-marginNormal-216")
                        }
                        InputLabelProps={{
                          shrink: true
                        }}
                        inputProps={{
                          step: 600 // 10 min
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </MuiPickersUtilsProvider>
                <GridContainer>
                  <GridItem xs={6} sm={6} md={4}>
                    <TextField
                      label="Jours demandés"
                      id="nb-demandes"
                      className={
                        (classes.margin,
                        classes.textField,
                        "CustomInput-formControl-214")
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">Jrs</InputAdornment>
                        )
                      }}
                    />
                  </GridItem>
                  <GridItem xs={6} sm={6} md={4}>
                    <TextField
                      label="Week-end / Fériés"
                      id="nb-week-end"
                      className={
                        (classes.margin,
                        classes.textField,
                        "CustomInput-formControl-214")
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">Jrs</InputAdornment>
                        )
                      }}
                    />
                  </GridItem>
                  <GridItem xs={6} sm={6} md={4}>
                    <TextField
                      label="Exceptionnels"
                      id="nb-exceptionnels"
                      className={
                        (classes.margin,
                        classes.textField,
                        "CustomInput-formControl-214")
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">Jrs</InputAdornment>
                        )
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      id="raisons-exceptionnels"
                      label="Raisons des jours exceptionnels"
                      placeholder="Raisons des jours exceptionnels"
                      multiline
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Pays"
                      id="country"
                      value="France"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Ville"
                      id="city"
                      value="Mont-de-Marsan"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Code postal"
                      id="postal-code"
                      value="40000"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      id="address"
                      label="Adresse"
                      placeholder="Adresse du lieu de permission"
                      multiline
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" round>
                  Sauver dans les activités
                </Button>
                <Button color="primary" round>
                  Imprimer la permission
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(SaisiePermission);
