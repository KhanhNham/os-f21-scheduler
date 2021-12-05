import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Input } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(4),
  },
  table: {
    // border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.grey[300],
  }
}));

export default function RR_InputTable() {
  const classes = useStyles();
  const [totalProcess, setTotalProcess] = useState(1);
  const [processInfo, setProcessInfo] = useState([{
    "processNumber": "P0",
    "arrTime" : 0,
    "length" : 2
  }]);
  
  const [addNewProcess, setAddNewProcess] = useState({
      arrTime: 0,
      length: 2
  })

  const handleAdd = () => {
    const newProcessInfo = {...addNewProcess};
    setAddNewProcess(newProcessInfo);
    updateProcessInfo();
    setTotalProcess(totalProcess + 1);
}

const updateProcessInfo = () => {
    const newProcessData = {
        processNumber: "P" + totalProcess,
        arrTime: addNewProcess.arrTime,
        length: addNewProcess.length
    }
    const newProcesses = [...processInfo, newProcessData];
    setProcessInfo(newProcesses);
}

const getProcessInfo = (processNum) => {
  processInfo.map((p) => {
    if (p.processNumber == processNum) {
      return {p};
    }
  })
}

  return (
    <div>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell align="center"> Process Number </TableCell>
                    <TableCell align="center"> Arriving Time </TableCell>
                    <TableCell align="center"> Length </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {processInfo.map((p) => (
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
                        <TableCell align="center"> {p.processNumber} </TableCell>
                        <TableCell align="center"><Input fullWidth/></TableCell>
                        <TableCell align="center"><Input fullWidth/></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <Button onClick={handleAdd} variant="outlined" color="primary" size="small" className={classes.button}>Add Process</Button>
    </div>
  )
}