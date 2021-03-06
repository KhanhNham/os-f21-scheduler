import React, { useState } from "react";
import Header from "./Layout/Header";
import Container from '@material-ui/core/Container';
import Footer from "./Layout/Footer";
import Graphics from "./Graphics"
import SJF from '../scheduler/SJF';
import { generateTasks, getListOfColors } from "../util/TaskGenerator";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputTable from "./InputTable";
import { InputStore } from "./Store";
import { useEffect } from "react";
import { RoundRobin } from "../scheduler/RR";
import { MLFQ } from "../scheduler/MLFQ";
import { Typography } from "@mui/material";
import { blue } from '@mui/material/colors';

const useStyles = makeStyles((theme) => ({
  sectionHeader: {
    paddingTop: theme.spacing(4),
  },
  section: {
    paddingTop: theme.spacing(2),
    paddingBottom:theme.spacing(2),
    // borderTop: `1px solid ${theme.palette.divider}`,
  },
  schedulerButtonGroup: {
    marginRight: theme.spacing(4),
  },
  allScreen: {
    backgroundColor: blue[50],
    width: window.innerWidth,
    height: "100%",
  }
}));

export default function Main() {
  const [input, setInput] = useState(InputStore.getInput());
  const [quantum, setQuantum] = useState(InputStore.getQuantum());
  const [scheduler, setScheduler] = useState("SJF");
  const [listOfQuantum, setListOfQuantum] = useState([]);
  const [listOfAllotments, setListOfAllotments] = useState([]);
  const [windowHeight, setWindowHeight] = useState(InputStore.getWindowHeight());
  
  useEffect(() => {
    InputStore.addChangeListener(onChange);
    return () => InputStore.removeChangeListener(onChange);
  }, [input, quantum, scheduler, listOfQuantum, listOfAllotments, windowHeight]);

  function onChange() {
    setInput(InputStore.getInput());
    setQuantum(InputStore.getQuantum());
    setListOfQuantum(InputStore.getListOfQuantum());
    setListOfAllotments(InputStore.getListOfAllotments());
    setWindowHeight(InputStore.getWindowHeight());
  }
  
  const classes = useStyles();

  let [graphic, setGraphic] = useState(<></>);

  function simulate() {
    const tasks = generateTasks(input);
    const colorMap = new Map();
    tasks.map(p => {
      colorMap.set(p.id, p.color);
    })
    var res = [];
    // console.log("list of quantum " + listOfQuantum);

    if (scheduler === "RR") {
      const rr = new RoundRobin(tasks, quantum);
      res = rr.simulate(); 
    } else if (scheduler === "SJF") {
      const sjf = new SJF(tasks);
      res = sjf.simulate();
    } else if (scheduler === "MLFQ") {
      const mlfq = new MLFQ(tasks, listOfQuantum, listOfAllotments);
      res = mlfq.simulate();
    }
    
    // for (var i =0; i < res.length; i++) {
    //   console.log(res[i]);
    // }
    var tableHeight = listOfQuantum.length == 0 ? 300 : 100 * (listOfQuantum.length+1);
    setWindowHeight(windowHeight + tableHeight);

    setGraphic(
      <Graphics
        res={res} 
        startX={100}
        stageHeight={tableHeight}
        y={10} 
        height={100} 
        colorMap={colorMap}
        scheduler={scheduler}/>
    );
  }

  const getInputTable = () => {
    return <InputTable scheduler={scheduler} />;;
  }
  
  return (
    <div style={{backgroundColor: blue[50], height: windowHeight}}>
      <Container maxWidth="lg">
        <Header />

        <Typography
          component="h4"
          variant="h4"
          color="primary"
          className={classes.sectionHeader}
        >
          Select a scheduler
        </Typography>
        
        <div className={classes.section} >
          <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => setScheduler("SJF")}
              className={classes.schedulerButtonGroup}
            >
              Shortest Job First
          </Button>
          <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => setScheduler("RR")}
              className={classes.schedulerButtonGroup}
            >
              Round Robin
          </Button>
          <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => setScheduler("MLFQ")}
              className={classes.schedulerButtonGroup}
            >
              MLFQ
          </Button>
        </div>
        
        <Typography
          component="h4"
          variant="h4"
          color="primary"
          className={classes.sectionHeader}
        >
          Select parameters
        </Typography>

        <div className={classes.section} > {getInputTable()} </div>
        
        <div className={classes.section} >
          <Button
              onClick={simulate}
              variant="contained"
              color="primary"
              size="large"
            >
              Simulate
          </Button>
        </div>
        <div className={classes.section}>{graphic}</div>
      </Container>
      {/* <Footer title="Footer" description="Something here to give the footer a purpose!" /> */}
    </div>
  )
}