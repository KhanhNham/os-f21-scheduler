import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { InputStore } from './Store';
import { indigo } from '@mui/material/colors';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(4),
  },
  table: {
    // border: `1px solid ${theme.palette.divider}`,
    // backgroundColor: theme.palette.grey[300],
    variant: "outlined",
    backgroundColor: indigo[100],
  },
  subsection: {
    paddingTop: theme.spacing(2),
    paddingBottom:theme.spacing(2),
  },
  quantumOptions: {
    padding: theme.spacing(1),
  }
}));

export default function InputTable(props) {
  const classes = useStyles();
  const [quantum, setQuantum] = useState(0);
  const [totalProcess, setTotalProcess] = useState(0);
  const [enqueueTime, setEnqueueTime] = useState(0);
  const [processingTime, setProcessingTime] = useState(0);
  const [allProcesses, setAllProcesses] = useState([]);
  const [numQueues, setNumQueues] = useState(0);
  const [listOfQuantum, setListOfQuantum] = useState([]);
  const [renderListOfQuantum, setRenderListOfQuantum] = useState(false);
  
  React.useEffect(() => {
    sendInputToStore();
  }, [allProcesses, quantum, numQueues, renderListOfQuantum]);

  const initializeListOfQuantum = (num) => {
    var arr = [];
    for (var i =0; i< num; i++) {
      arr.push(0);
    }
    return arr;
  }
  const handleAdd = () => {
    setAllProcesses(oldArray => 
      [...oldArray, {processNumber: "P" + totalProcess, enqueueTime: parseInt(enqueueTime), processingTime: parseInt(processingTime)}]
    );
    setEnqueueTime(0);
    setProcessingTime(0);
    setTotalProcess(totalProcess + 1);
  }

  const sendInputToStore = () => {
    InputStore.setInput(allProcesses);
    InputStore.setQuantum(parseInt(quantum));
    InputStore.setListOfQuantum(listOfQuantum);
    InputStore.emitChange();
  }

  const updateListOfQuantum = (index, value) => {
    listOfQuantum[index] = parseInt(value);
    return listOfQuantum;
  }
  
  const getListOfQuantum = () => {
    return listOfQuantum.map((q, index) => {
      return (
        <TextField
          required
          defaultValue={q}
          key={"quantum" + index}
          name={"quantum" + index}
          id="outlined-basic"
          variant="outlined"
          color="outlined-primary"
          label={"Quantum of queue "+index}
          className={classes.quantumOptions}
          onChange={(e) => setListOfQuantum(updateListOfQuantum(index, e.target.value))}
        />
      )
    })
  }

  return (
    <div>
      {props.scheduler === "RR" ? (
          <div className={classes.subsection}>
            <TextField 
              required
              className={classes.quantumOptions}
              id="outlined-basic"
              variant="outlined"
              color="outlined-primary"
              label="Quantum Time"
              name="quantum"
              onChange={(e) => setQuantum(e.target.value)}/>
          </div>
      ) : null}

      {props.scheduler === "MLFQ" ? (
        <>
          <div className={classes.subsection}>
            <TextField 
              required
              className={classes.quantumOptions}
              id="outlined-basic"
              variant="outlined"
              color="outlined-primary"
              label="Number of queues"
              name="numQueues"
              onChange={(e) => {setNumQueues(e.target.value); setListOfQuantum(initializeListOfQuantum(e.target.value))}} onKeyDown={(e) => setRenderListOfQuantum(true)}/>
          </div>
          
          <div className={classes.subsection}>
            {renderListOfQuantum ? getListOfQuantum() : null}
          </div>
        </> 
      ) : null}

        
        <Table className={classes.table} component="form">
            <TableHead>
                <TableRow>
                    <TableCell align="center" > Process Number </TableCell>
                    <TableCell align="center"> Arriving Time </TableCell>
                    <TableCell align="center"> Processing Time </TableCell>
                </TableRow>
            </TableHead>
            <TableBody >
                {totalProcess !== 0 ? allProcesses.map((p) => (
                    <TableRow key={p.processNumber}>
                        <TableCell align="center"> {p.processNumber} </TableCell>
                        <TableCell align="center"> {p.enqueueTime}</TableCell>
                        <TableCell align="center"> {p.processingTime}</TableCell>
                    </TableRow>
                )) : null}
                <TableRow>
                  <TableCell align="center"> {"P" + totalProcess} </TableCell>
                  <TableCell align="center">
                    <TextField required placeholder="Please enter a multiple of 10" fullWidth name="enqueueTime" onChange={(e) => setEnqueueTime(e.target.value)}/>
                  </TableCell>
                  <TableCell align="center">
                    <TextField required placeholder="Please enter a multiple of 10" fullWidth name="processingTime" onChange={(e) => setProcessingTime(e.target.value)}/>
                  </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <Button onClick={handleAdd} variant="contained" color="primary" size="medium" className={classes.button}>Add Process</Button>
    </div>
  )
}