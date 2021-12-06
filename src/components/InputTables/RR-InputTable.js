import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { InputStore } from '../Store';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(4),
  },
  table: {
    // border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.grey[300],
  },
  section: {
    paddingTop: theme.spacing(2),
    paddingBottom:theme.spacing(2),
  },
}));

export default function RR_InputTable(props) {
  const classes = useStyles();
  const [quantum, setQuantum] = useState(0);
  const [totalProcess, setTotalProcess] = useState(0);
  const [enqueueTime, setEnqueueTime] = useState(0);
  const [processingTime, setProcessingTime] = useState(0);

  const [process, setProcess] = useState({
    processNumber: "P" + totalProcess,
    enqueueTime: 0,
    processingTime: 0,
  });
  const [allProcesses, setAllProcesses] = useState([]);

  React.useEffect(() => {
    // console.log(allProcesses);
    sendInputToStore();
  }, [allProcesses]);

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
    InputStore.emitChange();
  }

  return (
    <div>
      {props.scheduler !== "SJF" ? (
          <div className={classes.section}>
            Quantum Time: <TextField required  name="quantum" onChange={(e) => setQuantum(e.target.value)}/>
          </div>
      ) : null}

      {props.scheduler === "MLFQ" ? (
          <div className={classes.section}>
            Number of Queues: <TextField required  name="numQueues" onChange={(e) => setQuantum(e.target.value)}/>
          </div>
      ) : null}

        
        <Table className={classes.table} component="form">
            <TableHead>
                <TableRow>
                    <TableCell align="center"> Process Number </TableCell>
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
        <Button onClick={handleAdd} variant="outlined" color="primary" size="small" className={classes.button}>Add Process</Button>
    </div>
  )
}