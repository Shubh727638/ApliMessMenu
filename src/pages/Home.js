// import React from 'react'
// import Layout from '../components/Layout/Layout'
// import { Link } from '@mui/material'
// import Banner from '../Images/banner.png.jpg';
// import '../styles/HomeStyle.css';

// const Home = () => {
//   return (
//     <Layout>
//       <div className="home" style={{backgroundImage:`url(${Banner})`}}>
//         <div className="headerContainer">
//           <h1>Mess Websiter</h1>
//           <p> Best Result for mess menu </p>
//           <Link to="/mess">
//             <button>
//               VIEW NOW
//             </button>
//           </Link>
//         </div>
//       </div>
//     </Layout>
//   )
// }

// export default Home

import React from 'react';
import Layout from '../components/Layout/Layout';
import { Link, Button, Typography } from '@mui/material';
import Banner from '../Images/banner.jpeg';
import '../styles/HomeStyle.css';

const Home = () => {
  return (
    <Layout>
      <div className="home" style={{backgroundImage:`url(${Banner})`}}>
        <div className="headerContainer">
          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '3rem', md: '5rem' }, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center', mb: 2 }}>
            Mess Websiter
          </Typography>
          <Typography variant="body1" component="p" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, color: '#FFFFFF', textAlign: 'center', mb: 4 }}>
            Best Result for mess menu
          </Typography>
          <Link to="/mess" style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFFFFF', bgcolor: '#1976D2', px: 6, py: 3,pointer:'cursor' }}>
              VIEW NOW
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
