/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import {useParams} from 'react-router-dom';

export default function Edit(props) {
  const {id} = useParams();
  const [form, setForm] = useState({
    name: '',
    position: '',
    level: '',
  });

  async function getRecord() {
    // const response = await fetch(`http://localhost:5000/record/${id}`);
    const response = await fetch(`https://restful-employee.herokuapp.com/record/${id}`);
    if (!response.ok) {
      window.alert(`An error occurred: ${response.statusText}`);
    }
    const data = await response.json();
    setForm({
      name: data.name,
      position: data.position,
      level: data.level,
    });
  }

  useEffect(() => {
    getRecord();
  }, []);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return {...prev, ...value};
    });
  }

  const navigate = useNavigate();
  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    /* When a post request is sent to the create url,
     * we'll add a new record to the database.
     */
    const newEmployee = {...form};

    // await fetch(`http://localhost:5000/record/edit/${id}`, {
    await fetch(`https://restful-employee.herokuapp.com/record/edit/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployee),
    }).catch((error) => {
      window.alert(error);
    });

    setForm({
      name: '',
      position: '',
      level: '',
    });
    navigate('/');
  }

  /* This following section will display the form that takes
    * the input from the user. */
  return (
    <div>
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({name: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position</label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={form.position}
            onChange={(e) => updateForm({position: e.target.value})}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionIntern"
              value="Intern"
              checked={form.level === 'Intern'}
              onChange={(e) => updateForm({level: e.target.value})}
            />
            <label
              htmlFor="positionIntern"
              className="form-check-label"
            >Intern</label> </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionJunior"
              value="Junior"
              checked={form.level === 'Junior'}
              onChange={(e) => updateForm({level: e.target.value})}
            />
            <label
              htmlFor="positionJunior"
              className="form-check-label"
            >Junior</label></div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionSenior"
              value="Senior"
              checked={form.level === 'Senior'}
              onChange={(e) => updateForm({level: e.target.value})}
            />
            <label
              htmlFor="positionSenior"
              className="form-check-label"
            >Senior</label>
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Update Employee"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
