import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import CardContent from "@material-ui/core/CardContent";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

// import DateFnsUtils from "@date-io/date-fns";

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
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  buttonContentStyle: {
    maxWidth: "100px",
    minWidth: "100px"
  }
};

class SaisieActivite extends React.Component {
  state = {
    dateLeaving: new Date(),
    dateReturn: new Date(),
    tileData: []
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

  setDateLeaving = (dateLeaving) => this.setState({ dateLeaving });
  setDateReturn = (dateReturn) => this.setState({ dateReturn });

  componentDidMount() {
    fetch('http://localhost:3000/api/activities_days')
    .then(results => {
      return results.json();
    }).then(data => {
      this.setState({tileData: data});
    });
  }

  createPlanning() {
    const { classes } = this.props;
    return (
      <GridList cols={7} cellHeight="auto" className={classes.gridList} spacing={0} >
        {this.tileDaysOfWeek.map(day => (
          <GridListTile key={day.name} cols={1} style={{height: "auto"}}>
            <ListSubheader color="primary" component="div" style={{"lineHeight": "32px"}}>
              {day.name}
            </ListSubheader>
         </GridListTile>
        ))}
        {this.state.tileData.map(tile => (
          <GridListTile key={tile.day}>
            <Card style={{margin: 0}}>
              <CardHeader color="info" align="middle" style={{margin: 1, height: "24px", padding: 2}}>
                {tile.day}
              </CardHeader>
              <CardContent style={{padding: 2}}>
                {tile.activities.map(activity => (
                  <Button key={activity.id}
                    style={{margin: 1, padding: 2, width: "100%", minHeight: activity.hours*12}}
                    message={activity.id}
                    color={activity.color}
                  >{activity.hours + "h : " + activity.id}</Button>
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
                  Activité saisie. Cliquez sur une activité pour l"éditer.
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
