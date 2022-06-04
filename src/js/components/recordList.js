/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const Record = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.position}</td>
    <td>{props.record.level}</td>
    <td>
      <Link
        className='btn btn-link'
        to={`/edit/${props.record._id}`}
      >Edit</Link>
      <button
        className='btn btn-link'
        onClick={() => props.deleteRecord(props.record._id)}
      >Delete</button>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  async function getRecords() {
    const response = await fetch('http://localhost:5000/record');
    if (!response.ok) {
      window.alert(`An error occured: ${response.statusText}`);
      return;
    }
    const data = await response.json();
    setRecords(data);
  }

  async function deleteRecord(id) {
    const response = await fetch(`http://localhost:5000/record/delete/${id}`);
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
    <div>
      <h3>Record List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {recordList()}
        </tbody>
      </table>
      <Link to='/create'>Create Employee Record</Link>
    </div>
  );
}
