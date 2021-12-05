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
import RR_InputTable from "./InputTables/RR-InputTable";

const useStyles = makeStyles((theme) => ({
  sectionHeader: {
    paddingTop: theme.spacing(4),
    paddingBottom:theme.spacing(4),
  },
  section: {
    paddingTop: theme.spacing(2),
    paddingBottom:theme.spacing(2),
  },
  schedulerButtonGroup: {
    marginRight: theme.spacing(4),
  }
}));

export default function Main() {
  let numTasks = 4;
  const classes = useStyles();

  let [showGraphic, setShow] = useState(false);
  let [graphic, setGraphic] = useState(<></>);

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
        {/* <Typography component="h5" variant="h5" className={classes.sectionHeader}> Choose a scheduler</Typography> */}
        <div className={classes.section} >
          <Button
              variant="outlined"
              color="primary"
              size="large"
              className={classes.schedulerButtonGroup}
            >
              Round Robin
          </Button>
          <Button
              variant="outlined"
              color="primary"
              size="large"
              className={classes.schedulerButtonGroup}
            >
              MLFQ
          </Button>
        </div>
        
        <div className={classes.section} >
          <RR_InputTable/>
        </div>
        
        <div className={classes.section} >
          <Button
              onClick={simulate}
              variant="outlined"
              color="primary"
              size="large"
            >
              Simulate
          </Button>
          {graphic}
        </div>
      </Container>
      <Footer title="Footer" description="Something here to give the footer a purpose!" />
    </>
  )
}