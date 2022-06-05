import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import {NavLink} from 'react-router-dom';
import {
  Box,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Paper,
} from '@mui/material';

export default function Create() {
  const [form, setForm] = useState({
    name: '',
    position: '',
    level: '',
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return {...prev, ...value};
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    /* When a post request is sent to the create url,
     * we'll add a new record to the database.
     */
    const newEmployee = {...form};

    // await fetch('http://localhost:5000/record/add', {
    await fetch('https://restful-employee.herokuapp.com/record/add', {
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
    navigate('/mern-employees/');
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
      <h3 className="formBox__title">Create New Record</h3>
      <Paper sx={{width: '360px', padding: '2em'}}>
        <div className="formSection">
          <TextField
            required
            id="name"
            label="Name"
            variant="filled"
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
            onChange={(e) => updateForm({position: e.target.value})}
            sx={{width: '100%'}}
          />
        </div>
        <FormGroup className="formSection">
          <FormControlLabel
            control={
              <Checkbox
                value="Intern"
                onChange={(e) => updateForm({level: e.target.value})}
              />
            }
            label="Intern"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="Junior"
                onChange={(e) => updateForm({level: e.target.value})}
              />
            }
            label="Junior"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="Senior"
                onChange={(e) => updateForm({level: e.target.value})}
              />
            }
            label="Senior"
          />
        </FormGroup>
        <Button
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
        <NavLink to="/mern-employees/">
          <Button color="inherit" sx={{marginLeft: '1em'}}>Cancel</Button>
        </NavLink>
      </Paper>
    </Box>
  );
}
