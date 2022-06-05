/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

const Record = (props) => (
  <TableRow>
    <TableCell>{props.record.name}</TableCell>
    <TableCell>{props.record.position}</TableCell>
    <TableCell>{props.record.level}</TableCell>
    <TableCell>
      <Link
        className='btn btn-link'
        to={`/edit/${props.record._id}`}
      >
        <Button>Edit</Button>
      </Link>
      <Button
        onClick={() => props.deleteRecord(props.record._id)}
      >
        Delete
      </Button>
    </TableCell>
  </TableRow>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  async function getRecords() {
    // const response = await fetch('http://localhost:5000/record');
    const response = await fetch('https://restful-employee.herokuapp.com/record');
    if (!response.ok) {
      window.alert(`An error occured: ${response.statusText}`);
      return;
    }
    const data = await response.json();
    setRecords(data);
  }

  async function deleteRecord(id) {
    // const response = await fetch(`http://localhost:5000/record/delete/${id}`);
    const response = await fetch(`https://restful-employee.herokuapp.com/record/delete/${id}`);
    if (!response.ok) {
      window.alert(`An error occured: ${response.statusText}`);
      return;
    }
    getRecords();
  }

  useEffect(() => {
    getRecords();
  }, []);

  function recordList() {
    return records.map((record) => {
      return (
        <Record
          key={record._id}
          record={record}
          deleteRecord={deleteRecord}
        />
      );
    });
  }

  return (
    <div className="recordsTable">
      <h3 className="recordsTable__title">Record List</h3>
      <TableContainer component={Paper} sx={{width: '80vw'}}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead className="recordsTable__header">
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Level</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recordList()}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
