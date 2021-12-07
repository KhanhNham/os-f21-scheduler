import React, { useState } from "react";
import Header from "./Layout/Header";
import Container from '@material-ui/core/Container';
import Footer from "./Layout/Footer";
import Graphics from "./Graphics"
import SJF from '../scheduler/SJF';
import { generateTasks, getListOfColors } from "../util/TaskGenerator";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RR_InputTable from "./InputTables/RR-InputTable";
import { InputStore } from "./Store";
import { useEffect } from "react";
import { RoundRobin } from "../scheduler/RR";

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
  const [input, setInput] = useState(InputStore.getInput());
  const [quantum, setQuantum] = useState(InputStore.getQuantum());
  const [scheduler, setScheduler] = useState("SJF");

  useEffect(() => {
    InputStore.addChangeListener(onChange);
    return () => InputStore.removeChangeListener(onChange);
  }, [input, quantum, scheduler]);

  function onChange() {
    setInput(InputStore.getInput());
    setQuantum(InputStore.getQuantum());
  }
  
  const classes = useStyles();

  let [showGraphic, setShow] = useState(false);
  let [graphic, setGraphic] = useState(<></>);

  function simulate() {
    const tasks = generateTasks(input);
    const map = new Map();
    tasks.map(p => {
      map.set(p.id, p.color);
    })

    var res = [];
    if (scheduler === "RR") {
      const rr = new RoundRobin(tasks, 2);
      res = rr.simulate(); 
    } else if (scheduler === "SJF") {
      const sjf = new SJF(tasks);
      res = sjf.simulate();
    }
    
    for (var i =0; i < res.length; i++) {
      console.log(res[i]);
    }
    setShow(true);
    setGraphic(<Graphics res={res} startX={100} y={10} height={100} map={map} scheduler={scheduler}/>);
  }

  const getInputTable = () => {
    return <RR_InputTable scheduler={scheduler} />;;
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
              onClick={() => setScheduler("SJF")}
              className={classes.schedulerButtonGroup}
            >
              Shortest Job First
          </Button>
          <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => setScheduler("RR")}
              className={classes.schedulerButtonGroup}
            >
              Round Robin
          </Button>
          <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => setScheduler("MLFQ")}
              className={classes.schedulerButtonGroup}
            >
              MLFQ
          </Button>
        </div>
        
        <div className={classes.section} >
          {getInputTable()}
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
        </div>
        <div className={classes.section}>{graphic}</div>
      </Container>
      <Footer title="Footer" description="Something here to give the footer a purpose!" />
    </>
  )
}