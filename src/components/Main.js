import React, { useState } from "react";
import Header from "./Layout/Header";
import Container from '@material-ui/core/Container';
import Footer from "./Layout/Footer";
import Graphics from "./Graphics"
import RoundRobin from '../scheduler/RoundRobin';
import Typography from '@material-ui/core/Typography';
import { generateTasks, getListOfColors } from "../util/TaskGenerator";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  sectionHeader: {
    paddingTop: theme.spacing(4),
  },
}));

export default function Main() {
  let numTasks = 4;
  const classes = useStyles();

  let [showGraphic, setShow] = useState(false);
  let [graphic, setGraphic] = useState(<></>);
  // let tasks = [
  //   {id: 0, enqueueTime: 1, processingTime: 20, color: colorLs[this.id]},
  //   {id: 1, enqueueTime: 2, processingTime: 40, color: colorLs[this.id]},
  //   {id: 2, enqueueTime: 3, processingTime: 20, color: colorLs[this.id]},
  //   {id: 3, enqueueTime: 4, processingTime: 10, color: colorLs[this.id]},
  // ];
  var res = [];
  function simulate() {
    const tasks = generateTasks(numTasks);
  
    const roundRobin = new RoundRobin(numTasks, tasks);
    res = roundRobin.simulate();
    for (var i =0; i < res.length; i++) {
      console.log("enqueuingTime: " + res[i].enqueueTime + " processingTime: " + res[i].processingTime + " id: " + res[i].id);
    }
    setShow(true);
    setGraphic(<Graphics res={res} startX={100} y={10} height={50}/>);
  }
  
  return (
    <>
      <Container maxWidth="lg">
        <Header />
        <Typography component="h4" variant="h4" className={classes.sectionHeader}> Tuning Parameters:</Typography>
        {/* <Typography component="h4" variant="h4" className={classes.sectionHeader}> Simulator:</Typography> */}
        <Button
            onClick={simulate}
            variant="contained"
            color="primary"
          >
            Simulate
          </Button>
        {graphic}
      </Container>
      <Footer title="Footer" description="Something here to give the footer a purpose!" />
    </>
  )
}