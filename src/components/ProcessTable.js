import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'
// import RoundRobin from "../scheduler/rr-sim";

export default function ProcessTable() {

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
        <h1>Hello :)</h1>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell> Process Number </TableCell>
                    <TableCell> Arriving Time </TableCell>
                    <TableCell> Length </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {processInfo.map((p) => (
                    <TableRow>
                        <TableCell> {p.processNumber} </TableCell>
                        <TableCell> {p.arrTime} </TableCell>
                        <TableCell> {p.length} </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <button onClick={handleAdd}> Add Process </button>
    </div>
  )
}