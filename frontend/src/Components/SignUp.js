import * as React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from '../customHook/useForm';
import Controls from './controls/Controls';

const theme = createTheme();

export default function SignUp() {
  const validate = () => {
    let temp = {};

    temp.username = values.username ? '' : 'This field is required.';
    temp.email = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ? ''
      : 'Email is Required and must be valid.';
    temp.password = values.password ? '' : 'This field is required.';

    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === '');
  };

  const initialFValues = {
    username: '',
    email: '',
    password: '',
  };

  const generatePassword = () => {
    let pass = '';
    let string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$';
    for (let index = 1; index <= 10; index++) {
      let char = Math.floor(Math.random() * string.length + 1);
      setValues({
        ...values,
        password: (pass += string.charAt(char)),
      });
    }
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let name = data.get('username');
    let email = data.get('email');
    let password = data.get('password');
    if (validate(values)) {
      await axios
        .post('http://localhost:4000/register', {
          name: name,
          email: email,
          password: password,
        })
        .then((response) => console.log(response));
      window.alert('You Are Succesfully Registered');

      resetForm();
    } else {
      window.alert('Please Try Again');
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Controls.Input
                  name='username'
                  label='User Name'
                  value={values.username}
                  onChange={handleInputChange}
                  error={errors.username}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controls.Input
                  name='email'
                  label='Email Address'
                  value={values.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controls.Input
                  name='password'
                  label='Password'
                  value={values.password}
                  onChange={handleInputChange}
                  error={errors.password}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  onClick={generatePassword}
                >
                  Generate Password
                </Button>
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link to='/signin' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
