import React from 'react';
import Layout from '../components/Layout/Layout';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Banner from '../Images/banner.jpeg';
import { Search, Star, Bookmark } from '@mui/icons-material'; // Import icons
import '../styles/HomeStyle.css';

const Home = () => {
  return (
    <Layout>
      <div className="home" style={{backgroundImage:`url(${Banner})`}}>
        <div className="headerContainer">
          <Typography variant="h1" component="h1" >
            Discover Your Next Delicious Meal
          </Typography>
          <Typography variant="body1" component="p" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, color: '#FFFFFF', textAlign: 'center', mb: 4, textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}>
            Explore the finest mess menus near you
          </Typography>
          <Link to="/mess" style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
            <Button variant="contained" sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFFFFF', bgcolor: '#ff6f61', px: 6, py: 3, borderRadius: '50px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.3s ease', '&:hover': { bgcolor: '#ff3d00' } }}>
              View Menus
            </Button>
          </Link>
        </div>
        <div className="featuresContainer">
          <div className="feature">
            <Search sx={{ fontSize: '4rem', color: '#FFA726', mb: 2 }} />
            <Typography variant="h2" sx={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#FFA726', mb: 2, textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}>
              Easy Search
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.25rem', color: '#FFFFFF', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}>
              Find mess menus with just a few clicks.
            </Typography>
          </div>
          <div className="feature">
            <Star sx={{ fontSize: '4rem', color: '#FFA726', mb: 2 }} />
            <Typography variant="h2" sx={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#FFA726', mb: 2, textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}>
              Reviews & Ratings
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.25rem', color: '#FFFFFF', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}>
              Read honest reviews and ratings from fellow food enthusiasts.
            </Typography>
          </div>
          <div className="feature">
            <Bookmark sx={{ fontSize: '4rem', color: '#FFA726', mb: 2 }} />
            <Typography variant="h2" sx={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#FFA726', mb: 2, textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}>
              Save Favorites
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.25rem', color: '#FFFFFF', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}>
              Bookmark your preferred menus for future reference.
            </Typography>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
