import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardContent from '@material-ui/core/CardContent';
import CardFooter from "components/Card/CardFooter.jsx";

import DateFnsUtils from "@date-io/date-fns";

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
  },
  buttonContentStyle: {
    maxWidth: '100px',
    minWidth: '100px'
  }
};

class SaisieActivite extends React.Component {
  state = {
    dateLeaving: new Date(),
    dateReturn: new Date()
  }

  tileDaysOfWeek = [
    {name: "Lundi"},
    {name: "Mardi"},
    {name: "Mercredi"},
    {name: "Jeudi"},
    {name: "Vendredi"},
    {name: "Samedi"},
    {name: "Dimanche"}
  ]

  tileData = [
    {day: '2019/02/25', activities: [ 
      {idActivity: 1, color: "primary", hours: 2},
      {idActivity: 2, color: "warning", hours: 3},
      {idActivity: 3, color: "warning", hours: 1}]},
    {day: '2019/02/26', activities: [ 
      {idActivity: 1, color: "success", hours: 2},
      {idActivity: 2, color: "warning", hours: 3},
      {idActivity: 3, color: "primary", hours: 1}]},
    {day: '2019/02/27', activities: [ 
      {idActivity: 1, color: "primary", hours: 4},
      {idActivity: 2, color: "warning", hours: 4}]},
    {day: '2019/02/28', activities: [ 
      {idActivity: 1, color: "primary", hours: 2},
      {idActivity: 2, color: "warning", hours: 3},
      {idActivity: 3, color: "success", hours: 1}]},
    {day: '2019/03/01', activities: [ 
      {idActivity: 1, color: "primary", hours: 2},
      {idActivity: 2, color: "success", hours: 3},
      {idActivity: 3, color: "warning", hours: 1}]},
    {day: '2019/03/02', activities: []},
    {day: '2019/03/03', activities: []},
    {day: '2019/03/04', activities: [ 
      {idActivity: 1, color: "success", hours: 2},
      {idActivity: 2, color: "warning", hours: 3},
      {idActivity: 3, color: "success", hours: 1}]},
    {day: '2019/03/05', activities: [ 
      {idActivity: 1, color: "primary", hours: 2},
      {idActivity: 2, color: "warning", hours: 3},
      {idActivity: 3, color: "primary", hours: 1}]},
    {day: '2019/03/06', activities: [ 
      {idActivity: 1, color: "warning", hours: 2},
      {idActivity: 2, color: "warning", hours: 3},
      {idActivity: 3, color: "success", hours: 1}]},
    {day: '2019/03/07', activities: [ 
      {idActivity: 1, color: "primary", hours: 5},
      {idActivity: 2, color: "primary", hours: 3}]},
    {day: '2019/03/08', activities: [ 
      {idActivity: 1, color: "primary", hours: 2},
      {idActivity: 2, color: "success", hours: 3},
      {idActivity: 3, color: "primary", hours: 1}]},
    {day: '2019/03/09', activities: []},
    {day: '2019/03/10', activities: [ 
      {idActivity: 1, color: "primary", hours: 2},
      {idActivity: 2, color: "warning", hours: 3},
      {idActivity: 3, color: "warning", hours: 1}]},
    {day: '2019/03/11', activities: [ 
      {idActivity: 1, color: "success", hours: 2},
      {idActivity: 2, color: "warning", hours: 3},
      {idActivity: 3, color: "success", hours: 1}]},
    {day: '2019/03/12', activities: [ 
      {idActivity: 1, color: "primary", hours: 2},
      {idActivity: 2, color: "warning", hours: 3},
      {idActivity: 3, color: "success", hours: 1}]},
    {day: '2019/03/13', activities: [ 
      {idActivity: 1, color: "primary", hours: 2},
      {idActivity: 2, color: "warning", hours: 6}]},
    {day: '2019/03/14', activities: [ 
      {idActivity: 1, color: "warning", hours: 2},
      {idActivity: 2, color: "warning", hours: 3},
      {idActivity: 3, color: "primary", hours: 1}]},
    {day: '2019/03/15', activities: [ 
      {idActivity: 1, color: "primary", hours: 2},
      {idActivity: 2, color: "success", hours: 3},
      {idActivity: 3, color: "warning", hours: 1}]},
    {day: '2019/03/16', activities: []},
    {day: '2019/03/17', activities: []},
    {day: '2019/03/18', activities: [ 
      {idActivity: 1, color: "warning", hours: 2},
      {idActivity: 2, color: "warning", hours: 3},
      {idActivity: 3, color: "success", hours: 1}]},
    {day: '2019/03/19', activities: [ 
      {idActivity: 1, color: "success", hours: 2},
      {idActivity: 2, color: "warning", hours: 3},
      {idActivity: 3, color: "primary", hours: 1}]},
    {day: '2019/03/20', activities: [ 
      {idActivity: 1, color: "primary", hours: 2},
      {idActivity: 2, color: "warning", hours: 3},
      {idActivity: 3, color: "success", hours: 1}]},
    {day: '2019/03/21', activities: [ 
      {idActivity: 1, color: "primary", hours: 2},
      {idActivity: 2, color: "warning", hours: 3},
      {idActivity: 3, color: "success", hours: 1}]},
    {day: '2019/03/22', activities: [ 
      {idActivity: 1, color: "primary", hours: 2},
      {idActivity: 2, color: "warning", hours: 3},
      {idActivity: 3, color: "success", hours: 1}]},
    {day: '2019/03/23', activities: [ 
      {idActivity: 1, color: "primary", hours: 2},
      {idActivity: 2, color: "warning", hours: 3},
      {idActivity: 3, color: "success", hours: 1}]},
    {day: '2019/03/24', activities: []},
    {day: '2019/03/25', activities: [ 
      {idActivity: 1, color: "primary", hours: 2},
      {idActivity: 2, color: "warning", hours: 3},
      {idActivity: 3, color: "success", hours: 1}]},
    {day: '2019/03/26', activities: [ 
      {idActivity: 1, color: "primary", hours: 2},
      {idActivity: 2, color: "warning", hours: 3},
      {idActivity: 3, color: "success", hours: 1}]},
    {day: '2019/03/27', activities: [ 
      {idActivity: 1, color: "primary", hours: 2},
      {idActivity: 2, color: "success", hours: 3},
      {idActivity: 3, color: "warning", hours: 1}]},
    {day: '2019/03/28', activities: [ 
      {idActivity: 1, color: "primary", hours: 2},
      {idActivity: 2, color: "warning", hours: 3},
      {idActivity: 3, color: "primary", hours: 1}]},
    {day: '2019/03/29', activities: [ 
      {idActivity: 1, color: "primary", hours: 2},
      {idActivity: 2, color: "warning", hours: 3},
      {idActivity: 3, color: "success", hours: 1}]},
    {day: '2019/03/30', activities: []},
    {day: '2019/03/31', activities: []},
  ];

