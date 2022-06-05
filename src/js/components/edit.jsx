/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import {useParams, NavLink} from 'react-router-dom';
import {
  Box,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Paper,
} from '@mui/material';

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
    <Box
      className="formBox"
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <h3 className="formBox__title">Edit Record</h3>
      <Paper sx={{width: '360px', padding: '2em'}}>
        <div className="formSection">
          <TextField
            required
            id="name"
            label="Name"
            variant="filled"
            value={form.name}
            onChange={(e) => updateForm({name: e.target.value})}
            sx={{width: '100%'}}
          />
        </div>
        <div className="formSection">
          <TextField
            required
            id="position"
            label="Position"
            variant="filled"
            value={form.position}
            onChange={(e) => updateForm({position: e.target.value})}
            sx={{width: '100%'}}
          />
        </div>
        <FormGroup className="formSection">
          <FormControlLabel
            control={
              <Checkbox
                checked={form.level === 'Intern'}
                value="Intern"
                onChange={(e) => updateForm({level: e.target.value})}
              />
            }
            label="Intern"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.level === 'Junior'}
                value="Junior"
                onChange={(e) => updateForm({level: e.target.value})}
              />
            }
            label="Junior"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.level === 'Senior'}
                value="Senior"
                onChange={(e) => updateForm({level: e.target.value})}
              />
            }
            label="Senior"
          />
        </FormGroup>
        <Button
          type="submit"
          value="Update Employee"
          variant="contained"
        >
          Submit
        </Button>
        <NavLink to="/">
          <Button color="inherit" sx={{marginLeft: '1em'}}>Cancel</Button>
        </NavLink>
      </Paper>
    </Box>
  );
}
