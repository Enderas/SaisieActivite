import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
// core components
import referencesStyle from "assets/jss/material-dashboard-react/components/referencesStyle.jsx";

class References extends React.Component {
  state = {
    checked: [],
    tableHead: [],
    TableData: []
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  loadReferences = (query) => {
    // Call to a GET request of the corresponding repository
    fetch(process.env.REACT_APP_SERVICES_API_PREFIX + query, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }).then(results => {
      return results.json();
    }).then(data => {

      // Extract the column names for table header
      const tableHead = Object.keys(data[0]);

      // Extract data for table body
      const tableData = [];
      for (let i = 0; i < data.length; i++) {
        const row = [];
        tableHead.forEach(key => {
          row.push(data[i][key]);
        });
        tableData.push(row);
      }

      // Set extracted data to the state
      this.setState({
        tableHead: tableHead,
        tableData: tableData
      });
    });
  }

  componentDidMount = () => {
    const { tabName } = this.props;

    // According to the selected repository, determine its call endpoint
    let query = "none";
    switch(tabName){
      // case "Activités":
      //   query = "activites";
      //   break;
      // case "Utilisateurs":
      //   query = "utilisateurs";
      //   break;      
      case "Services":
        query = "services";
        break;
      default:
        this.setState({
          tableHead: [],
          TableData: []
        });
    }

    // Call the corresponding API to get references
    if (query !== "none") {
      this.loadReferences(query);
    }
  }

  render() {
    const { classes, tableHeaderColor } = this.props;
    const tableCellClasses = classnames(classes.tableCell)
    return (
      <Table className={classes.table}>
        {this.state.tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              <TableCell />
              {this.state.tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
              <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {this.state.tableData !== undefined ? (
            this.state.tableData.map((prop, key) => {
              return (
                <TableRow key={key}>
                  <TableCell className={tableCellClasses}>
                    <Checkbox
                      checked={this.state.checked.indexOf(prop) !== -1}
                      tabIndex={-1}
                      onClick={this.handleToggle(prop)}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked,
                        root: classes.root
                      }}
                    />
                  </TableCell>
                  {prop.map((prop, key) => {
                    return (
                      <TableCell className={classes.tableCell} key={key}>
                        {prop}
                      </TableCell>
                    );
                  })}
                  <TableCell className={classes.tableActions}>
                    <Tooltip
                      id="tooltip-top"
                      title="Edite la référence"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton
                        aria-label="Edit"
                        className={classes.tableActionButton}
                      >
                        <Edit
                          className={
                            classes.tableActionButtonIcon + " " + classes.edit
                          }
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top-start"
                      title="Supprime la référence"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton
                        aria-label="Close"
                        className={classes.tableActionButton}
                      >
                        <Close
                          className={
                            classes.tableActionButtonIcon + " " + classes.close
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })
          ) : null}
        </TableBody>
      </Table>
    );
  }
}

References.propTypes = {
  classes: PropTypes.object.isRequired,
  tabName: PropTypes.string.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ])
};

export default withStyles(referencesStyle)(References);
