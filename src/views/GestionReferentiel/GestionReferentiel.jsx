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

import {} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class GestionReferentiel extends React.Component {
  state = {
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

  render() {
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
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
