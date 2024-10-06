import React from 'react';
import Layout from '../components/Layout/Layout';
import Typography from '@mui/material/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import Fade from '@mui/material/Fade';
import { Grid } from '@mui/material';
import '../styles/PageNotFound.css'; // Import the CSS file

const Pagenotfound = () => {
  return (
    <Layout>
      <Grid 
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className="root"
      >
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Oops! Page not Found
          </Typography>
          <Typography variant="subtitle1" align="center" gutterBottom>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </Typography>
        </Grid>
        <Grid item className="icon-container">
          <Fade in timeout={1000}>
            <ErrorOutlineIcon className="icon" />
          </Fade>
          <Fade in timeout={1500}>
            <MoodBadIcon className="icon" />
          </Fade>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Pagenotfound;
