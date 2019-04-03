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
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";

import { bugs, website, server } from "variables/general.jsx";

import {} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class GestionReferentiel extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomTabs
              title="Référentiels:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Activités",
                  tabIcon: Pool,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0, 3]}     // Rows initially checked
                      tasksIndexes={[0, 1, 2, 3]} // Initial order of elements
                      tasks={bugs}
                    />
                  )
                },
                {
                  tabName: "Utilisateurs",
                  tabIcon: Face,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0]}
                      tasksIndexes={[0, 1]}
                      tasks={website}
                    />
                  )
                },
                {
                  tabName: "Services",
                  tabIcon: People,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[1]}
                      tasksIndexes={[0, 1, 2]}
                      tasks={server}
                    />
                  )
                }
              ]}
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
