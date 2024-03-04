import React from 'react';
import Layout from '../components/Layout/Layout';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Banner from '../Images/banner.jpeg';
import '../styles/HomeStyle.css';

const Home = () => {
  return (
    <Layout>
      <div className="home" style={{backgroundImage:`url(${Banner})`}}>
        <div className="headerContainer">
          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '3rem', md: '5rem' }, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center', mb: 2, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
            Mess Menu
          </Typography>
          <Typography variant="body1" component="p" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, color: '#FFFFFF', textAlign: 'center', mb: 4, textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}>
            Best Results search according your location Mess 
          </Typography>
          <Link to="/mess" style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
            <Button variant="contained" sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFFFFF', bgcolor: '#ff6f61', px: 6, py: 3, borderRadius: '50px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.3s ease', '&:hover': { bgcolor: '#ff3d00' } }}>
              View Now
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
