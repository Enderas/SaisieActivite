import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Pool from "@material-ui/icons/Pool";
import Face from "@material-ui/icons/Face";
import People from "@material-ui/icons/People";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import TableWithActions from "components/TableWithActions/TableWithActions.jsx";
import ReferenceServices from "components/References/ReferenceServices/ReferenceServices.jsx";

import {} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class GestionReferentiel extends React.Component {
  state = {
    initialIdObject: '0',   // La fenêtre de saisie est en mode création tant que cette valeur = '0'. A remplacer avec l'identifiant de l'objet sélectionné
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
    console.log('Value : ' + value);
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
    console.log('Index : ' + index);
  };

  handleSelectRef = idSelected => {
    this.setState({ initialIdObject: idSelected });
  }

  render() {
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} lg={8}>
            <TableWithActions
              title="Référentiels:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Services",
                  tabIcon: People,
                },
                {
                  tabName: "Activités",
                  tabIcon: Pool,
                },
                {
                  tabName: "Utilisateurs",
                  tabIcon: Face,
                },
                {
                  tabName: "Grades",
                  tabIcon: Pool,
                },
                {
                  tabName: "Profils",
                  tabIcon: Pool,
                },
                {
                  tabName: "Jours chômés",
                  tabIcon: Pool,
                },
              ]}
              tableHeaderColor="primary"
              handleSelectRef={this.handleSelectRef}
            />
          </GridItem>
          <GridItem xs={12} lg={4}>
            <ReferenceServices
              idSelected={this.state.idSelected}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

GestionReferentiel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(GestionReferentiel);
