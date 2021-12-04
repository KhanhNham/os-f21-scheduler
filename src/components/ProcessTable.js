import React, {useState} from 'react';
import {nanoid} from 'nanoid';
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
        id: nanoid(),
        processNumber: "P" + totalProcess,
        arrTime: addNewProcess.arrTime,
        length: addNewProcess.length
    }
    const newProcesses = [...processInfo, newProcessData];
    setProcessInfo(newProcesses);
}

  return (
    <div>
        <h1>Hello :)</h1>
        <table>
            <thead>
                <tr>
                    <th> Process Number </th>
                    <th> Arriving Time </th>
                    <th> Length </th>
                </tr>
            </thead>
            <tbody>
                {processInfo.map((p) => (
                    <tr>
                        <th> {p.processNumber} </th>
                        <th> {p.arrTime} </th>
                        <th> {p.length} </th>
                    </tr>
                ))}
            </tbody>
        </table>
        <button onClick={handleAdd}> Add Process </button>
    </div>
  )
}