  setDateLeaving = (dateLeaving) => this.setState({ dateLeaving });
  setDateReturn = (dateReturn) => this.setState({ dateReturn });

  createPlanning() {
    const { classes } = this.props;
    return (
      <GridList cols={7} cellHeight='auto' className={classes.gridList} spacing={0} >
        {this.tileDaysOfWeek.map(day => (
          <GridListTile key={day.name} cols={1} style={{height: 'auto'}}>
            <ListSubheader color="primary" component="div" style={{'lineHeight': '32px'}}>
              {day.name}
            </ListSubheader>
         </GridListTile>
        ))}
        {this.tileData.map(tile => (
          <GridListTile key={tile.day}>
            <Card style={{margin: 0}}>
              <CardHeader color="info" align='middle' style={{margin: 1, height: '24px', padding: 2}}>
                {tile.day}
              </CardHeader>
              <CardContent style={{padding: 2}}>
                {tile.activities.map(activity => (
                  <Button key={activity.idActivity}
                    style={{margin: 1, padding: 2, width: '100%', minHeight: activity.hours*12}}
                    message={activity.idActivity}
                    color={activity.color}
                  >{activity.hours + 'h : ' + activity.idActivity}</Button>
                ))}
              </CardContent>
            </Card>
          </GridListTile>
        ))}
      </GridList>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
          </GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  Activité mensuelle
                </h4>
                <p className={classes.cardCategoryWhite}>
                  Activité saisie. Cliquez sur une activité pour l'éditer.
                </p>
              </CardHeader>
              <CardBody>
                {this.createPlanning()}
              </CardBody>
              <CardFooter>
                <Button color="primary" round>
                  Mois précédent
                </Button>
                <Button color="primary" round>
                  Mois suivant
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(SaisieActivite);
